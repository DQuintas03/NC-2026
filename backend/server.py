from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class KPIData(BaseModel):
    label: str
    value: str
    change: str
    trend: str  # "up" or "down"
    icon: str


class AreaKPIs(BaseModel):
    area: str
    kpis: List[KPIData]


@api_router.get("/")
async def root():
    return {"message": "TUB - Plataforma de Não Conformidades"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.get("/kpis/acertos", response_model=AreaKPIs)
async def get_acertos_kpis():
    return AreaKPIs(
        area="Acertos",
        kpis=[
            KPIData(label="Total Acertos", value="1.247", change="+12%", trend="up", icon="CheckCircle"),
            KPIData(label="Acertos Resolvidos", value="1.089", change="+8%", trend="up", icon="CircleCheck"),
            KPIData(label="Pendentes", value="158", change="-5%", trend="down", icon="Clock"),
            KPIData(label="Taxa de Resolução", value="87.3%", change="+2.1%", trend="up", icon="TrendingUp"),
        ]
    )


@api_router.get("/kpis/trocas", response_model=AreaKPIs)
async def get_trocas_kpis():
    return AreaKPIs(
        area="Trocas",
        kpis=[
            KPIData(label="Total Trocas", value="834", change="+6%", trend="up", icon="ArrowLeftRight"),
            KPIData(label="Trocas Aprovadas", value="712", change="+10%", trend="up", icon="CircleCheck"),
            KPIData(label="Em Análise", value="98", change="-3%", trend="down", icon="Search"),
            KPIData(label="Taxa de Aprovação", value="85.4%", change="+1.8%", trend="up", icon="TrendingUp"),
        ]
    )


@api_router.get("/kpis/faltas", response_model=AreaKPIs)
async def get_faltas_kpis():
    return AreaKPIs(
        area="Faltas de Circulação",
        kpis=[
            KPIData(label="Total Faltas", value="312", change="-15%", trend="down", icon="AlertTriangle"),
            KPIData(label="Faltas Justificadas", value="189", change="+4%", trend="up", icon="FileCheck"),
            KPIData(label="Não Justificadas", value="123", change="-22%", trend="down", icon="XCircle"),
            KPIData(label="Taxa de Justificação", value="60.6%", change="+5.3%", trend="up", icon="TrendingUp"),
        ]
    )


@api_router.get("/overview")
async def get_overview():
    return {
        "total_nao_conformidades": "2.393",
        "taxa_resolucao_global": "78.2%",
        "areas": [
            {"name": "Acertos", "count": "1.247", "icon": "CheckCircle"},
            {"name": "Trocas", "count": "834", "icon": "ArrowLeftRight"},
            {"name": "Faltas de Circulação", "count": "312", "icon": "AlertTriangle"},
        ]
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
