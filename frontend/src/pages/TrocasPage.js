import { useEffect, useState, useCallback } from "react";
import { ArrowLeftRight, Upload } from "lucide-react";
import axios from "axios";
import { KPICard } from "../components/KPICard";
import { PowerBIEmbed } from "../components/PowerBIEmbed";
import { DateRangeFilter } from "../components/DateRangeFilter";
import { UploadModal } from "../components/UploadModal";
import { Button } from "../components/ui/button";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function TrocasPage() {
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [dateParams, setDateParams] = useState({});

  const loadKpis = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (params.start_date) query.set("start_date", params.start_date);
      if (params.end_date) query.set("end_date", params.end_date);
      const res = await axios.get(`${API}/kpis/trocas?${query.toString()}`);
      setKpis(res.data.kpis);
    } catch (err) {
      console.error("Failed to load Trocas KPIs", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadKpis();
  }, [loadKpis]);

  const handleFilter = (params) => {
    setDateParams(params);
    loadKpis(params);
  };

  return (
    <div data-testid="trocas-page" className="min-h-screen">
      <div className="bg-[#017cb7] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ArrowLeftRight size={28} />
              <div>
                <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold tracking-tight">
                  Trocas
                </h1>
                <p className="text-white/70 text-sm mt-1">
                  Indicadores operacionais de trocas
                </p>
              </div>
            </div>
            <Button
              data-testid="trocas-upload-btn"
              onClick={() => setUploadOpen(true)}
              className="bg-white/10 border border-white/30 hover:bg-white/20 text-white"
            >
              <Upload size={16} className="mr-2" />
              Importar
            </Button>
          </div>
        </div>
      </div>

      <div className="tub-page-wrapper">
        <div className="mb-6">
          <DateRangeFilter onFilter={handleFilter} loading={loading} />
        </div>

        <div
          data-testid="trocas-kpis"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {kpis.map((kpi, idx) => (
            <KPICard key={kpi.label} {...kpi} index={idx} />
          ))}
        </div>

        <PowerBIEmbed title="Trocas" pageName="Trocas" />
      </div>

      <UploadModal
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        areaKey="trocas"
        areaLabel="Trocas"
        onSuccess={() => loadKpis(dateParams)}
      />
    </div>
  );
}
