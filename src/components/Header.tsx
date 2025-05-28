import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Bloqueia o scroll do body quando o menu estiver aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Garante remoção da classe se o componente desmontar
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Nome como link para o topo */}
        <a href="#home" className="text-2xl font-light text-white">
          Moisés Eduardo
        </a>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-8 text-lg text-white">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#sobre" className="hover:underline">Sobre</a>
          <a href="#habilidades" className="hover:underline">Habilidades</a>
          <a href="#portfolio" className="hover:underline">Portfólio</a>
        </nav>

        {/* Botão menu mobile */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      {/* Menu mobile com animação */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-screen bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center gap-8 text-xl text-white z-40"
          >
            <a href="#home" onClick={() => setMenuOpen(false)} className="hover:underline">Home</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)} className="hover:underline">Sobre</a>
            <a href="#habilidades" onClick={() => setMenuOpen(false)} className="hover:underline">Habilidades</a>
            <a href="#portfolio" onClick={() => setMenuOpen(false)} className="hover:underline">Portfólio</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
