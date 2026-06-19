import { useState } from "react";
import { ArrowLeft, AlertCircle, Zap, CheckCircle2, ChevronRight } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, BarChart, Bar, LabelList,
} from "recharts";

const monthlyData = [
  { month: "Jan", ncs: 16, rate: 0.52 },
  { month: "Fev", ncs: 40, rate: 1.43 },
  { month: "Mar", ncs: 75, rate: 2.42 },
  { month: "Abr", ncs: 51, rate: 1.70 },
  { month: "Mai", ncs: 27, rate: 0.87 },
];

const motivosData = [
  { motivo: "Avaria de Viatura", count: 107 },
  { motivo: "Atrasos/Engarrafamentos", count: 52 },
  { motivo: "Reposições à Carreira", count: 24 },
  { motivo: "Outros", count: 26 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="font-semibold text-gray-800 mb-1">{label} 2026</p>
      <p className="text-[#017cb7] font-bold">{payload[0].value} NCs</p>
      <p className="text-gray-400 text-xs">{payload[0].payload.rate} NCs/dia</p>
    </div>
  );
};

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  const isAfter = payload.month === "Mai";
  return (
    <circle cx={cx} cy={cy} r={6}
      fill={isAfter ? "#10b981" : "#017cb7"}
      stroke="white" strokeWidth={2}
    />
  );
};

function Linha90Detail({ onBack }) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar às melhorias
        </button>
      </div>

      {/* Hero */}
      <div className="bg-[#0f172a] text-white py-16 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#01a7f4] text-sm font-semibold tracking-widest uppercase mb-4">
            Melhoria Operacional · Março — Maio 2026
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
            <div>
              <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Linha</p>
              <p className="text-white font-black text-9xl leading-none">90</p>
            </div>
            <div>
              <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Redução do pico a Maio</p>
              <p className="text-green-400 font-black text-8xl leading-none">-64%</p>
            </div>
            <div className="lg:ml-auto grid grid-cols-2 gap-8 text-center lg:pb-2">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Pico · Março</p>
                <p className="text-red-400 text-4xl font-bold">2.42</p>
                <p className="text-white/30 text-xs mt-1">NCs/dia</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Após medida · Maio</p>
                <p className="text-green-400 text-4xl font-bold">0.87</p>
                <p className="text-white/30 text-xs mt-1">NCs/dia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Problema + Intervenção */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle size={16} className="text-red-500" />
              </div>
              <p className="text-red-500 font-semibold text-sm uppercase tracking-widest">O Problema</p>
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              A Linha 90 registou uma escalada progressiva de não conformidades entre Janeiro e Março,
              atingindo <strong>75 NCs em Março</strong> — o valor mais elevado do período.
              A análise identificou excesso de pressão operacional sobre as viaturas,
              dificultando o cumprimento dos horários programados.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap size={16} className="text-[#017cb7]" />
              </div>
              <p className="text-[#017cb7] font-semibold text-sm uppercase tracking-widest">
                A Intervenção · 21 Abril 2026
              </p>
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              Foi adicionada uma nova viatura à Linha 90, mantendo a frequência existente.
              Esta medida aumentou o tempo disponível por percurso, permitindo que as viagens
              cumprissem os horários sem pressão sobre a frota e{" "}
              <strong>sem qualquer impacto na frequência para o passageiro</strong>.
            </p>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h3 className="font-semibold text-gray-800 text-lg mb-1">Evolução mensal — Linha 90</h3>
          <p className="text-gray-400 text-sm mb-8">
            Não conformidades por mês. A linha vertical assinala o momento da intervenção.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 13 }}
                axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 13 }}
                axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                x="Abr"
                stroke="#f59e0b"
                strokeDasharray="5 5"
                strokeWidth={2}
                label={{
                  value: "21 Abr — Nova viatura",
                  position: "top",
                  fill: "#f59e0b",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
              <Line
                type="monotone"
                dataKey="ncs"
                stroke="#017cb7"
                strokeWidth={2.5}
                dot={<CustomDot />}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-6 justify-center text-xs text-gray-400 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#017cb7] inline-block" />
              Antes da intervenção
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              Após a intervenção
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-6 border-t-2 border-dashed border-amber-400 inline-block" />
              Data da medida
            </span>
          </div>
        </div>

        {/* Motivos */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h3 className="font-semibold text-gray-800 text-lg mb-1">Distribuição por motivo</h3>
          <p className="text-gray-400 text-sm mb-8">
            Principais causas das não conformidades na Linha 90 ao longo de todo o período.
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={motivosData} layout="vertical"
              margin={{ left: 10, right: 60, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="motivo"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false} tickLine={false} width={180} />
              <Tooltip cursor={{ fill: "#f8fafc" }} />
              <Bar dataKey="count" fill="#017cb7" radius={[0, 6, 6, 0]}>
                <LabelList dataKey="count" position="right" fill="#64748b" fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Resultado final */}
        <div className="bg-[#0f172a] rounded-2xl p-10 text-center">
          <CheckCircle2 size={36} className="text-green-400 mx-auto mb-4" />
          <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Resultado</p>
          <p className="text-white text-xl sm:text-2xl font-semibold max-w-2xl mx-auto leading-relaxed">
            Em Maio de 2026, a Linha 90 registou o valor mais baixo de não conformidades
            de todo o período —{" "}
            <span className="text-green-400 font-bold">27 ocorrências</span>, face a um
            pico de <span className="text-red-400 font-bold">75 em Março</span>. A adição
            de uma viatura, sem alterar a frequência, provou ser suficiente para inverter
            a tendência e estabilizar a linha.
          </p>
        </div>

      </div>
    </div>
  );
}

export default function MelhoriasPage() {
  const [selected, setSelected] = useState(null);

  if (selected === "linha90") {
    return <Linha90Detail onBack={() => setSelected(null)} />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#0f172a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#01a7f4] text-sm font-semibold tracking-widest uppercase mb-3">
            TUB · Não Conformidades
          </p>
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-bold mb-4">
            Melhorias Operacionais
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Cada não conformidade é um sinal. Aqui registamos as acções tomadas
            e os resultados que provam que o sistema funciona.
          </p>
        </div>
      </div>

      {/* Cases */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => setSelected("linha90")} className="w-full text-left group">
          <div className="bg-[#0f172a] rounded-2xl p-8 sm:p-12 hover:bg-[#1e293b] transition-colors duration-300 relative overflow-hidden">
            <div className="absolute top-6 right-6">
              <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                Concluída
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end gap-8">
              <div>
                <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Linha</p>
                <p className="text-white font-black text-8xl sm:text-9xl leading-none">90</p>
              </div>
              <div className="sm:pb-2">
                <p className="text-green-400 font-black text-6xl sm:text-7xl leading-none">-64%</p>
                <p className="text-white/60 text-lg mt-2">de não conformidades</p>
                <p className="text-white/30 text-sm mt-1">Março → Maio 2026</p>
              </div>
              <div className="sm:ml-auto sm:pb-2 flex items-center gap-2 text-[#01a7f4] group-hover:gap-4 transition-all duration-300">
                <span className="text-sm font-medium">Ver análise completa</span>
                <ChevronRight size={18} />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/40 text-sm">
                Adição de nova viatura mantendo a frequência — aumentando a fiabilidade sem impacto para o passageiro
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
