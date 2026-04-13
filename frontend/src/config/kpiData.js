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
    kpis: [
      { label: "Total Acertos",       value: "1.247",  icon: "CheckCircle" },
      { label: "Linha com Mais",       value: "Linha 1 (312)", icon: "MapPin" },
      { label: "Motorista com Mais",   value: "Joao Silva (89)", icon: "User" },
      { label: "Taxa de Resolucao",    value: "87.3%",  icon: "TrendingUp" },
    ],
  },

  // --- TROCAS ---
  trocas: {
    title: "Trocas",
    kpis: [
      { label: "Total Trocas",        value: "834",    icon: "ArrowLeftRight" },
      { label: "Linha com Mais",       value: "Linha 3 (198)", icon: "MapPin" },
      { label: "Motorista com Mais",   value: "Maria Santos (67)", icon: "User" },
      { label: "Taxa de Aprovacao",    value: "85.4%",  icon: "TrendingUp" },
    ],
  },

  // --- FALTAS DE CIRCULACAO ---
  faltas: {
    title: "Faltas de Circulacao",
    kpis: [
      { label: "Total Faltas",        value: "312",    icon: "AlertTriangle" },
      { label: "Linha com Mais",       value: "Linha 5 (74)", icon: "MapPin" },
      { label: "Motorista com Mais",   value: "Pedro Costa (41)", icon: "User" },
      { label: "Taxa de Justificacao", value: "60.6%",  icon: "TrendingUp" },
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
