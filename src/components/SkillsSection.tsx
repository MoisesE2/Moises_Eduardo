import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useThemeStyles } from "../hooks/useThemeStyles";
import {
  ReactIcon,
  NodeJS,
  Java,
  CSS3,
  Python,
  GitHubAlt,
  TypeScript,
  TailwindCSS,
  JavaScript,
  Figma,
  NextJS,
  Docker,
  Adjustments,
  SortAscending,
  ViewGrid,
  ViewList,
} from "./Icons";
import { useInView } from "react-intersection-observer";

interface Skill {
  icon: React.ReactElement;
  label: string;
  percent: number;
  category: string;
  descriptionKey: string;
  color: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

const skillsData: Skill[] = [
  { 
    icon: <ReactIcon />, 
    label: "React", 
    percent: 90,
    category: "frontend",
    descriptionKey: "react",
    color: "#61DAFB",
    level: "expert"
  },
  { 
    icon: <TypeScript />, 
    label: "TypeScript", 
    percent: 85,
    category: "frontend",
    descriptionKey: "typescript",
    color: "#3178C6",
    level: "expert"
  },
  { 
    icon: <JavaScript />, 
    label: "JavaScript", 
    percent: 88,
    category: "frontend",
    descriptionKey: "javascript",
    color: "#F7DF1E",
    level: "expert"
  },
  { 
    icon: <TailwindCSS />, 
    label: "Tailwind CSS", 
    percent: 92,
    category: "frontend",
    descriptionKey: "tailwind",
    color: "#06B6D4",
    level: "expert"
  },
  { 
    icon: <CSS3 />, 
    label: "CSS3", 
    percent: 95,
    category: "frontend",
    descriptionKey: "css",
    color: "#1572B6",
    level: "expert"
  },
  { 
    icon: <NextJS />,
    label: "Next.js",
    percent: 75,
    category: "framework",
    descriptionKey: "nextjs",
    color: "#000000",
    level: "advanced"
  },
  { 
    icon: <NodeJS />, 
    label: "Node.js", 
    percent: 70,
    category: "backend",
    descriptionKey: "nodejs",
    color: "#339933",
    level: "advanced"
  },
  { 
    icon: <Python />, 
    label: "Python", 
    percent: 65,
    category: "backend",
    descriptionKey: "python",
    color: "#3776AB",
    level: "advanced"
  },
  { 
    icon: <Java />, 
    label: "Java", 
    percent: 60,
    category: "backend",
    descriptionKey: "java",
    color: "#ED8B00",
    level: "intermediate"
  },
  { 
    icon: <Figma />, 
    label: "Figma", 
    percent: 80,
    category: "design",
    descriptionKey: "figma",
    color: "#F24E1E",
    level: "advanced"
  },
  { 
    icon: <GitHubAlt />, 
    label: "Git & GitHub", 
    percent: 95,
    category: "tools",
    descriptionKey: "git",
    color: "#181717",
    level: "expert"
  },
  {
    icon: <Docker />,
    label: "Docker",
    percent: 45,
    category: "tools",
    descriptionKey: "docker",
    color: "#2496ED",
    level: "intermediate"
  },
];

const SkillCard: React.FC<{ skill: Skill; index: number; viewMode: 'cards' | 'minimal' }> = React.memo(({ 
  skill, 
  index, 
  viewMode 
}) => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Simplificado: cálculos simples não precisam de useMemo
  const radius = 40;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (skill.percent / 100) * circumference;

  if (viewMode === 'minimal') {
    return (
      <div 
        ref={ref}
        className={`group relative backdrop-blur-sm 
                   border rounded-2xl p-6 transition-all duration-500 ease-out
                   hover:border-purple-500/40 hover:shadow-2xl
                   hover:-translate-y-2 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/30 hover:shadow-purple-500/10'
            : 'bg-gradient-to-br from-white/80 to-gray-50/50 border-gray-200/50 hover:shadow-purple-500/20'
        } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{
          transitionDelay: `${index * 50}ms`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-xl text-2xl transition-all duration-300 group-hover:scale-110"
              style={{ 
                background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}25)`,
                color: skill.color 
              }}
            >
              {skill.icon}
            </div>
            <div>
              <h3 className={`text-lg font-semibold group-hover:text-purple-300 transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {skill.label}
              </h3>
              <span className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>{t(`skills.levels.${skill.level}`)}</span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{skill.percent}%</div>
            <div className={`text-xs uppercase tracking-wider ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>{t(`skills.categories.${skill.category}`)}</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className={`w-full rounded-full h-2 overflow-hidden ${
            isDark ? 'bg-gray-700/50' : 'bg-gray-200/80'
          }`}>
            <div 
              className="h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: inView ? `${skill.percent}%` : '0%',
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                transitionDelay: `${index * 100 + 200}ms`
              }}
            />
          </div>
        </div>
        
        <p className={`text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {t(`skills.descriptions.${skill.descriptionKey}`)}
        </p>
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}40, transparent 70%)`
          }}
        />
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={`group relative backdrop-blur-md 
                 border rounded-3xl p-6 transition-all duration-700 ease-out
                 hover:border-purple-500/50 hover:shadow-2xl
                 hover:-translate-y-3 hover:scale-105 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700/50 hover:shadow-purple-500/20'
          : 'bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-200/60 hover:shadow-purple-500/30'
      } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{
        transitionDelay: `${index * 75}ms`,
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 rounded-3xl opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        {/* Circular Progress */}
        <div className="relative">
          <svg 
            width={radius * 2} 
            height={radius * 2} 
            className="transform -rotate-90 drop-shadow-lg"
          >
            {/* Background Circle */}
            <circle
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              stroke={isDark ? "rgba(55, 65, 81, 0.3)" : "rgba(209, 213, 219, 0.5)"}
              strokeWidth={stroke}
              fill="transparent"
            />
            {/* Progress Circle */}
            <circle
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              stroke={skill.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={inView ? strokeDashoffset : circumference}
              style={{ 
                transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDelay: `${index * 100 + 300}ms`,
                filter: `drop-shadow(0 0 8px ${skill.color}40)`
              }}
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div 
              className="text-3xl mb-1 transition-all duration-300 group-hover:scale-110"
              style={{ color: skill.color }}
            >
              {skill.icon}
            </div>
            <div className={`text-xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{skill.percent}%</div>
          </div>
        </div>
        
        {/* Skill Info */}
        <div className="space-y-2">
          <h3 className={`text-xl font-bold group-hover:text-purple-300 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {skill.label}
          </h3>
          <div className="flex items-center justify-center gap-3">
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
              style={{ 
                backgroundColor: `${skill.color}20`,
                color: skill.color,
                border: `1px solid ${skill.color}30`
              }}
            >
              {t(`skills.levels.${skill.level}`)}
            </span>
            <span className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>{t(`skills.categories.${skill.category}`)}</span>
          </div>
          <p className={`text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 max-w-xs ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t(`skills.descriptions.${skill.descriptionKey}`)}
          </p>
        </div>
      </div>
      
      {/* Hover Glow */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none blur-xl"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)`
        }}
      />
    </div>
  );
});

const SkillsSection: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<'percent' | 'alphabetical'>('percent');
  const [viewMode, setViewMode] = useState<'cards' | 'minimal'>('cards');
  const [isVisible, setIsVisible] = useState(false);

  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (sectionInView) {
      setIsVisible(true);
    }
  }, [sectionInView]);

  // Simplificado: skillsData é estático, então categories também é
  const categories = ['all', ...Array.from(new Set(skillsData.map(skill => skill.category)))];
  
  const filteredSkills = useMemo(() => 
    skillsData
      .filter(skill => filter === 'all' || skill.category === filter)
      .sort((a, b) => {
        if (sort === 'percent') {
          return b.percent - a.percent;
        } else {
          return a.label.localeCompare(b.label);
        }
      }),
    [filter, sort]
  );

  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  const handleSortChange = useCallback((newSort: 'percent' | 'alphabetical') => {
    setSort(newSort);
  }, []);

  const handleViewModeToggle = useCallback(() => {
    setViewMode(prev => prev === 'cards' ? 'minimal' : 'cards');
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="habilidades" 
      className={`relative py-16 px-4 sm:px-6 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-black to-gray-900' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            {t('skills.title')}
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t('skills.subtitle')}
          </p>
        </div>
        
        {/* Controls */}
        <div className={`flex flex-wrap justify-center gap-4 mb-10 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Filter */}
          <div className={`flex items-center backdrop-blur-sm border rounded-2xl p-2 ${
            isDark 
              ? 'bg-gray-900/80 border-gray-700/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <Adjustments className="text-purple-400 mr-3 text-lg" />
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                      : (isDark 
                          ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                          : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:text-gray-900')
                  }`}
                >
                  {t(`skills.categories.${category}`)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Sort */}
          <div className={`flex items-center backdrop-blur-sm border rounded-2xl p-2 ${
            isDark 
              ? 'bg-gray-900/80 border-gray-700/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <SortAscending className="text-purple-400 mr-3 text-lg" />
            <select 
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as 'percent' | 'alphabetical')}
              className={`bg-transparent px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              <option value="percent" className={isDark ? 'bg-gray-800' : 'bg-white'}>{t('skills.sortBy.proficiency')}</option>
              <option value="alphabetical" className={isDark ? 'bg-gray-800' : 'bg-white'}>{t('skills.sortBy.alphabetical')}</option>
            </select>
          </div>
          
          {/* View Mode */}
          <button
            onClick={handleViewModeToggle}
            className={`flex items-center backdrop-blur-sm border rounded-2xl p-3 text-purple-400 hover:text-purple-300 transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-900/80 border-gray-700/50' 
                : 'bg-white/80 border-gray-200/50'
            }`}
          >
            {viewMode === 'cards' ? <ViewList className="text-lg" /> : <ViewGrid className="text-lg" />}
            <span className={`ml-2 text-sm font-medium ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {viewMode === 'cards' ? t('skills.viewMode.list') : t('skills.viewMode.cards')}
            </span>
          </button>
        </div>

        {/* Skills Grid */}
        <div className={`grid gap-4 ${
          viewMode === 'cards' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {filteredSkills.map((skill, index) => (
            <SkillCard 
              key={skill.label} 
              skill={skill} 
              index={index} 
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-2xl font-semibold mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t('skills.noResults')}
            </h3>
            <p className={isDark ? 'text-gray-500' : 'text-gray-600'}>
              {t('skills.noResultsDescription')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

SkillCard.displayName = 'SkillCard';
SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;