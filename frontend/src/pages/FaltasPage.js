import { AlertTriangle } from "lucide-react";
import { KPICard } from "../components/KPICard";
import { PowerBIEmbed } from "../components/PowerBIEmbed";
import KPI_DATA from "../config/kpiData";

export default function FaltasPage() {
  const { kpis } = KPI_DATA.faltas;

  return (
    <div data-testid="faltas-page" className="min-h-screen">
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
        <div
          data-testid="faltas-kpis"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {kpis.map((kpi, idx) => (
            <KPICard key={kpi.label} {...kpi} index={idx} />
          ))}
        </div>

        <PowerBIEmbed title="Faltas de Circulacao" pageName="FaltasCirculacao" />
      </div>
    </div>
  );
}
