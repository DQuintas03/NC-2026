from fastapi import FastAPI, APIRouter, UploadFile, File, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional
import uuid
import io
from datetime import datetime, timezone
import pandas as pd

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

COLLECTION_MAP = {
    "acertos": "acertos",
    "trocas": "trocas",
    "faltas": "faltas_circulacao",
}

AREA_LABELS = {
    "acertos": "Acertos",
    "trocas": "Trocas",
    "faltas": "Faltas de Circulacao",
}


class KPIData(BaseModel):
    label: str
    value: str
    change: str
    trend: str
    icon: str


class AreaKPIs(BaseModel):
    area: str
    kpis: List[KPIData]


def parse_date_param(date_str: Optional[str]) -> Optional[datetime]:
    if not date_str:
        return None
    try:
        return datetime.fromisoformat(date_str.replace("Z", "+00:00"))
    except (ValueError, AttributeError):
        try:
            return datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        except (ValueError, AttributeError):
            return None


def build_date_filter(start_date: Optional[str], end_date: Optional[str]) -> dict:
    date_filter = {}
    s = parse_date_param(start_date)
    e = parse_date_param(end_date)
    if s:
        date_filter["$gte"] = s.isoformat()
    if e:
        date_filter["$lte"] = e.isoformat()
    if date_filter:
        return {"data": date_filter}
    return {}


async def compute_kpis(collection_name: str, area_key: str, start_date: Optional[str], end_date: Optional[str]):
    col = db[collection_name]
    match_filter = build_date_filter(start_date, end_date)
    total = await col.count_documents(match_filter)

    top_linha = "N/A"
    top_motorista = "N/A"

    if total > 0:
        pipeline_linha = [{"$match": match_filter}] if match_filter else []
        pipeline_linha += [
            {"$group": {"_id": "$linha", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 1}
        ]
        linha_result = await col.aggregate(pipeline_linha).to_list(1)
        if linha_result:
            top_linha = f"{linha_result[0]['_id']} ({linha_result[0]['count']})"

        pipeline_mot = [{"$match": match_filter}] if match_filter else []
        pipeline_mot += [
            {"$group": {"_id": "$motorista", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 1}
        ]
        mot_result = await col.aggregate(pipeline_mot).to_list(1)
        if mot_result:
            top_motorista = f"{mot_result[0]['_id']} ({mot_result[0]['count']})"

    icons = {
        "acertos": ["CheckCircle", "MapPin", "User", "Hash"],
        "trocas": ["ArrowLeftRight", "MapPin", "User", "Hash"],
        "faltas": ["AlertTriangle", "MapPin", "User", "Hash"],
    }
    area_icons = icons.get(area_key, icons["acertos"])
    label = AREA_LABELS.get(area_key, area_key)

    return AreaKPIs(
        area=label,
        kpis=[
            KPIData(label=f"Total {label}", value=str(total), change="", trend="up", icon=area_icons[0]),
            KPIData(label="Linha com Mais", value=top_linha, change="", trend="up", icon=area_icons[1]),
            KPIData(label="Motorista com Mais", value=top_motorista, change="", trend="up", icon=area_icons[2]),
            KPIData(label="Total Registos", value=str(total), change="", trend="up", icon=area_icons[3]),
        ]
    )


@api_router.get("/")
async def root():
    return {"message": "TUB - Plataforma de Nao Conformidades"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.get("/kpis/{area_key}", response_model=AreaKPIs)
async def get_area_kpis(
    area_key: str,
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
):
    if area_key not in COLLECTION_MAP:
        return AreaKPIs(area=area_key, kpis=[])
    collection_name = COLLECTION_MAP[area_key]
    return await compute_kpis(collection_name, area_key, start_date, end_date)


@api_router.get("/overview")
async def get_overview(
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
):
    date_filter = build_date_filter(start_date, end_date)
    acertos_count = await db.acertos.count_documents(date_filter)
    trocas_count = await db.trocas.count_documents(date_filter)
    faltas_count = await db.faltas_circulacao.count_documents(date_filter)
    total = acertos_count + trocas_count + faltas_count

    return {
        "total_nao_conformidades": str(total),
        "areas": [
            {"name": "Acertos", "count": str(acertos_count), "icon": "CheckCircle"},
            {"name": "Trocas", "count": str(trocas_count), "icon": "ArrowLeftRight"},
            {"name": "Faltas de Circulacao", "count": str(faltas_count), "icon": "AlertTriangle"},
        ]
    }


@api_router.post("/upload/{area_key}")
async def upload_data(area_key: str, file: UploadFile = File(...)):
    if area_key not in COLLECTION_MAP:
        return {"error": f"Area '{area_key}' invalida. Use: acertos, trocas, faltas"}

    collection_name = COLLECTION_MAP[area_key]
    contents = await file.read()

    df = _read_upload_file(file.filename, contents)
    if isinstance(df, dict):
        return df

    col_mapping = _detect_columns(df)
    if not col_mapping:
        return {
            "error": "Colunas nao reconhecidas. O ficheiro deve conter colunas: Data, Linha, Motorista"
        }

    records = _build_records(df, col_mapping)
    if records:
        await db[collection_name].insert_many(records)

    return {
        "success": True,
        "area": area_key,
        "records_imported": len(records),
        "filename": file.filename,
        "columns_detected": list(col_mapping.keys()),
    }


def _read_upload_file(filename: str, contents: bytes):
    try:
        if filename.endswith(".csv"):
            return pd.read_csv(io.BytesIO(contents))
        elif filename.endswith((".xlsx", ".xls")):
            return pd.read_excel(io.BytesIO(contents))
        else:
            return {"error": "Formato nao suportado. Use CSV ou Excel (.xlsx/.xls)"}
    except Exception as e:
        return {"error": f"Erro ao ler ficheiro: {str(e)}"}


def _detect_columns(df) -> dict:
    col_mapping = {}
    aliases = {
        "data": ("data", "date", "data_ocorrencia"),
        "linha": ("linha", "line", "rota", "route"),
        "motorista": ("motorista", "driver", "condutor"),
    }
    for col in df.columns:
        col_lower = col.strip().lower()
        for key, names in aliases.items():
            if col_lower in names:
                col_mapping[key] = col
    return col_mapping


def _build_records(df, col_mapping: dict) -> list:
    records = []
    for _, row in df.iterrows():
        record = {"id": str(uuid.uuid4())}
        if "data" in col_mapping:
            val = row[col_mapping["data"]]
            if pd.notna(val):
                record["data"] = val.isoformat() if isinstance(val, pd.Timestamp) else str(val)
            else:
                record["data"] = ""
        if "linha" in col_mapping:
            val = row[col_mapping["linha"]]
            record["linha"] = str(val) if pd.notna(val) else ""
        if "motorista" in col_mapping:
            val = row[col_mapping["motorista"]]
            record["motorista"] = str(val) if pd.notna(val) else ""
        record["created_at"] = datetime.now(timezone.utc).isoformat()
        records.append(record)
    return records


@api_router.get("/data/{area_key}")
async def get_area_data(
    area_key: str,
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    limit: int = Query(100, le=1000),
):
    if area_key not in COLLECTION_MAP:
        return {"error": f"Area '{area_key}' invalida"}
    collection_name = COLLECTION_MAP[area_key]
    date_filter = build_date_filter(start_date, end_date)
    docs = await db[collection_name].find(date_filter, {"_id": 0}).sort("data", -1).to_list(limit)
    total = await db[collection_name].count_documents(date_filter)
    return {"area": area_key, "total": total, "data": docs}


@api_router.delete("/data/{area_key}")
async def delete_area_data(area_key: str):
    if area_key not in COLLECTION_MAP:
        return {"error": f"Area '{area_key}' invalida"}
    collection_name = COLLECTION_MAP[area_key]
    result = await db[collection_name].delete_many({})
    return {"success": True, "deleted_count": result.deleted_count}


@api_router.get("/upload-stats")
async def get_upload_stats():
    acertos = await db.acertos.count_documents({})
    trocas = await db.trocas.count_documents({})
    faltas = await db.faltas_circulacao.count_documents({})
    return {
        "acertos": acertos,
        "trocas": trocas,
        "faltas": faltas,
        "total": acertos + trocas + faltas,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
