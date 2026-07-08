import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { DELIVERABLES } from "../copy";

const GcodevsDeliverables: React.FC = () => (
  <section className="bg-white border-y border-slate-200 dark:bg-slate-900 dark:border-slate-800 py-20 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Todo projeto inclui
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Independente do formato, isso faz parte de qualquer entrega da Gco Devs.
        </p>
      </div>

      <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {DELIVERABLES.map((item) => (
          <li key={item} className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
            <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-500 shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default GcodevsDeliverables;
