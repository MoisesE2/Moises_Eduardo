import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { ExclamationTriangleIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { PROBLEMS, SOLUTION, whatsappUrl, QUOTE_MESSAGE } from "../copy";

const GcodevsProblemSolution: React.FC = () => (
  <section className="bg-slate-50 dark:bg-slate-900 py-20 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Você precisa de um site se...
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Se alguma dessas situações parece familiar, seu negócio está perdendo clientes todos os dias.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {PROBLEMS.map((problem) => (
          <div
            key={problem.title}
            className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm"
          >
            <ExclamationTriangleIcon className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{problem.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{problem.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 p-8 sm:p-10 text-center text-white">
        <CheckBadgeIcon className="w-10 h-10 mx-auto mb-4 text-white/90" />
        <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">{SOLUTION.title}</h3>
        <p className="text-white/90 max-w-2xl mx-auto leading-relaxed mb-6">{SOLUTION.description}</p>
        <a
          href={whatsappUrl(QUOTE_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-white text-violet-700 hover:bg-slate-100 transition-colors"
        >
          <FaWhatsapp className="w-5 h-5" />
          Quero resolver isso agora
        </a>
      </div>
    </div>
  </section>
);

export default GcodevsProblemSolution;
