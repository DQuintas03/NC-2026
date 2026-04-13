import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Painel Geral", path: "/" },
  { label: "Acertos", path: "/acertos" },
  { label: "Trocas", path: "/trocas" },
  { label: "Faltas de Circulacao", path: "/faltas" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      data-testid="main-header"
      className="bg-[#017cb7] text-white sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            data-testid="header-logo"
            className="flex items-center gap-3 shrink-0"
          >
            <span className="font-['Outfit'] text-2xl font-bold tracking-tight">
              TUB
            </span>
            <span className="hidden sm:inline-block h-5 w-px bg-white/30" />
            <span className="hidden sm:block text-white/80 text-sm font-light">
              Nao Conformidades
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            data-testid="desktop-nav"
            className="hidden md:flex items-center gap-1"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                data-testid={`nav-${item.path.replace("/", "") || "home"}`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "bg-[#01a7f4] text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav
            data-testid="mobile-nav"
            className="md:hidden pb-4 border-t border-white/20 pt-3 space-y-1"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                data-testid={`mobile-nav-${item.path.replace("/", "") || "home"}`}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#01a7f4] text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
