import { BarChart3 } from "lucide-react";

const POWERBI_BASE_URL =
  "https://app.powerbi.com/reportEmbed?reportId=06ce867a-09ee-47ee-87e0-d9f85bdb227c&autoAuth=true&ctid=6f7af7ee-61c5-447d-a6b5-ff4bdbb5c089";

export const PowerBIEmbed = ({ pageName, title }) => {
  const embedUrl = pageName
    ? `${POWERBI_BASE_URL}&pageName=${pageName}`
    : POWERBI_BASE_URL;

  return (
    <div data-testid={`powerbi-embed-${title?.toLowerCase().replace(/\s+/g, "-") || "report"}`}>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={20} className="text-[#017cb7]" />
        <h2 className="font-['Outfit'] text-lg font-semibold text-slate-900">
          Relatorio Power BI - {title}
        </h2>
      </div>

      <div className="powerbi-container">
        <iframe
          title={`Power BI - ${title}`}
          src={embedUrl}
          allowFullScreen
          data-testid={`powerbi-iframe-${title?.toLowerCase().replace(/\s+/g, "-") || "report"}`}
        />
      </div>
    </div>
  );
};
