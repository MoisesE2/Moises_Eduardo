import React from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { AcademicCapIcon, LanguageIcon, SparklesIcon } from "@heroicons/react/24/outline";
import SiteAmbientDecor from "./SiteAmbientDecor";

const EDUCATION_KEYS = ["estacio", "iyf", "eeep"] as const;

const EducationSection: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();
  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const softSkills = t("education.softSkills.items", { returnObjects: true }) as string[];

  const cardClasses = `backdrop-blur-md border rounded-3xl p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl ${
    isDark
      ? "bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700/50 hover:shadow-purple-500/20"
      : "bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-200/60 hover:shadow-purple-500/30"
  }`;

  return (
    <section
      ref={sectionRef}
      id="formacao"
      className={`relative py-16 px-4 sm:px-6 overflow-hidden ${
        isDark ? "bg-gradient-to-b from-black to-gray-900" : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SiteAmbientDecor isDark={isDark} pattern={3} density="section" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            {t("education.title")}
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {t("education.subtitle")}
          </p>
        </div>

        {/* Formação acadêmica */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {EDUCATION_KEYS.map((key, index) => {
            const period = t(`education.items.${key}.period`);
            return (
              <div
                key={key}
                className={`${cardClasses} transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="p-3 rounded-xl inline-flex mb-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
                  <AcademicCapIcon className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t(`education.items.${key}.degree`)}
                </h3>
                <p className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {t(`education.items.${key}.school`)}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    {t("education.completed")}
                  </span>
                  {period && (
                    <span className={isDark ? "text-gray-400" : "text-gray-600"}>{period}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Idiomas e competências */}
        <div
          className={`grid gap-4 sm:grid-cols-2 transition-all duration-1000 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className={cardClasses}>
            <div className="flex items-center gap-3 mb-4">
              <LanguageIcon className="w-6 h-6 text-purple-400" />
              <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {t("education.languages.title")}
              </h3>
            </div>
            <ul className={`space-y-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-0.5">▹</span>
                {t("education.languages.portuguese")}
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-0.5">▹</span>
                {t("education.languages.english")}
              </li>
            </ul>
          </div>

          <div className={cardClasses}>
            <div className="flex items-center gap-3 mb-4">
              <SparklesIcon className="w-6 h-6 text-purple-400" />
              <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {t("education.softSkills.title")}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1.5 rounded-full text-sm border ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700/50 text-gray-300"
                      : "bg-gray-100/80 border-gray-200 text-gray-700"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

EducationSection.displayName = "EducationSection";

export default EducationSection;
