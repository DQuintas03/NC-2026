import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Email ou password incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Painel esquerdo — identidade TUB */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#017cb7] flex-col justify-between p-12">
        <img
          src="https://play-lh.googleusercontent.com/iSreCpNE1K9TS5sBX07r6JRtFUVrMrpjbVNlnKavmYJu2cXcKbkoMsc_1uay4yoEQ3M"
          alt="TUB"
          className="h-14 w-auto object-contain"
        />

        <div>
          <p className="text-white/50 text-xs uppercase tracking-widest mb-4">
            Plataforma Operacional
          </p>
          <h1 className="text-white text-4xl font-bold leading-tight mb-4">
            Não<br />Conformidades
          </h1>
          <p className="text-white/60 text-base max-w-xs">
            Monitorização e análise da operação da rede TUB em tempo real.
          </p>

          <div className="mt-10 flex gap-8">
            <div>
              <p className="text-white text-2xl font-bold">3.510</p>
              <p className="text-white/40 text-xs mt-0.5">registos em 2026</p>
            </div>
            <div>
              <p className="text-white text-2xl font-bold">80</p>
              <p className="text-white/40 text-xs mt-0.5">linhas monitorizadas</p>
            </div>
            <div>
              <p className="text-white text-2xl font-bold">-64%</p>
              <p className="text-white/40 text-xs mt-0.5">NCs na Linha 90</p>
            </div>
          </div>
        </div>

        <p className="text-white/25 text-xs">
          Acesso restrito a colaboradores TUB · Transportes Urbanos de Braga
        </p>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex-1 flex items-center justify-center px-8 bg-gray-50">
        <div className="w-full max-w-sm">

          <img
            src="https://play-lh.googleusercontent.com/iSreCpNE1K9TS5sBX07r6JRtFUVrMrpjbVNlnKavmYJu2cXcKbkoMsc_1uay4yoEQ3M"
            alt="TUB"
            className="h-10 mx-auto mb-8 object-contain lg:hidden"
          />

          <h2 className="text-xl font-semibold text-gray-800 mb-1">Bem-vindo</h2>
          <p className="text-sm text-gray-400 mb-8">Inicie sessão para aceder à plataforma</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="colaborador@tub.pt"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#017cb7] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#017cb7] focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#017cb7] hover:bg-[#01a7f4] text-white py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
            >
              {loading ? "A entrar..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
