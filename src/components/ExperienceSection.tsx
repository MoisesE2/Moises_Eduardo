import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/outline";
import SiteAmbientDecor from "./SiteAmbientDecor";

const JOB_KEYS = ["afirmeplay", "innovplay", "gcodevs"] as const;

/** Contador animado 0 → target quando entra na viewport */
const AnimatedCounter: React.FC<{ target: number; suffix?: string; label: string }> = ({
  target,
  suffix = "+",
  label,
}) => {
  const { isDark } = useThemeStyles();
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // ease-out cúbico
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        {value}
        {suffix}
      </div>
      <div className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{label}</div>
    </div>
  );
};

const ExperienceSection: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();
  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className={`relative py-16 px-4 sm:px-6 overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-gray-900 via-gray-950 to-black"
          : "bg-gradient-to-b from-white to-gray-50"
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SiteAmbientDecor isDark={isDark} pattern={2} density="section" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            {t("experience.title")}
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {t("experience.subtitle")}
          </p>
        </div>

        {/* Contadores (anos desde o início da graduação em 2023) */}
        <div
          className={`grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-14 transition-all duration-1000 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <AnimatedCounter target={3} label={t("experience.stats.years")} />
          <AnimatedCounter target={5} label={t("experience.stats.projects")} />
          <AnimatedCounter target={3} suffix="" label={t("experience.stats.companies")} />
        </div>

        {/* Timeline */}
        <ol className="relative border-s-2 border-purple-500/30 ml-3 sm:ml-6 space-y-10">
          {JOB_KEYS.map((key, index) => {
            const isCurrent = key === "gcodevs";
            const highlights = t(`experience.jobs.${key}.highlights`, {
              returnObjects: true,
            }) as string[];

            return (
              <li
                key={key}
                className={`relative ps-8 sm:ps-10 transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                {/* Marcador da timeline */}
                <span
                  className={`absolute -start-[13px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    isCurrent
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-400"
                      : isDark
                        ? "bg-gray-900 border-purple-500/50"
                        : "bg-white border-purple-400/60"
                  }`}
                >
                  <BriefcaseIcon className={`w-3.5 h-3.5 ${isCurrent ? "text-white" : "text-purple-400"}`} />
                </span>

                <div
                  className={`backdrop-blur-md border rounded-3xl p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl ${
                    isDark
                      ? "bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700/50 hover:shadow-purple-500/20"
                      : "bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-200/60 hover:shadow-purple-500/30"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {t(`experience.jobs.${key}.company`)}
                    </h3>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        {t("experience.current")}
                      </span>
                    )}
                  </div>

                  <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-4 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <span className="font-semibold text-purple-400">{t(`experience.jobs.${key}.role`)}</span>
                    <span>{t(`experience.jobs.${key}.period`)}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {t(`experience.jobs.${key}.location`)}
                    </span>
                  </div>

                  <ul className={`space-y-2 text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    {highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-purple-400 mt-0.5">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
});

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
