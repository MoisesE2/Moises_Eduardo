import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { CASES, TESTIMONIALS } from "../copy";

const GcodevsCases: React.FC = () => (
  <section id="clientes" className="bg-white py-20 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Clientes atendidos
        </h2>
        <p className="text-lg text-slate-600">Projetos reais, publicados e em uso — clique e visite.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-16">
        {CASES.map((item) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="aspect-video overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={`Site ${item.title}`}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200">
                  {item.tag}
                </span>
                <ArrowTopRightOnSquareIcon className="w-5 h-5 text-slate-400 group-hover:text-violet-600 transition-colors" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Depoimentos */}
      <div id="depoimentos" className="grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-7"
          >
            <div className="text-violet-500 text-4xl font-serif leading-none mb-3" aria-hidden="true">
              &ldquo;
            </div>
            <blockquote className="text-slate-700 leading-relaxed mb-5">{testimonial.quote}</blockquote>
            <figcaption>
              <p className="font-bold text-slate-900">{testimonial.name}</p>
              <p className="text-sm text-slate-500">{testimonial.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default GcodevsCases;
