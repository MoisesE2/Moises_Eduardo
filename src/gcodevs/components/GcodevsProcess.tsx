import React from "react";
import { ShieldCheckIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { STEPS, GUARANTEE } from "../copy";

const GcodevsProcess: React.FC = () => (
  <section id="processo" className="bg-white py-20 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Como funciona
        </h2>
        <p className="text-lg text-slate-600">Processo simples e transparente, do primeiro contato ao site no ar.</p>
      </div>

      {/* Timeline horizontal */}
      <ol className="grid gap-8 md:grid-cols-4 relative mb-20">
        <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300" aria-hidden="true" />
        {STEPS.map((step, index) => (
          <li key={step.title} className="relative text-center md:text-left">
            <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full font-extrabold text-white bg-gradient-to-br from-violet-600 to-blue-600 shadow-md mb-4">
              {index + 1}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-1.5">{step.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
          </li>
        ))}
      </ol>

      {/* Garantia */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheckIcon className="w-8 h-8 text-violet-600" />
          <h3 className="text-2xl font-extrabold text-slate-900">{GUARANTEE.title}</h3>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-green-700 mb-3">Está incluso</p>
            <ul className="space-y-2.5">
              {GUARANTEE.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckIcon className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3">Fica por sua conta</p>
            <ul className="space-y-2.5">
              {GUARANTEE.notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <XMarkIcon className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GcodevsProcess;
