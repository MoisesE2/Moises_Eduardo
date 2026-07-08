import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Bars3Icon, XMarkIcon, CodeBracketIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../contexts/ThemeContext";
import { NAV_ITEMS, whatsappUrl, QUOTE_MESSAGE } from "../copy";

const GcodevsHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <a href="#topo" className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-white">
            <CodeBracketIcon className="w-5 h-5" />
          </span>
          Gco Devs
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            title={theme === "dark" ? "Tema claro" : "Tema escuro"}
          >
            {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          <a
            href={whatsappUrl(QUOTE_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors"
          >
            <FaWhatsapp className="w-4 h-4" />
            Orçamento grátis
          </a>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {item.label}
            </a>
          ))}
          <a
            href={whatsappUrl(QUOTE_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-green-600"
          >
            <FaWhatsapp className="w-4 h-4" />
            Orçamento grátis
          </a>
        </div>
      )}
    </header>
  );
};

export default GcodevsHeader;
