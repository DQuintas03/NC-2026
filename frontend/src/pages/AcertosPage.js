import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { KPICard } from "../components/KPICard";
import { PowerBIEmbed } from "../components/PowerBIEmbed";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function AcertosPage() {
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/kpis/acertos`)
      .then((res) => setKpis(res.data.kpis))
      .catch((err) => console.error("Failed to load Acertos KPIs", err));
  }, []);

  return (
    <div data-testid="acertos-page" className="min-h-screen">
      {/* Page Header */}
      <div className="bg-[#017cb7] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <CheckCircle size={28} />
            <div>
              <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold tracking-tight">
                Acertos
              </h1>
              <p className="text-white/70 text-sm mt-1">
                Indicadores operacionais de acertos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="tub-page-wrapper">
        {/* KPIs */}
        <div
          data-testid="acertos-kpis"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {kpis.map((kpi, idx) => (
            <KPICard key={kpi.label} {...kpi} index={idx} />
          ))}
        </div>

        {/* Power BI Report */}
        <PowerBIEmbed title="Acertos" pageName="Acertos" />
      </div>
    </div>
  );
}
