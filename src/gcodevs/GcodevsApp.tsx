import React, { useState } from "react";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useTheme } from "../contexts/ThemeContext";
import { useInView } from "react-intersection-observer";
import ProjectsTypesSection from "../components/ProjectsTypesSection";
import SiteAmbientDecor from "../components/SiteAmbientDecor";
import ErrorBoundary from "../components/ErrorBoundary";
import { FaWhatsapp } from "react-icons/fa";
import {
  SunIcon,
  MoonIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

const WHATSAPP = "5585998444203";

const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

/* --- Header --- */
const GcodevsHeader: React.FC = () => {
  const { isDark } = useThemeStyles();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "#servicos", label: "Serviços" },
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#clientes", label: "Clientes" },
    { href: "#faq", label: "FAQ" },
    { href: "#orcamento", label: "Orçamento" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b ${
        isDark ? "bg-black/85 border-purple-500/20" : "bg-white/85 border-blue-500/20"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a
          href="#topo"
          className={`flex items-center gap-2 text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          <CodeBracketIcon className="w-6 h-6 text-purple-400" />
          <span>
            Gco{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Devs
            </span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isDark ? "text-gray-300 hover:text-white hover:bg-purple-600/20" : "text-gray-600 hover:text-gray-900 hover:bg-purple-600/10"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-colors ${
              isDark ? "text-gray-300 hover:bg-purple-600/20" : "text-gray-600 hover:bg-purple-600/10"
            }`}
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          <a
            href={whatsappUrl("Olá! Quero fazer um orçamento de site com a Gco Devs.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:shadow-green-500/40 transition-all"
          >
            <FaWhatsapp className="w-4 h-4" />
            Orçamento grátis
          </a>
        </div>
      </nav>
    </header>
  );
};

/* --- Hero --- */
const GcodevsHero: React.FC = () => {
  const { isDark } = useThemeStyles();

  const badges = ["Responsivo", "SEO incluso", "Prazo definido", "Suporte pós-entrega"];

  return (
    <section
      id="topo"
      className={`relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 ${
        isDark ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-blue-50 to-white"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SiteAmbientDecor isDark={isDark} pattern={0} density="hero" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm uppercase tracking-[0.3em] text-purple-300 font-light">
            Vagas abertas para novos projetos
          </span>
        </div>

        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] animate-gradient-x ${
            isDark
              ? "bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent"
          }`}
        >
          Seu site profissional,
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            do briefing ao ar
          </span>
        </h1>

        <p className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          A Gco Devs cria sites, landing pages e lojas virtuais sob medida para o seu negócio.
          Você conta a ideia, eu cuido de todo o resto — design, código, publicação e suporte.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl("Olá! Quero fazer um orçamento de site com a Gco Devs.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:shadow-xl hover:shadow-green-500/40 transition-all active:scale-95"
          >
            <FaWhatsapp className="w-6 h-6" />
            Pedir orçamento grátis
          </a>
          <a
            href="#servicos"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold border transition-all ${
              isDark
                ? "border-purple-500/40 text-purple-300 hover:bg-purple-600/10"
                : "border-purple-400/50 text-purple-600 hover:bg-purple-50"
            }`}
          >
            Ver o que eu faço
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {badges.map((badge) => (
            <span
              key={badge}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm border ${
                isDark ? "bg-gray-800/60 border-gray-700/50 text-gray-300" : "bg-white/80 border-gray-200 text-gray-700"
              }`}
            >
              <span className="text-purple-400">✓</span>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- Como funciona --- */
const STEPS = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: "1. Briefing",
    description: "Você me conta a ideia pelo WhatsApp. Entendo o objetivo, o público e o que o site precisa ter.",
  },
  {
    icon: ClipboardDocumentListIcon,
    title: "2. Proposta",
    description: "Envio orçamento e prazo fechados, sem surpresa. Aprovado, começamos.",
  },
  {
    icon: PaintBrushIcon,
    title: "3. Desenvolvimento",
    description: "Crio o design e o código, e você acompanha o progresso com prévias reais do site.",
  },
  {
    icon: RocketLaunchIcon,
    title: "4. Entrega + suporte",
    description: "Publico o site no seu domínio e sigo por perto para ajustes e melhorias pós-entrega.",
  },
];

const HowItWorks: React.FC = () => {
  const { isDark } = useThemeStyles();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="como-funciona"
      className={`relative py-16 px-4 sm:px-6 overflow-hidden ${
        isDark ? "bg-gradient-to-b from-black to-gray-900" : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SiteAmbientDecor isDark={isDark} pattern={1} density="section" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            Como funciona
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Processo simples e transparente, em 4 passos
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className={`backdrop-blur-md border rounded-3xl p-6 transition-all duration-700 hover:border-purple-500/50 hover:shadow-xl hover:-translate-y-1 ${
                isDark
                  ? "bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700/50 hover:shadow-purple-500/20"
                  : "bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-200/60 hover:shadow-purple-500/30"
              } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${150 + index * 150}ms` }}
            >
              <div className="p-3 rounded-xl inline-flex mb-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
                <step.icon className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{step.title}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- Diferenciais --- */
const DIFFERENTIALS = [
  {
    icon: DevicePhoneMobileIcon,
    title: "Perfeito no celular",
    description: "Todo projeto nasce mobile-first e funciona em qualquer tamanho de tela.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "SEO incluso",
    description: "Seu site sai pronto para ser encontrado no Google, sem custo extra.",
  },
  {
    icon: ClockIcon,
    title: "Prazo definido",
    description: "Data de entrega combinada na proposta — e cumprida.",
  },
  {
    icon: GlobeAltIcon,
    title: "Domínio e hospedagem",
    description: "Oriento toda a contratação e deixo o site publicado no seu endereço.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Suporte pós-entrega",
    description: "Ajustes e correções inclusos após a entrega, com planos de manutenção opcionais.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Código profissional",
    description: "Tecnologias modernas (React, Next.js), site rápido e seguro.",
  },
];

const Differentials: React.FC = () => {
  const { isDark } = useThemeStyles();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={`relative py-16 px-4 sm:px-6 overflow-hidden ${
        isDark ? "bg-gradient-to-b from-gray-900 via-gray-950 to-black" : "bg-gradient-to-b from-white to-gray-50"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SiteAmbientDecor isDark={isDark} pattern={3} density="section" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            Por que a Gco Devs?
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            O que está incluso em todo projeto
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((item, index) => (
            <div
              key={item.title}
              className={`backdrop-blur-md border rounded-3xl p-6 transition-all duration-700 hover:border-purple-500/50 hover:shadow-xl ${
                isDark
                  ? "bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700/50 hover:shadow-purple-500/20"
                  : "bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-200/60 hover:shadow-purple-500/30"
              } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <item.icon className="w-6 h-6 text-purple-400 shrink-0" />
                <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- Prova social / clientes --- */
const CASES = [
  {
    title: "Ana Paula Psicóloga",
    description: "Landing page profissional com agendamento via WhatsApp, depoimentos e tema claro/escuro.",
    image: "/assets/projects/anapaula/anapaula.png",
    url: "https://anapaulapsi.com.br/",
    tag: "Landing Page",
  },
  {
    title: "IPF Farol — Termômetro",
    description: "Painel administrativo com dashboard, gráficos por período e relatórios para impressão.",
    image: "/assets/projects/termometro/termometro.png",
    url: "https://ipbfarol.org/",
    tag: "Sistema Web",
  },
  {
    title: "Rotom Nav-Dex",
    description: "Aplicação completa com banco de dados, cache e painel do usuário — mostra do que dou conta.",
    image: "/assets/projects/rotomnavdex/rotomnavdex.png",
    url: "https://rotomnavdex.gcodevs.com/",
    tag: "Aplicação Web",
  },
];

const ClientCases: React.FC = () => {
  const { isDark } = useThemeStyles();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="clientes"
      className={`relative py-16 px-4 sm:px-6 overflow-hidden ${
        isDark ? "bg-gradient-to-b from-black to-gray-900" : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SiteAmbientDecor isDark={isDark} pattern={4} density="section" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            Sites no ar
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Projetos reais, publicados e em uso — clique e visite
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((item, index) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group backdrop-blur-md border rounded-3xl overflow-hidden transition-all duration-700 hover:border-purple-500/50 hover:shadow-xl hover:-translate-y-1 ${
                isDark
                  ? "bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700/50 hover:shadow-purple-500/20"
                  : "bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-200/60 hover:shadow-purple-500/30"
              } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${150 + index * 150}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    {item.tag}
                  </span>
                  <ArrowTopRightOnSquareIcon className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- FAQ (manter em sincronia com o JSON-LD FAQPage em gcodevs.html) --- */
const FAQ_ITEMS = [
  {
    question: "Quanto custa um site?",
    answer:
      "O valor depende do tipo de projeto: um link-in-bio é mais simples que uma loja virtual completa. O orçamento é gratuito e sem compromisso — basta chamar no WhatsApp descrevendo o que você precisa.",
  },
  {
    question: "Quanto tempo leva para o site ficar pronto?",
    answer:
      "Link-in-bio e landing pages costumam ficar prontos em 1 a 2 semanas. Projetos maiores, como lojas virtuais, têm prazo definido junto com o orçamento — e o prazo combinado é cumprido.",
  },
  {
    question: "O site funciona bem no celular?",
    answer:
      "Sim. Todos os projetos são desenvolvidos com abordagem mobile-first: o site é pensado primeiro para o celular e se adapta a qualquer tamanho de tela.",
  },
  {
    question: "Preciso pagar hospedagem e domínio?",
    answer:
      "Sim, hospedagem e domínio são custos à parte, mas são baixos. Eu oriento você em toda a contratação e deixo o site publicado e funcionando no seu domínio.",
  },
  {
    question: "E depois de entregue, tem suporte?",
    answer:
      "Sim. Todo projeto inclui suporte pós-entrega para ajustes e correções. Também ofereço planos de manutenção para quem precisa de atualizações frequentes.",
  },
  {
    question: "O que eu preciso enviar para começar?",
    answer:
      "Textos, imagens e referências de sites que você gosta. Se você não tiver tudo pronto, sem problema: o briefing inicial serve exatamente para organizar isso junto com você.",
  },
];

const Faq: React.FC = () => {
  const { isDark } = useThemeStyles();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="faq"
      className={`relative py-16 px-4 sm:px-6 overflow-hidden ${
        isDark ? "bg-gradient-to-b from-gray-900 via-gray-950 to-black" : "bg-gradient-to-b from-white to-gray-50"
      }`}
    >
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            Perguntas frequentes
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={item.question}
              className={`group backdrop-blur-md border rounded-2xl transition-all duration-700 open:border-purple-500/50 ${
                isDark
                  ? "bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700/50"
                  : "bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-200/60"
              } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${100 + index * 80}ms` }}
            >
              <summary
                className={`flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {item.question}
                <span className="text-purple-400 transition-transform duration-300 group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <p className={`px-5 pb-5 text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- Orçamento --- */
const PROJECT_TYPES = ["Link-in-Bio", "Landing Page", "E-commerce", "Outro tipo de projeto"];

const QuoteSection: React.FC = () => {
  const { isDark } = useThemeStyles();
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState("");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Olá! Meu nome é ${name.trim() || "(não informado)"} e quero um orçamento.\n\n` +
      `Tipo de projeto: ${projectType}` +
      (message.trim() ? `\n\nSobre o projeto: ${message.trim()}` : "");
    window.open(whatsappUrl(text), "_blank");
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-purple-500 transition-colors ${
    isDark
      ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
  }`;

  return (
    <section
      ref={ref}
      id="orcamento"
      className={`relative py-24 px-4 sm:px-6 overflow-hidden ${
        isDark ? "bg-gradient-to-b from-black to-gray-900" : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SiteAmbientDecor isDark={isDark} pattern={2} density="section" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className={`text-center mb-10 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Peça seu orçamento
          </h2>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Grátis e sem compromisso. Respondo em horário comercial (Seg-Sáb, 9h às 19h).
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`rounded-3xl p-8 space-y-5 transition-all duration-1000 delay-200 ${
            isDark ? "bg-gray-900/50 border border-gray-700/50" : "bg-white/80 border border-gray-200 shadow-lg"
          } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all"
          >
            <FaWhatsapp className="w-5 h-5" />
            Enviar via WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};

/* --- Footer --- */
const GcodevsFooter: React.FC = () => {
  const { isDark } = useThemeStyles();

  return (
    <footer
      className={`py-10 px-4 sm:px-6 border-t ${
        isDark ? "bg-black border-gray-800 text-gray-400" : "bg-white border-gray-200 text-gray-500"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <CodeBracketIcon className="w-5 h-5 text-purple-400" />
          <span>© {new Date().getFullYear()} Gco Devs. Todos os direitos reservados.</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://moises.gcodevs.com"
            className="font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300"
          >
            Conheça o desenvolvedor
          </a>
          <a href="mailto:moises.eduardogc@gmail.com" className="hover:text-purple-400 transition-colors">
            moises.eduardogc@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

/* --- Botão flutuante de WhatsApp --- */
const FloatingWhatsApp: React.FC = () => (
  <a
    href={whatsappUrl("Olá! Quero fazer um orçamento de site com a Gco Devs.")}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/40 hover:scale-110 transition-transform"
  >
    <FaWhatsapp className="w-7 h-7" />
  </a>
);

const GcodevsApp: React.FC = () => (
  <div className="App">
    <ErrorBoundary>
      <GcodevsHeader />
      <main id="main-content" role="main">
        <GcodevsHero />
        {/* Seção "Serviços" reaproveita os previews interativos do projeto */}
        <div id="servicos">
          <ProjectsTypesSection />
        </div>
        <HowItWorks />
        <Differentials />
        <ClientCases />
        <Faq />
        <QuoteSection />
      </main>
      <GcodevsFooter />
      <FloatingWhatsApp />
    </ErrorBoundary>
  </div>
);

export default GcodevsApp;
