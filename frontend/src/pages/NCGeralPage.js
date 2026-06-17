import { BarChart3 } from "lucide-react";
import { KPICard } from "../components/KPICard";
import { PowerBIEmbed } from "../components/PowerBIEmbed";
import KPI_DATA from "../config/kpiData";

export default function NCGeralPage() {
  const { kpis, embedUrl } = KPI_DATA.ncGeral;

  return (
    <div className="min-h-screen">
      <div className="bg-[#017cb7] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <BarChart3 size={28} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                NC Geral
              </h1>
              <p className="text-white/70 text-sm mt-1">
                Indicadores gerais de não conformidades
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="tub-page-wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-5xl mx-auto">
          {kpis.map((kpi, idx) => (
            <KPICard key={kpi.label} {...kpi} index={idx} />
          ))}
        </div>

        <PowerBIEmbed title="NC Geral" embedUrl={embedUrl} />
      </div>
    </div>
  );
}
