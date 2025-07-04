import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useKeyboardNavigation } from "./hooks/useA11y";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import HomeIndex from "./pages/home/index";
import './styles/index.css'

const App: React.FC = () => {
  const { t } = useTranslation();
  
  // Ativa navegação por teclado globalmente
  useKeyboardNavigation();

  return (
    <div className="App">
      <ErrorBoundary>
        <Header />
        <main 
          id="main-content"
          className=""
          role="main"
          aria-label={t('accessibility.skipToContent')}
        >
          <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default App;