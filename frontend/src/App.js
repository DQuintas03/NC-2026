import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import HomePage from "./pages/HomePage";
import AcertosPage from "./pages/AcertosPage";
import TrocasPage from "./pages/TrocasPage";
import FaltasPage from "./pages/FaltasPage";
import ImportPage from "./pages/ImportPage";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/acertos" element={<AcertosPage />} />
            <Route path="/trocas" element={<TrocasPage />} />
            <Route path="/faltas" element={<FaltasPage />} />
            <Route path="/importar" element={<ImportPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
