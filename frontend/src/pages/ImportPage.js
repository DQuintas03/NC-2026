import { useState, useEffect } from "react";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  ArrowLeftRight,
  AlertTriangle,
  Database,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { UploadModal } from "../components/UploadModal";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const areas = [
  {
    key: "acertos",
    label: "Acertos",
    icon: CheckCircle,
    color: "bg-sky-50 text-[#017cb7]",
  },
  {
    key: "trocas",
    label: "Trocas",
    icon: ArrowLeftRight,
    color: "bg-amber-50 text-amber-600",
  },
  {
    key: "faltas",
    label: "Faltas de Circulacao",
    icon: AlertTriangle,
    color: "bg-red-50 text-red-600",
  },
];

export default function ImportPage() {
  const [stats, setStats] = useState(null);
  const [uploadArea, setUploadArea] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const loadStats = async () => {
    try {
      const res = await axios.get(`${API}/upload-stats`);
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleDelete = async (areaKey) => {
    if (!window.confirm(`Tem a certeza que deseja apagar todos os dados de ${areaKey}?`)) return;
    setDeleting(areaKey);
    try {
      await axios.delete(`${API}/data/${areaKey}`);
      loadStats();
    } catch (err) {
      console.error("Failed to delete data", err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div data-testid="import-page" className="min-h-screen">
      <div className="bg-[#017cb7] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Database size={28} />
            <div>
              <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold tracking-tight">
                Importar Dados
              </h1>
              <p className="text-white/70 text-sm mt-1">
                Carregue ficheiros CSV ou Excel com dados operacionais
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="tub-page-wrapper">
        {/* Instructions */}
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 mb-8">
          <h2 className="font-['Outfit'] text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <FileSpreadsheet size={20} className="text-[#017cb7]" />
            Formato dos Ficheiros
          </h2>
          <p className="text-sm text-slate-600 mb-3">
            Os ficheiros CSV ou Excel devem conter as seguintes colunas:
          </p>
          <div className="overflow-x-auto">
            <table className="text-sm text-slate-600 border border-slate-200 rounded-md overflow-hidden">
              <thead>
                <tr className="bg-white">
                  <th className="text-left py-2 px-4 font-semibold border-b border-slate-200">Data</th>
                  <th className="text-left py-2 px-4 font-semibold border-b border-slate-200">Linha</th>
                  <th className="text-left py-2 px-4 font-semibold border-b border-slate-200">Motorista</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4 border-b border-slate-100">2024-01-15</td>
                  <td className="py-2 px-4 border-b border-slate-100">Linha 1</td>
                  <td className="py-2 px-4 border-b border-slate-100">Joao Silva</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4">2024-01-16</td>
                  <td className="py-2 px-4">Linha 3</td>
                  <td className="py-2 px-4">Maria Santos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Area Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((area) => {
            const Icon = area.icon;
            const count = stats ? stats[area.key] : 0;
            return (
              <div
                key={area.key}
                data-testid={`import-card-${area.key}`}
                className="bg-white rounded-lg border border-slate-200 shadow-sm p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-full ${area.color} flex items-center justify-center`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-['Outfit'] font-semibold text-slate-900">
                      {area.label}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {count} registos na base de dados
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    data-testid={`import-upload-${area.key}`}
                    onClick={() => setUploadArea(area.key)}
                    className="flex-1 bg-[#017cb7] hover:bg-[#01a7f4] text-white text-sm"
                  >
                    <Upload size={14} className="mr-1.5" />
                    Importar
                  </Button>
                  <Button
                    data-testid={`import-delete-${area.key}`}
                    variant="outline"
                    onClick={() => handleDelete(area.key)}
                    disabled={deleting === area.key || count === 0}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 text-sm"
                  >
                    {deleting === area.key ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Stats */}
        {stats && (
          <div
            data-testid="import-total-stats"
            className="mt-8 bg-white rounded-lg border border-slate-200 shadow-sm p-6 text-center"
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total de registos na base de dados
            </p>
            <p className="text-4xl font-bold font-['Outfit'] text-[#017cb7] mt-2">
              {stats.total}
            </p>
          </div>
        )}
      </div>

      {/* Upload Modals */}
      {areas.map((area) => (
        <UploadModal
          key={area.key}
          open={uploadArea === area.key}
          onOpenChange={(v) => {
            if (!v) setUploadArea(null);
          }}
          areaKey={area.key}
          areaLabel={area.label}
          onSuccess={loadStats}
        />
      ))}
    </div>
  );
}
