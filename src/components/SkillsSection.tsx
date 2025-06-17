import React, { useState, useEffect } from "react";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaCss3Alt,
  FaPython,
  FaGithub,
  FaFilter,
  FaSortAmountDown,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiFigma,
} from "react-icons/si";
import { JSX } from "react/jsx-runtime";
import { useInView } from "react-intersection-observer";

interface Skill {
  icon: JSX.Element;
  label: string;
  percent: number;
  colorGradient?: [string, string];
  category: string;
  description?: string;
}

const skills: Skill[] = [
  { 
    icon: <FaReact />, 
    label: "React Js", 
    percent: 90,
    category: "frontend",
    description: "Desenvolvimento de aplicações web e mobile com React" 
  },
  { 
    icon: <SiTypescript />, 
    label: "TypeScript", 
    percent: 80,
    category: "frontend",
    description: "Tipagem estática para JavaScript" 
  },
  { 
    icon: <FaPython />, 
    label: "Python", 
    percent: 60,
    category: "backend",
    description: "Scripting, automação e desenvolvimento web" 
  },
  { 
    icon: <SiFigma />, 
    label: "Figma", 
    percent: 70,
    category: "design",
    description: "Design de interfaces e prototipagem" 
  },
  { 
    icon: <SiTailwindcss />, 
    label: "Tailwind", 
    percent: 95,
    category: "frontend",
    description: "Framework CSS utilitário" 
  },
  { 
    icon: <FaCss3Alt />, 
    label: "CSS3", 
    percent: 95,
    category: "frontend",
    description: "Estilização de páginas web" 
  },
  { 
    icon: <SiJavascript />, 
    label: "JavaScript", 
    percent: 85,
    category: "frontend",
    description: "Linguagem de programação para web" 
  },
  { 
    icon: <FaNodeJs />, 
    label: "Node.js", 
    percent: 50,
    category: "backend",
    description: "JavaScript no lado do servidor" 
  },
  { 
    icon: <FaJava />, 
    label: "Java", 
    percent: 60,
    category: "backend",
    description: "Desenvolvimento de aplicações empresariais" 
  },
  { 
    icon: <FaNodeJs />, 
    label: "API", 
    percent: 60,
    category: "backend",
    description: "Desenvolvimento e consumo de APIs REST" 
  },
  { 
    icon: <SiJavascript />, 
    label: "JSON", 
    percent: 50,
    category: "backend",
    description: "Formato de intercâmbio de dados" 
  },
  { 
    icon: <FaGithub />, 
    label: "Git", 
    percent: 100,
    category: "tools",
    description: "Controle de versão" 
  },
];

const SkillCircle: React.FC<Skill> = ({
  percent,
  label,
  icon,
  description,
  colorGradient = ["#8B5CF6", "#3B82F6"],
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const radius = 48;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const gradientId = `gradient-${label.replace(/\s/g, "")}`;
  
  // Texto do nível de proficiência
  const proficiencyText = percent > 80 ? 'Expert' : percent > 60 ? 'Avançado' : 'Intermediário';

  return (
    <div className="flex flex-col items-center space-y-3 w-[130px] sm:w-[150px] group relative">
      <div className="relative" ref={ref}>
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="#1f1f1f"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={`url(#${gradientId})`}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={inView ? strokeDashoffset : circumference}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={colorGradient[0]} />
              <stop offset="100%" stopColor={colorGradient[1]} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-300 font-bold text-lg">
          {percent}%
          <span className="text-xs font-normal block mt-1">{proficiencyText}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-white text-base sm:text-lg">
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </div>
      
      {/* Tooltip */}
      {description && (
        <div className="absolute bottom-full mb-3 hidden group-hover:flex flex-col items-center w-48 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg z-10">
          <div className="text-center">{description}</div>
        </div>
      )}
    </div>
  );
};

const SkillsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<'percent' | 'alphabetical'>('percent');
  const [viewMode, setViewMode] = useState<'circles' | 'bars'>('circles');
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);

  // Extrai categorias únicas
  const categories = ['all', ...Array.from(new Set(skills.map(skill => skill.category)))];
  
  // Filtra e ordena habilidades
  const filteredSkills = skills
    .filter(skill => filter === 'all' || skill.category === filter)
    .sort((a, b) => {
      if (sort === 'percent') {
        return b.percent - a.percent;
      } else {
        return a.label.localeCompare(b.label);
      }
    });

  // Efeito para animações de entrada
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="habilidades" className="bg-black py-14 px-4 sm:px-6">
      <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-purple-400">
        Habilidades e Conhecimentos
      </h3>
      
      {/* Controles: Filtro, Ordenação e Visualização */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="flex items-center bg-gray-900 rounded-md p-2">
          <FaFilter className="text-purple-400 mr-2" />
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filter === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center bg-gray-900 rounded-md p-2">
          <FaSortAmountDown className="text-purple-400 mr-2" />
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value as 'percent' | 'alphabetical')}
            className="bg-gray-800 text-white px-3 py-1 rounded-md"
          >
            <option value="percent">Proficiência</option>
            <option value="alphabetical">Ordem Alfabética</option>
          </select>
        </div>
        
        <div className="flex items-center bg-gray-900 rounded-md p-2">
          <span className="text-purple-400 mr-2">Modo:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('circles')}
              className={`px-3 py-1 rounded-md ${
                viewMode === 'circles' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Círculos
            </button>
            <button
              onClick={() => setViewMode('bars')}
              className={`px-3 py-1 rounded-md ${
                viewMode === 'bars' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Barras
            </button>
          </div>
        </div>
        
        <div className="flex items-center bg-gray-900 rounded-md p-2">
          <span className="text-purple-400 mr-2">Animações:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={animationsEnabled}
              onChange={() => setAnimationsEnabled(!animationsEnabled)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>

      {/* Grade de habilidades */}
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center ${
        isMounted ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'
      }`}>
        {filteredSkills.map((skill, index) => (
          <div 
            key={index} 
            className="skill-item transition-transform duration-300 hover:scale-105 hover:z-10 w-full max-w-[150px]"
          >
            {viewMode === 'circles' ? (
              <SkillCircle 
                {...skill} 
                colorGradient={animationsEnabled ? skill.colorGradient : ["#718096", "#718096"]}
              />
            ) : (
              <div className="flex flex-col items-center space-y-3 p-4 bg-gray-900 rounded-lg w-full">
                <div className="flex items-center gap-2 text-white text-lg">
                  <span className="text-xl">{skill.icon}</span>
                  <span>{skill.label}</span>
                </div>
                <div className="w-full">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{skill.percent}%</span>
                    <span>
                      {skill.percent > 80 ? 'Expert' : skill.percent > 60 ? 'Avançado' : 'Intermediário'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" 
                      style={{ 
                        width: `${animationsEnabled ? skill.percent : 100}%`,
                        transition: animationsEnabled ? 'width 0.8s ease-out' : 'none'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Mensagem quando não há resultados */}
      {filteredSkills.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          Nenhuma habilidade encontrada nesta categoria
        </div>
      )}
    </section>
  );
};

export default SkillsSection;