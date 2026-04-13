import { useState } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CalendarIcon, X } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";

export const DateRangeFilter = ({ onFilter, loading }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const handleApply = () => {
    onFilter({
      start_date: startDate ? format(startDate, "yyyy-MM-dd") : null,
      end_date: endDate ? format(endDate, "yyyy-MM-dd") : null,
    });
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onFilter({ start_date: null, end_date: null });
  };

  return (
    <div
      data-testid="date-range-filter"
      className="flex flex-wrap items-center gap-3"
    >
      {/* Start Date */}
      <Popover open={openStart} onOpenChange={setOpenStart}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-testid="date-filter-start"
            className="w-[180px] justify-start text-left font-normal text-sm"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-[#017cb7]" />
            {startDate ? (
              format(startDate, "dd/MM/yyyy", { locale: pt })
            ) : (
              <span className="text-slate-400">Data inicio</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={(d) => {
              setStartDate(d);
              setOpenStart(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <span className="text-slate-400 text-sm">ate</span>

      {/* End Date */}
      <Popover open={openEnd} onOpenChange={setOpenEnd}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-testid="date-filter-end"
            className="w-[180px] justify-start text-left font-normal text-sm"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-[#017cb7]" />
            {endDate ? (
              format(endDate, "dd/MM/yyyy", { locale: pt })
            ) : (
              <span className="text-slate-400">Data fim</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={(d) => {
              setEndDate(d);
              setOpenEnd(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Apply */}
      <Button
        data-testid="date-filter-apply"
        onClick={handleApply}
        disabled={loading}
        className="bg-[#017cb7] hover:bg-[#01a7f4] text-white text-sm"
      >
        {loading ? "A carregar..." : "Filtrar"}
      </Button>

      {/* Clear */}
      {(startDate || endDate) && (
        <Button
          data-testid="date-filter-clear"
          variant="ghost"
          onClick={handleClear}
          className="text-slate-500 hover:text-slate-700 text-sm px-2"
        >
          <X size={16} className="mr-1" />
          Limpar
        </Button>
      )}
    </div>
  );
};
