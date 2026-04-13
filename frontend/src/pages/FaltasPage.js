import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import axios from "axios";
import { KPICard } from "../components/KPICard";
import { PowerBIEmbed } from "../components/PowerBIEmbed";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function FaltasPage() {
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/kpis/faltas`)
      .then((res) => setKpis(res.data.kpis))
      .catch((err) => console.error("Failed to load Faltas KPIs", err));
  }, []);

  return (
    <div data-testid="faltas-page" className="min-h-screen">
      {/* Page Header */}
      <div className="bg-[#017cb7] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <AlertTriangle size={28} />
            <div>
              <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold tracking-tight">
                Faltas de Circulacao
              </h1>
              <p className="text-white/70 text-sm mt-1">
                Indicadores operacionais de faltas de circulacao
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="tub-page-wrapper">
        {/* KPIs */}
        <div
          data-testid="faltas-kpis"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {kpis.map((kpi, idx) => (
            <KPICard key={kpi.label} {...kpi} index={idx} />
          ))}
        </div>

        {/* Power BI Report */}
        <PowerBIEmbed title="Faltas de Circulacao" pageName="FaltasCirculacao" />
      </div>
    </div>
  );
}
