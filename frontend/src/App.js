import "@/App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AcertosPage from "./pages/AcertosPage";
import TrocasPage from "./pages/TrocasPage";
import FaltasPage from "./pages/FaltasPage";
import NCGeralPage from "./pages/NCGeralPage";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="App flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/nc-geral" element={<NCGeralPage />} />
                      <Route path="/acertos" element={<AcertosPage />} />
                      <Route path="/trocas" element={<TrocasPage />} />
                      <Route path="/faltas" element={<FaltasPage />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
