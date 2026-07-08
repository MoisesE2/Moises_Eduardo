import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappUrl, QUOTE_MESSAGE } from "../copy";

const GcodevsCtaBand: React.FC = () => (
  <section className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-900 dark:to-blue-950 dark:border-t dark:border-slate-800 py-16 px-4 sm:px-6">
    <div className="absolute inset-0 gcodevs-grid-bg opacity-30 pointer-events-none dark:hidden" aria-hidden="true" />
    <div className="absolute inset-0 gcodevs-grid-bg-dark opacity-50 pointer-events-none hidden dark:block" aria-hidden="true" />
    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
        Pronto para colocar seu negócio no ar?
      </h2>
      <p className="text-lg text-white/85 mb-8">
        Chame no WhatsApp, conte a sua ideia e receba um orçamento gratuito ainda hoje.
      </p>
      <a
        href={whatsappUrl(QUOTE_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-9 py-4 rounded-xl text-lg font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/30 transition-all active:scale-[0.98]"
      >
        <FaWhatsapp className="w-6 h-6" />
        Começar meu projeto
      </a>
    </div>
  </section>
);

export default GcodevsCtaBand;
