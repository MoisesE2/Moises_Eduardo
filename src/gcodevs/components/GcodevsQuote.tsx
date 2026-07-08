import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { SERVICES, whatsappUrl } from "../copy";

const PROJECT_TYPES = [...SERVICES.map((s) => s.name), "Outro tipo de projeto"];

const inputClasses =
  "w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 " +
  "dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 " +
  "focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900/50 transition-colors";

const GcodevsQuote: React.FC = () => {
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Olá! Meu nome é ${name.trim()} e quero um orçamento.\n\n` +
      `Tipo de projeto: ${projectType}` +
      (message.trim() ? `\n\nSobre o projeto: ${message.trim()}` : "");
    window.open(whatsappUrl(text), "_blank");
  };

  return (
    <section id="orcamento" className="bg-white dark:bg-slate-950 py-20 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Peça seu orçamento
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Grátis e sem compromisso. Respondemos em horário comercial (Seg-Sáb, 9h às 19h).
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-8 space-y-4 shadow-sm"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className={inputClasses}
            required
          />
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className={inputClasses}
            aria-label="Tipo de projeto"
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Conte um pouco sobre o projeto (opcional)"
            rows={4}
            className={`${inputClasses} resize-none`}
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25 transition-all active:scale-[0.99]"
          >
            <FaWhatsapp className="w-5 h-5" />
            Enviar via WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};

export default GcodevsQuote;
