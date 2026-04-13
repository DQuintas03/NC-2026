import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  ArrowLeftRight,
  AlertTriangle,
  ArrowRight,
  Activity,
  BarChart3,
} from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const areaCards = [
  {
    title: "Acertos",
    description: "Analise de acertos operacionais e indicadores de desempenho.",
    path: "/acertos",
    icon: CheckCircle,
    image:
      "https://images.unsplash.com/photo-1759674406716-9645dcddd353?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBjaXR5JTIwYnVzJTIwdHJhbnNpdHxlbnwwfHx8fDE3NzYwOTM4ODN8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    title: "Trocas",
    description:
      "Monitorizacao de trocas e respetivas aprovacoes operacionais.",
    path: "/trocas",
    icon: ArrowLeftRight,
    image:
      "https://images.unsplash.com/photo-1761760178065-f45ba583a014?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBjaXR5JTIwYnVzJTIwdHJhbnNpdHxlbnwwfHx8fDE3NzYwOTM4ODN8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    title: "Faltas de Circulacao",
    description:
      "Acompanhamento de faltas de circulacao e taxas de justificacao.",
    path: "/faltas",
    icon: AlertTriangle,
    image:
      "https://images.unsplash.com/photo-1765034511020-fbf315b3134c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwYnVzJTIwdHJhbnNpdHxlbnwwfHx8fDE3NzYwOTM4ODN8MA&ixlib=rb-4.1.0&q=85",
  },
];

async function fetchOverview() {
  const res = await axios.get(`${API}/overview`);
  return res.data;
}

const StatCard = ({ label, value }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
    <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">
      {label}
    </p>
    <p className="text-3xl font-bold font-['Outfit'] mt-1">{value}</p>
  </div>
);

const AreaNavCard = ({ card, index }) => {
  const Icon = card.icon;
  return (
    <Link
      to={card.path}
      data-testid={`nav-card-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
      className="group relative rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer h-64 animate-fade-in-up block"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[#017cb7]/80 group-hover:bg-[#017cb7]/65 transition-colors duration-300 z-10" />
      <div className="relative p-8 h-full flex flex-col justify-end text-white z-20">
        <div className="flex items-center gap-2 mb-2">
          <Icon size={22} />
          <h3 className="font-['Outfit'] text-xl font-semibold">
            {card.title}
          </h3>
        </div>
        <p className="text-white/80 text-sm leading-relaxed">
          {card.description}
        </p>
        <div className="flex items-center gap-1 mt-4 text-white/70 group-hover:text-white transition-colors text-sm font-medium">
          <span>Ver relatorio</span>
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
};

export default function HomePage() {
  const [overview, setOverview] = useState(null);

  const loadOverview = useCallback(async () => {
    try {
      setOverview(await fetchOverview());
    } catch (err) {
      console.error("Failed to load overview", err);
    }
  }, []);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        data-testid="home-hero"
        className="bg-[#017cb7] text-white py-16 sm:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={18} className="text-white/70" />
              <span className="text-white/70 text-sm font-medium tracking-wide uppercase">
                Plataforma Interna
              </span>
            </div>
            <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Nao Conformidades
            </h1>
            <p className="mt-4 text-white/80 text-base sm:text-lg leading-relaxed max-w-xl">
              Aceda rapidamente aos indicadores operacionais de acertos, trocas e
              faltas de circulacao.
            </p>
          </div>

          {/* Overview Stats */}
          {overview && (
            <div
              data-testid="home-overview-stats"
              className="mt-10 flex flex-wrap gap-6"
            >
              <StatCard
                label="Total Nao Conformidades"
                value={overview.total_nao_conformidades}
              />
              {overview.areas?.map((area) => (
                <StatCard key={area.name} label={area.name} value={area.count} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="tub-page-wrapper">
        <div className="flex items-center gap-2 mb-8">
          <BarChart3 size={20} className="text-[#017cb7]" />
          <h2 className="font-['Outfit'] text-xl sm:text-2xl font-semibold text-slate-900">
            Areas de Analise
          </h2>
        </div>

        <div
          data-testid="home-nav-cards"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {areaCards.map((card, idx) => (
            <AreaNavCard key={card.path} card={card} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
