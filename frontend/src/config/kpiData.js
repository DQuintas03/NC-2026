// ============================================================
//  INDICADORES MENSAIS - TUB Nao Conformidades
//  
//  Para atualizar os valores mensalmente, basta alterar
//  os numeros abaixo. Nao e necessario alterar mais nada.
// ============================================================

const KPI_DATA = {

  // --- ACERTOS ---
  acertos: {
    title: "Acertos",
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=92f3fd58-b074-4038-85df-8137717e4aa7&autoAuth=true&ctid=6f7af7ee-61c5-447d-a6b5-ff4bdbb5c089",
    kpis: [
      { label: "Total Acertos",  value: "1.247",            icon: "CheckCircle" },
      { label: "Linha",          value: "Linha 1 (312)",     icon: "MapPin" },
      { label: "Motorista",      value: "Joao Silva (89)",   icon: "User" },
    ],
  },

  // --- TROCAS ---
  trocas: {
    title: "Trocas",
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=06ce867a-09ee-47ee-87e0-d9f85bdb227c&autoAuth=true&ctid=6f7af7ee-61c5-447d-a6b5-ff4bdbb5c089",
    kpis: [
      { label: "Total Trocas",  value: "834",               icon: "ArrowLeftRight" },
      { label: "Linha",         value: "Linha 3 (198)",      icon: "MapPin" },
      { label: "Motorista",     value: "Maria Santos (67)",  icon: "User" },
    ],
  },

  // --- FALTAS DE CIRCULACAO ---
  faltas: {
    title: "Faltas de Circulacao",
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=49cdbbed-2b6f-45c7-bf6e-d167737554f5&autoAuth=true&ctid=6f7af7ee-61c5-447d-a6b5-ff4bdbb5c089",
    kpis: [
      { label: "Total Faltas",      value: "312",              icon: "AlertTriangle" },
      { label: "Linha",             value: "Linha 5 (74)",      icon: "MapPin" },
      { label: "Motorista",         value: "Pedro Costa (41)",  icon: "User" },
      { label: "Km's por realizar", value: "60.6%",             icon: "TrendingUp" },
    ],
  },

  // --- RESUMO GERAL (homepage) ---
  overview: {
    total: "2.393",
    areas: [
      { name: "Acertos",              count: "1.247" },
      { name: "Trocas",               count: "834" },
      { name: "Faltas de Circulacao",  count: "312" },
    ],
  },
};

export default KPI_DATA;
