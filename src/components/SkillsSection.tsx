import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useInView } from "react-intersection-observer";
import SiteAmbientDecor from "./SiteAmbientDecor";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGithub,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNextdotjs,
  SiShadcnui,
  SiFramer,
  SiZod,
  SiExpo,
  SiFlask,
  SiExpress,
  SiFastify,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiRedis,
  SiOpencv,
  SiOpenapiinitiative,
  SiGithubactions,
  SiDocker,
  SiTurborepo,
  SiVite,
  SiJest,
  SiEslint,
  SiPostman,
  SiFigma,
} from "react-icons/si";

interface Skill {
  label: string;
  icon?: React.ReactElement;
  color?: string;
}

interface SkillGroup {
  key: "frontend" | "backend" | "devops";
  skills: Skill[];
}

/**
 * Grupos e ordem espelham o currículo (seção "Habilidades Técnicas").
 * As primeiras COLLAPSED_COUNT skills de cada grupo aparecem na visão compacta.
 */
const SKILL_GROUPS: SkillGroup[] = [
  {
    key: "frontend",
    skills: [
      { label: "React 19", icon: <FaReact />, color: "#61DAFB" },
      { label: "Next.js 15/16", icon: <SiNextdotjs /> },
      { label: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { label: "Tailwind CSS 4", icon: <SiTailwindcss />, color: "#06B6D4" },
      { label: "React Native / Expo", icon: <SiExpo /> },
      { label: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
      { label: "ShadCN / Radix UI", icon: <SiShadcnui /> },
      { label: "Framer Motion", icon: <SiFramer />, color: "#E64CD9" },
      { label: "Zod", icon: <SiZod />, color: "#3B82F6" },
      { label: "Zustand" },
    ],
  },
  {
    key: "backend",
    skills: [
      { label: "Node.js", icon: <FaNodeJs />, color: "#339933" },
      { label: "Python", icon: <FaPython />, color: "#3776AB" },
      { label: "PostgreSQL", icon: <SiPostgresql />, color: "#2563EB" },
      { label: "Prisma", icon: <SiPrisma />, color: "#0EA5E9" },
      { label: "REST APIs", icon: <SiOpenapiinitiative />, color: "#4F46E5" },
      { label: "Express", icon: <SiExpress /> },
      { label: "Fastify", icon: <SiFastify /> },
      { label: "Flask", icon: <SiFlask /> },
      { label: "Redis", icon: <SiRedis />, color: "#DC2626" },
      { label: "MySQL", icon: <SiMysql />, color: "#00758F" },
      { label: "SQLite", icon: <SiSqlite />, color: "#003B57" },
      { label: "OpenCV", icon: <SiOpencv />, color: "#5C3EE8" },
    ],
  },
  {
    key: "devops",
    skills: [
      { label: "Git & GitHub", icon: <FaGithub /> },
      { label: "GitHub Actions", icon: <SiGithubactions />, color: "#2088FF" },
      { label: "Docker", icon: <SiDocker />, color: "#2496ED" },
      { label: "Playwright" },
      { label: "Vite", icon: <SiVite />, color: "#646CFF" },
      { label: "Turborepo", icon: <SiTurborepo />, color: "#EF4444" },
      { label: "Jest", icon: <SiJest />, color: "#C21325" },
      { label: "ESLint", icon: <SiEslint />, color: "#4B32C3" },
      { label: "Postman", icon: <SiPostman />, color: "#FF6C37" },
      { label: "Figma", icon: <SiFigma />, color: "#F24E1E" },
      { label: "Dokploy" },
    ],
  },
];

/** Quantas skills por grupo na visão compacta */
const COLLAPSED_COUNT = 5;

const SkillChip: React.FC<{ skill: Skill; isDark: boolean }> = ({ skill, isDark }) => (
  <span
    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-0.5 ${
      isDark
        ? "bg-gray-800/60 border-gray-700/50 text-gray-200"
        : "bg-white/80 border-gray-200 text-gray-700 shadow-sm"
    }`}
  >
    {skill.icon && (
      <span
        className="text-base"
        style={{ color: skill.color ?? (isDark ? "#e5e7eb" : "#374151") }}
        aria-hidden="true"
      >
        {skill.icon}
      </span>
    )}
    {skill.label}
  </span>
);

const SkillsSection: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();
  const [expanded, setExpanded] = useState(false);
  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="habilidades"
      className={`relative py-16 px-4 sm:px-6 overflow-hidden ${
        isDark ? "bg-gradient-to-b from-black to-gray-900" : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SiteAmbientDecor isDark={isDark} pattern={1} density="section" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            {t("skills.title")}
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Grupos compactos */}
        <div className="space-y-6">
          {SKILL_GROUPS.map((group, index) => {
            const visible = expanded ? group.skills : group.skills.slice(0, COLLAPSED_COUNT);
            const hiddenCount = group.skills.length - visible.length;

            return (
              <div
                key={group.key}
                className={`backdrop-blur-md border rounded-3xl p-6 transition-all duration-700 ${
                  isDark
                    ? "bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700/50"
                    : "bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-200/60"
                } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${150 + index * 150}ms` }}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {t(`skills.groups.${group.key}`)}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {visible.map((skill) => (
                    <SkillChip key={skill.label} skill={skill} isDark={isDark} />
                  ))}
                  {hiddenCount > 0 && (
                    <button
                      onClick={() => setExpanded(true)}
                      className={`inline-flex items-center px-3.5 py-2 rounded-full text-sm font-medium border border-dashed transition-colors ${
                        isDark
                          ? "border-purple-500/40 text-purple-300 hover:bg-purple-600/10"
                          : "border-purple-400/50 text-purple-600 hover:bg-purple-50"
                      }`}
                      aria-label={t("skills.showAll")}
                    >
                      {t("skills.moreCount", { count: hiddenCount })}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expansão opcional */}
        <div className="text-center mt-8">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            {expanded ? (
              <>
                <ChevronUpIcon className="w-5 h-5" />
                {t("skills.showLess")}
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-5 h-5" />
                {t("skills.showAll")}
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
