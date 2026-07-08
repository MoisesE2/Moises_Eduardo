import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  DevicePhoneMobileIcon,
  RectangleGroupIcon,
  ShoppingCartIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { SERVICES, whatsappUrl } from "../copy";

const ICONS = [DevicePhoneMobileIcon, RectangleGroupIcon, ShoppingCartIcon];

const GcodevsServices: React.FC = () => (
  <section id="servicos" className="bg-white dark:bg-slate-950 py-20 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          O que fazemos
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Três formatos de projeto, todos sob medida. Escolha o que combina com o momento do seu negócio.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-stretch">
        {SERVICES.map((service, index) => {
          const Icon = ICONS[index];
          return (
            <div
              key={service.id}
              className={`relative flex flex-col rounded-2xl p-7 border transition-shadow hover:shadow-lg ${
                service.highlighted
                  ? "border-violet-400 dark:border-violet-600 bg-gradient-to-b from-violet-50/70 to-white dark:from-violet-950/40 dark:to-slate-900 shadow-md"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
              }`}
            >
              {service.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600">
                  Mais pedido
                </span>
              )}

              <span
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${
                  service.highlighted
                    ? "bg-violet-600 text-white"
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                }`}
              >
                <Icon className="w-6 h-6" />
              </span>

              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">{service.name}</h3>
              <p className="text-sm font-medium text-violet-700 dark:text-violet-400 mb-3">{service.idealFor}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">{service.description}</p>

              <ul className="space-y-2.5 mb-7 flex-1">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                    <CheckIcon className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={whatsappUrl(`Olá! Quero um orçamento para um projeto de ${service.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-colors ${
                  service.highlighted
                    ? "text-white bg-green-600 hover:bg-green-700"
                    : "text-slate-800 border border-slate-300 hover:border-green-500 hover:text-green-700 dark:text-slate-100 dark:border-slate-700 dark:hover:border-green-500 dark:hover:text-green-400"
                }`}
              >
                <FaWhatsapp className="w-4 h-4" />
                Quero orçamento deste tipo
              </a>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default GcodevsServices;
