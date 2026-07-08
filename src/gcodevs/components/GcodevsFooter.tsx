import React from "react";
import { CodeBracketIcon } from "@heroicons/react/24/outline";

const GcodevsFooter: React.FC = () => (
  <footer className="bg-slate-950 border-t border-slate-800 py-10 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-violet-600 to-blue-600 text-white">
          <CodeBracketIcon className="w-4 h-4" />
        </span>
        <span>© {new Date().getFullYear()} Gco Devs. Todos os direitos reservados.</span>
      </div>
      <div className="flex items-center gap-5">
        <a
          href="https://moises.gcodevs.com"
          className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          Conheça o desenvolvedor
        </a>
        <a
          href="mailto:moises.eduardogc@gmail.com"
          className="hover:text-white transition-colors"
        >
          moises.eduardogc@gmail.com
        </a>
      </div>
    </div>
  </footer>
);

export default GcodevsFooter;
