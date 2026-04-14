import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="main-footer"
      className="bg-[#017cb7] text-white mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-['Outfit'] text-xl font-bold mb-2">TUB</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Transportes Urbanos de Braga
            </p>
            <p className="text-white/60 text-xs mt-2">
              Plataforma interna de analise de nao conformidades operacionais.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Outfit'] text-sm font-semibold uppercase tracking-wider mb-3 text-white/90">
              Áreas de Ánalise
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/acertos"
                  data-testid="footer-link-acertos"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Acertos
                </Link>
              </li>
              <li>
                <Link
                  to="/trocas"
                  data-testid="footer-link-trocas"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Trocas
                </Link>
              </li>
              <li>
                <Link
                  to="/faltas"
                  data-testid="footer-link-faltas"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Faltas de Circulação
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Outfit'] text-sm font-semibold uppercase tracking-wider mb-3 text-white/90">
              Contacto
            </h4>
            <p className="text-white/70 text-sm">
              Transportes Urbanos de Braga
            </p>
            <p className="text-white/60 text-xs mt-1">
              Braga, Portugal
            </p>
            <a
              href="https://tub.pt"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-link-tub-site"
              className="inline-block mt-3 text-white/80 hover:text-white text-sm underline underline-offset-2 transition-colors"
            >
              tub.pt
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            {currentYear} TUB - Transportes Urbanos de Braga. Uso interno.
          </p>
          <p className="text-white/40 text-xs">
            Plataforma de Não Conformidades v1.0
          </p>
        </div>
      </div>
    </footer>
  );
};
