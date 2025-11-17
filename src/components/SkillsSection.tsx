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

// Helper function to check if a color is dark
const isDarkColor = (color: string): boolean => {
  const darkColors = ['#181717', '#000000'];
  return darkColors.includes(color.toUpperCase());
};

// Helper function to get contrast color for dark colors in dark mode
const getContrastColor = (color: string, isDark: boolean): string => {
  if (isDark && isDarkColor(color)) {
    return '#ffffff';
  }
  return color;
};

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

  // Check if this skill needs special dark mode treatment
  const needsDarkModeContrast = isDark && isDarkColor(skill.color);
  const iconColor = getContrastColor(skill.color, isDark);

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
        <div className="flex items-center gap-3 mb-4">
          <div 
            className={`p-3 rounded-xl text-2xl transition-all duration-300 group-hover:scale-110 ${
              needsDarkModeContrast ? 'ring-2 ring-white/30 ring-offset-2 ring-offset-gray-800' : ''
            }`}
            style={{ 
              background: needsDarkModeContrast 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.25))'
                : `linear-gradient(135deg, ${skill.color}15, ${skill.color}25)`,
              color: iconColor,
              boxShadow: needsDarkModeContrast ? '0 0 20px rgba(255,255,255,0.2)' : 'none'
            }}
          >
            {skill.icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold group-hover:text-purple-300 transition-colors ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {skill.label}
            </h3>
            <div className={`text-xs uppercase tracking-wider mt-1 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>{t(`skills.categories.${skill.category}`)}</div>
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
            background: needsDarkModeContrast && isDark
              ? 'radial-gradient(circle at center, rgba(255,255,255,0.3), transparent 70%)'
              : `radial-gradient(circle at center, ${skill.color}40, transparent 70%)`
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
          ? `bg-gradient-to-br from-gray-900/60 to-gray-800/40 ${
              needsDarkModeContrast 
                ? 'border-white/30 ring-2 ring-white/20 ring-offset-2 ring-offset-gray-900' 
                : 'border-gray-700/50'
            } hover:shadow-purple-500/20`
          : 'bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-200/60 hover:shadow-purple-500/30'
      } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{
        transitionDelay: `${index * 75}ms`,
        boxShadow: needsDarkModeContrast && isDark 
          ? '0 0 30px rgba(255,255,255,0.15), inset 0 0 20px rgba(255,255,255,0.05)' 
          : undefined
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 rounded-3xl opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div 
          className={`text-5xl transition-all duration-300 group-hover:scale-110 ${
            needsDarkModeContrast ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : ''
          }`}
          style={{ 
            color: iconColor,
            filter: needsDarkModeContrast ? 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' : 'none'
          }}
        >
          {skill.icon}
        </div>
        
        {/* Skill Info */}
        <div className="space-y-2">
          <h3 className={`text-xl font-bold group-hover:text-purple-300 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {skill.label}
          </h3>
          <div className="flex items-center justify-center">
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
          background: needsDarkModeContrast && isDark
            ? 'radial-gradient(circle at center, rgba(255,255,255,0.4), transparent 70%)'
            : `radial-gradient(circle at center, ${skill.color}, transparent 70%)`
        }}
      />
    </div>
  );
});

const SkillsSection: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();
  const [filter, setFilter] = useState<string>('all');
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
    skillsData.filter(skill => filter === 'all' || skill.category === filter),
    [filter]
  );

  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
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