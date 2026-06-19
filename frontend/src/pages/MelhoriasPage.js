import { useState } from "react";
import { ArrowLeft, TrendingDown, Award, ChevronRight } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ReferenceArea, ResponsiveContainer,
  BarChart, Bar, LabelList, Cell,
} from "recharts";

// ── Data ────────────────────────────────────────────────────────────────────

const MONTHLY = [
  { month: "Jan", ncs: 16 },
  { month: "Fev", ncs: 40 },
  { month: "Mar", ncs: 75 },
  { month: "Abr", ncs: 51 },
  { month: "Mai", ncs: 27 },
];

const MOTIVOS = [
  { label: "Avaria de Viatura",    value: 107 },
  { label: "Atrasos",              value: 52  },
  { label: "Reposições",           value: 24  },
  { label: "Outros",               value: 26  },
];

// ── Micro components ─────────────────────────────────────────────────────────

const Sparkline = ({ data }) => (
  <ResponsiveContainer width="100%" height={44}>
    <LineChart data={data} margin={{ top: 4, right: 2, left: 2, bottom: 4 }}>
      <Line type="monotone" dataKey="ncs" stroke="#10b981"
        dot={false} strokeWidth={2} isAnimationActive={false} />
    </LineChart>
  </ResponsiveContainer>
);

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const after = label === "Mai";
  return (
    <div className="bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-md">
      <p className="text-gray-400 text-xs mb-0.5">{label} 2026</p>
      <p className={`font-bold text-sm ${after ? "text-green-600" : "text-[#017cb7]"}`}>
        {payload[0].value} NCs
      </p>
    </div>
  );
};

const ChartDot = ({ cx, cy, payload }) => (
  <circle cx={cx} cy={cy} r={5}
    fill={payload.month === "Mai" ? "#10b981" : "#017cb7"}
    stroke="white" strokeWidth={2} />
);

const Stat = ({ label, value, color = "text-gray-800", sub }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{label}</p>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
    {sub && <p className="text-xs text-gray-300 mt-1">{sub}</p>}
  </div>
);

const Callout = ({ color, label, text }) => {
  const scheme = {
    red:   "border-red-400 bg-red-50 text-red-500",
    blue:  "border-[#017cb7] bg-blue-50 text-[#017cb7]",
    green: "border-green-500 bg-green-50 text-green-600",
  }[color];
  return (
    <div className={`border-l-4 rounded-r-xl px-4 py-3.5 ${scheme.split(" ").slice(1).join(" ")}`}
      style={{ borderLeftColor: scheme.split(" ")[0].replace("border-", "").replace("[", "").replace("]", "") }}>
      <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${scheme.split(" ").pop()}`}>{label}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
};

// ── Landing card ─────────────────────────────────────────────────────────────

const CaseCard = ({ onClick }) => (
  <button onClick={onClick} className="group text-left w-full">
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Linha</p>
          <p className="text-4xl font-black text-gray-800 leading-none">90</p>
        </div>
        <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
          Concluída
        </span>
      </div>
      <div className="flex items-end gap-4">
        <div>
          <p className="text-3xl font-bold text-green-600">-64%</p>
          <p className="text-xs text-gray-400 mt-0.5">de não conformidades</p>
          <p className="text-xs text-gray-300 mt-0.5">Abr 2026 · Nova viatura</p>
        </div>
        <div className="flex-1 opacity-60">
          <Sparkline data={MONTHLY} />
        </div>
      </div>
      <div className="flex items-center gap-1 text-[#017cb7] text-xs font-medium mt-4 pt-4 border-t border-gray-50 group-hover:gap-2 transition-all duration-200">
        Ver análise <ChevronRight size={13} />
      </div>
    </div>
  </button>
);

// ── Linha 90 detail ──────────────────────────────────────────────────────────

const Linha90 = ({ onBack }) => (
  <div>
    <div className="bg-[#017cb7] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft size={14} /> Melhorias
        </button>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <TrendingDown size={26} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Linha 90</h1>
              <p className="text-white/70 text-sm mt-0.5">Melhoria operacional · Abril 2026</p>
            </div>
          </div>
          <span className="text-xs font-medium text-green-300 bg-green-900/30 border border-green-700/40 px-3 py-1.5 rounded-full">
            Concluída
          </span>
        </div>
      </div>
    </div>

    <div className="tub-page-wrapper space-y-6">

      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="Pico · Março"        value="75"     color="text-red-500"    sub="NCs/mês" />
        <Stat label="Após medida · Maio"  value="27"     color="text-green-600"  sub="NCs/mês" />
        <Stat label="Redução"             value="-64%"   color="text-[#017cb7]"  sub="do pico a Maio" />
        <Stat label="Intervenção"         value="21 Abr" color="text-gray-700"   sub="2026" />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Evolução mensal — Linha 90</h3>
            <p className="text-xs text-gray-400 mt-0.5">NCs por mês · Jan–Mai 2026</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#017cb7] inline-block" /> Antes
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Após medida
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={MONTHLY} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <ReferenceArea x1="Abr" x2="Mai" fill="#10b981" fillOpacity={0.07} />
            <ReferenceLine x="Abr" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={1.5}
              label={{ value: "21 Abr", position: "insideTopRight", fill: "#f59e0b", fontSize: 11 }} />
            <Line type="monotone" dataKey="ncs" stroke="#017cb7" strokeWidth={2.5}
              dot={<ChartDot />} activeDot={{ r: 7, strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row: callouts + motivos */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        <div className="lg:col-span-2 space-y-3">
          <div className="border-l-4 border-red-400 bg-red-50 rounded-r-xl px-4 py-3.5">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">Problema</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Escalada Jan→Mar — pressão operacional impedia o cumprimento de horários.
            </p>
          </div>
          <div className="border-l-4 border-[#017cb7] bg-blue-50 rounded-r-xl px-4 py-3.5">
            <p className="text-xs font-semibold text-[#017cb7] uppercase tracking-widest mb-1">Medida · 21 Abr</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nova viatura na linha, mesma frequência — mais tempo por percurso, horários cumpridos.
            </p>
          </div>
          <div className="border-l-4 border-green-500 bg-green-50 rounded-r-xl px-4 py-3.5">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1">Resultado</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Maio: <strong>27 NCs</strong> — valor mais baixo de todo o período, abaixo de Janeiro.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 text-sm mb-0.5">Por motivo</h3>
          <p className="text-xs text-gray-400 mb-5">Total acumulado · Linha 90</p>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={MOTIVOS} layout="vertical"
              margin={{ left: 0, right: 44, top: 0, bottom: 0 }}>
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="label"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false} tickLine={false} width={140} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {MOTIVOS.map((_, i) => (
                  <Cell key={i}
                    fill={["#017cb7", "#01a7f4", "#7dd3fc", "#bae6fd"][i]} />
                ))}
                <LabelList dataKey="value" position="right"
                  fill="#94a3b8" fontSize={11} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  </div>
);

// ── Main export ───────────────────────────────────────────────────────────────

export default function MelhoriasPage() {
  const [selected, setSelected] = useState(null);

  if (selected === "linha90") return <Linha90 onBack={() => setSelected(null)} />;

  return (
    <div>
      <div className="bg-[#017cb7] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Award size={26} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Melhorias Operacionais
              </h1>
              <p className="text-white/70 text-sm mt-0.5">Dados que se transformam em acção</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tub-page-wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CaseCard onClick={() => setSelected("linha90")} />
          <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 flex items-center justify-center text-sm text-gray-300">
            Em breve
          </div>
        </div>
      </div>
    </div>
  );
}
