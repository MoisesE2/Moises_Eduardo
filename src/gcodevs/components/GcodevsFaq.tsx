import React from "react";
import { FAQ_ITEMS } from "../copy";

const GcodevsFaq: React.FC = () => (
  <section id="faq" className="bg-slate-50 dark:bg-slate-900 py-20 px-4 sm:px-6">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Perguntas frequentes
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">Tudo o que você precisa saber antes de começar.</p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 open:border-violet-300 dark:open:border-violet-700 open:shadow-sm transition-all"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-bold text-slate-900 dark:text-white">
              {item.question}
              <span className="text-violet-500 dark:text-violet-400 text-xl leading-none transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default GcodevsFaq;
