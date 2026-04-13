import { useState, useCallback } from "react";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const UploadModal = ({ open, onOpenChange, areaKey, areaLabel, onSuccess }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const resetState = () => {
    setResult(null);
    setError(null);
    setUploading(false);
  };

  const handleFile = useCallback(
    async (file) => {
      if (!file) return;
      const validTypes = [".csv", ".xlsx", ".xls"];
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!validTypes.includes(ext)) {
        setError("Formato invalido. Use ficheiros CSV ou Excel (.xlsx/.xls).");
        return;
      }

      setUploading(true);
      setError(null);
      setResult(null);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`${API}/upload/${areaKey}`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setResult(data);
          if (onSuccess) onSuccess();
        }
      } catch (err) {
        setError("Erro ao enviar ficheiro. Tente novamente.");
      } finally {
        setUploading(false);
      }
    },
    [areaKey, onSuccess]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
    e.target.value = "";
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) resetState();
      }}
    >
      <DialogContent className="sm:max-w-lg" data-testid={`upload-modal-${areaKey}`}>
        <DialogHeader>
          <DialogTitle className="font-['Outfit'] text-lg">
            Importar Dados - {areaLabel}
          </DialogTitle>
          <DialogDescription>
            Carregue um ficheiro CSV ou Excel com as colunas: Data, Linha,
            Motorista.
          </DialogDescription>
        </DialogHeader>

        {/* Drop Zone */}
        <div
          data-testid={`upload-dropzone-${areaKey}`}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragOver
              ? "border-[#017cb7] bg-sky-50"
              : "border-slate-300 hover:border-slate-400"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`file-input-${areaKey}`)?.click()}
        >
          <input
            id={`file-input-${areaKey}`}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileInput}
            className="hidden"
            data-testid={`file-input-${areaKey}`}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={40} className="text-[#017cb7] animate-spin" />
              <p className="text-sm text-slate-600">A processar ficheiro...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload size={40} className="text-slate-400" />
              <p className="text-sm text-slate-600">
                Arraste um ficheiro ou clique para selecionar
              </p>
              <p className="text-xs text-slate-400">CSV, XLSX, XLS</p>
            </div>
          )}
        </div>

        {/* Result */}
        {result && (
          <div
            data-testid={`upload-result-${areaKey}`}
            className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200"
          >
            <CheckCircle size={20} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-emerald-800">
                Importacao concluida com sucesso!
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                <FileSpreadsheet size={12} className="inline mr-1" />
                {result.filename} — {result.records_imported} registos importados
              </p>
              <p className="text-xs text-emerald-500 mt-0.5">
                Colunas detetadas: {result.columns_detected?.join(", ")}
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            data-testid={`upload-error-${areaKey}`}
            className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Erro na importacao</p>
              <p className="text-xs text-red-600 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Example format */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Formato esperado
          </p>
          <div className="overflow-x-auto">
            <table className="text-xs text-slate-600 w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-1 pr-4 font-semibold">Data</th>
                  <th className="text-left py-1 pr-4 font-semibold">Linha</th>
                  <th className="text-left py-1 font-semibold">Motorista</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 pr-4">2024-01-15</td>
                  <td className="py-1 pr-4">Linha 1</td>
                  <td className="py-1">Joao Silva</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4">2024-01-16</td>
                  <td className="py-1 pr-4">Linha 3</td>
                  <td className="py-1">Maria Santos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            data-testid={`upload-close-${areaKey}`}
            onClick={() => {
              onOpenChange(false);
              resetState();
            }}
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
