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
  <section id="servicos" className="bg-white py-20 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          O que fazemos
        </h2>
        <p className="text-lg text-slate-600">
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
                  ? "border-violet-400 bg-gradient-to-b from-violet-50/70 to-white shadow-md"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              {service.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600">
                  Mais pedido
                </span>
              )}

              <span
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${
                  service.highlighted ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                <Icon className="w-6 h-6" />
              </span>

              <h3 className="text-xl font-extrabold text-slate-900 mb-1">{service.name}</h3>
              <p className="text-sm font-medium text-violet-700 mb-3">{service.idealFor}</p>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{service.description}</p>

              <ul className="space-y-2.5 mb-7 flex-1">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckIcon className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
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
                    : "text-slate-800 border border-slate-300 hover:border-green-500 hover:text-green-700"
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
