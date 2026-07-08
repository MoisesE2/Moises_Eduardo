import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { SERVICES, INVESTMENT_ROWS, whatsappUrl, QUOTE_MESSAGE } from "../copy";

const GcodevsInvestment: React.FC = () => (
  <section id="investimento" className="bg-slate-50 dark:bg-slate-900 py-20 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Compare os formatos
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Cada projeto é orçado sob medida. Veja o que cada formato entrega e peça o orçamento do seu.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="text-left p-4 font-semibold text-slate-500 dark:text-slate-400"> </th>
              {SERVICES.map((service) => (
                <th
                  key={service.id}
                  className={`p-4 text-center font-extrabold text-base ${
                    service.highlighted ? "text-violet-700 dark:text-violet-400" : "text-slate-900 dark:text-white"
                  }`}
                >
                  {service.name}
                  {service.highlighted && (
                    <span className="block text-[11px] font-bold uppercase tracking-wide text-violet-500 dark:text-violet-400">
                      mais pedido
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVESTMENT_ROWS.map((row, rowIndex) => (
              <tr
                key={row.label}
                className={rowIndex % 2 === 0 ? "bg-slate-50/60 dark:bg-slate-900/60" : "bg-white dark:bg-slate-950"}
              >
                <td className="p-4 font-semibold text-slate-700 dark:text-slate-200">{row.label}</td>
                {row.values.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-4 text-center text-slate-600 dark:text-slate-300 ${
                      SERVICES[colIndex].highlighted ? "bg-violet-50/40 dark:bg-violet-950/30" : ""
                    }`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-8">
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Orçamento gratuito e personalizado — sem compromisso e sem surpresa no valor final.
        </p>
        <a
          href={whatsappUrl(QUOTE_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25 transition-all active:scale-[0.98]"
        >
          <FaWhatsapp className="w-5 h-5" />
          Pedir meu orçamento grátis
        </a>
      </div>
    </div>
  </section>
);

export default GcodevsInvestment;
