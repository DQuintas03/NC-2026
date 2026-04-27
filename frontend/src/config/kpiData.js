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
      { label: "Total Acertos",  value: "111",            icon: "CheckCircle" },
      { label: "Linha",          value: "Linha 90",     icon: "MapPin" },
      { label: "Motorista",      value: "3246 - 3348",   icon: "User" },
    ],
  },

  // --- TROCAS ---
  trocas: {
    title: "Trocas",
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=06ce867a-09ee-47ee-87e0-d9f85bdb227c&autoAuth=true&ctid=6f7af7ee-61c5-447d-a6b5-ff4bdbb5c089",
    kpis: [
      { label: "Total Trocas",  value: "2.081",               icon: "ArrowLeftRight" },
      { label: "Linha",         value: "Linha 2",      icon: "MapPin" },
      { label: "Motorista",     value: "3487",  icon: "User" },
    ],
  },

  // --- FALTAS DE CIRCULACAO ---
  faltas: {
    title: "Faltas de Circulação",
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=49cdbbed-2b6f-45c7-bf6e-d167737554f5&autoAuth=true&ctid=6f7af7ee-61c5-447d-a6b5-ff4bdbb5c089",
    kpis: [
      { label: "Total Faltas",      value: "46",              icon: "AlertTriangle" },
      { label: "Linha",             value: "Linha 90",      icon: "MapPin" },
      { label: "Motorista",         value: "3477",  icon: "User" },
      { label: "Km's por realizar", value: "444,12",             icon: "TrendingUp" },
    ],
  },
  
// --- NC GERAL ---
ncGeral: {
  title: "NC Geral",
  embedUrl: "COLOCA_AQUI_O_LINK_DO_POWERBI_GERAL",
  kpis: [
    { label: "Não Conformidades", value: "2234", icon: "BarChart3" },
    { label: "Viatura", value: "1021", icon: "Bus" },
    { label: "Motorista", value: "3487", icon: "User" },
    { label: "Linha", value: "2", icon: "MapPin" },
  ],
},
  
  // --- RESUMO GERAL (homepage) ---
  overview: {
    total: "2.238",
    areas: [
      { name: "Acertos",              count: "111" },
      { name: "Trocas",               count: "2.081" },
      { name: "Faltas de Circulação",  count: "46" },
    ],
  },
};

export default KPI_DATA;
