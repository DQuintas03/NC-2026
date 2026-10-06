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
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiNGVjOGFhMmMtM2U0NS00ODg4LTg4MGYtNDM3OTc2MWVhNDEzIiwidCI6IjZmN2FmN2VlLTYxYzUtNDQ3ZC1hNmI1LWZmNGJkYmI1YzA4OSIsImMiOjl9",
    kpis: [
      { label: "Total Acertos", value: "376",      icon: "CheckCircle" },
      { label: "Linha",         value: "Linha 2",  icon: "MapPin" },
      { label: "Motorista",     value: "3339",     icon: "User" },
    ],
  },

  // --- TROCAS ---
  trocas: {
    title: "Trocas",
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiMzcyZmRjZGItMWYxNy00MWUyLWI0ZDItMGQ4YzJlZGUzOTdmIiwidCI6IjZmN2FmN2VlLTYxYzUtNDQ3ZC1hNmI1LWZmNGJkYmI1YzA4OSIsImMiOjl9",
    kpis: [
      { label: "Total Trocas", value: "5.240",    icon: "ArrowLeftRight" },
      { label: "Linha",        value: "Linha 2",  icon: "MapPin" },
      { label: "Motorista",    value: "3487",     icon: "User" },
    ],
  },

  // --- FALTAS DE CIRCULACAO ---
  faltas: {
    title: "Faltas de Circulação",
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiZGY1YzhmYzEtMWEwNC00M2M5LTg1YTYtMTI4MDI0ZjA3NDdmIiwidCI6IjZmN2FmN2VlLTYxYzUtNDQ3ZC1hNmI1LWZmNGJkYmI1YzA4OSIsImMiOjl9",
    kpis: [
      { label: "Total Faltas",      value: "114",      icon: "AlertTriangle" },
      { label: "Linha",             value: "Linha 2",  icon: "MapPin" },
      { label: "Motorista",         value: "3477",     icon: "User" },
      { label: "Km's por realizar", value: "903,69",   icon: "TrendingUp" },
    ],
  },

  // --- NC GERAL ---
  ncGeral: {
    title: "NC Geral",
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiZTcxMjcwMmYtZTUzMC00OGZkLTg3MjgtMWIxMmVkMzc2MmEyIiwidCI6IjZmN2FmN2VlLTYxYzUtNDQ3ZC1hNmI1LWZmNGJkYmI1YzA4OSIsImMiOjl9",
    kpis: [
      { label: "Não Conformidades", value: "5.730", icon: "BarChart3" },
      { label: "Viatura",           value: "425",   icon: "Bus" },
      { label: "Linha",             value: "2",     icon: "MapPin" },
    ],
  },

  // --- RESUMO GERAL (homepage) ---
  overview: {
    total: "5.730",
    areas: [
      { name: "Acertos",             count: "376" },
      { name: "Trocas",              count: "5.240" },
      { name: "Faltas de Circulação", count: "114" },
    ],
  },
};

export default KPI_DATA;
