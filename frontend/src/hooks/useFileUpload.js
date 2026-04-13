import { useState, useCallback } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VALID_EXTENSIONS = [".csv", ".xlsx", ".xls"];

function getFileExtension(filename) {
  return filename.substring(filename.lastIndexOf(".")).toLowerCase();
}

export function useFileUpload(areaKey, onSuccess) {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setUploading(false);
  }, []);

  const upload = useCallback(
    async (file) => {
      if (!file) return;
      const ext = getFileExtension(file.name);
      if (!VALID_EXTENSIONS.includes(ext)) {
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
      } catch (_err) {
        setError("Erro ao enviar ficheiro. Tente novamente.");
      } finally {
        setUploading(false);
      }
    },
    [areaKey, onSuccess]
  );

  return { uploading, result, error, upload, reset };
}
