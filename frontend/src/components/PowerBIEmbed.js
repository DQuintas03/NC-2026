import { BarChart3 } from "lucide-react";

export const PowerBIEmbed = ({ embedUrl, title }) => {
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
