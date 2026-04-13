import {
  CheckCircle,
  CircleCheck,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  Search,
  AlertTriangle,
  FileCheck,
  XCircle,
  MapPin,
  User,
  Hash,
} from "lucide-react";

const iconMap = {
  CheckCircle,
  CircleCheck,
  Clock,
  TrendingUp,
  ArrowLeftRight,
  Search,
  AlertTriangle,
  FileCheck,
  XCircle,
  MapPin,
  User,
  Hash,
};

export const KPICard = ({ label, value, change, trend, icon, index = 0 }) => {
  const IconComponent = iconMap[icon] || CheckCircle;
  const isPositive = trend === "up";

  return (
    <div
      data-testid={`kpi-card-${label.toLowerCase().replace(/\s+/g, "-")}`}
      className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center text-[#017cb7]">
          <IconComponent size={20} />
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              isPositive
                ? "text-emerald-700 bg-emerald-50"
                : "text-red-700 bg-red-50"
            }`}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{change}</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#017cb7] font-['Outfit'] break-words">
          {value}
        </p>
        <p className="text-xs font-semibold tracking-[0.1em] uppercase text-slate-500 mt-2">
          {label}
        </p>
      </div>
    </div>
  );
};
