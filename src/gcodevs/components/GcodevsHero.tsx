import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HERO, whatsappUrl, QUOTE_MESSAGE } from "../copy";

const GcodevsHero: React.FC = () => (
  <section id="topo" className="relative overflow-hidden bg-white pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6">
    <div className="absolute inset-0 gcodevs-grid-bg pointer-events-none" aria-hidden="true" />

    <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Copy */}
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium bg-violet-50 text-violet-700 border border-violet-200">
          <span className="w-2 h-2 rounded-full bg-violet-500" />
          {HERO.badge}
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight text-slate-900">
          {HERO.titleStart}{" "}
          <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            {HERO.titleHighlight}
          </span>
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed max-w-xl">{HERO.subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={whatsappUrl(QUOTE_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25 transition-all active:scale-[0.98]"
          >
            <FaWhatsapp className="w-5 h-5" />
            {HERO.ctaPrimary}
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center justify-center px-7 py-4 rounded-xl text-base font-semibold text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors"
          >
            {HERO.ctaSecondary}
          </a>
        </div>

        <dl className="flex gap-8 pt-4">
          {HERO.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-2xl font-extrabold text-slate-900">{stat.value}</dd>
              <dd className="text-sm text-slate-500">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Mockup */}
      <div className="relative hidden lg:block">
        <div className="absolute -inset-6 bg-gradient-to-br from-violet-100 via-blue-50 to-transparent rounded-3xl -z-10" />
        <div className="rounded-xl overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-200 bg-white">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="flex-1 mx-3 px-3 py-1 rounded-md bg-white text-xs text-slate-500 truncate">
              anapaulapsi.com.br
            </span>
          </div>
          <img
            src="/assets/projects/anapaula/anapaula.png"
            alt="Site desenvolvido pela Gco Devs para Ana Paula Psicóloga"
            className="w-full object-cover object-top aspect-[4/3]"
          />
        </div>
        <span className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-white shadow-lg border border-slate-200 text-sm font-semibold text-slate-700">
          Projeto real, no ar
        </span>
      </div>
    </div>
  </section>
);

export default GcodevsHero;
