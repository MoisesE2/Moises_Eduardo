import React from "react";
import { FaReact, FaNodeJs, FaJava, FaCss3Alt, FaPython, FaGithub } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiFigma,
} from "react-icons/si";

const skills = [
  { icon: <FaReact />, label: "React", level: 0 },
  { icon: <SiTypescript />, label: "TypeScript", level: 1 },
  { icon: <FaPython />, label: "Python", level: 4 },
  { icon: <SiFigma />, label: "Figma", level: 2 },
  { icon: <SiTailwindcss />, label: "Tailwind", level: 1 },
  { icon: <FaCss3Alt />, label: "CSS3", level: 2 },
  { icon: <SiJavascript />, label: "JavaScript", level: 0 },
  { icon: <FaNodeJs />, label: "Node.js", level: 4 },
  { icon: <FaJava />, label: "Java", level: 4 },
  { icon: <FaNodeJs />, label: "API", level: 3 },
  { icon: <SiJavascript />, label: "JSON", level: 3 },
  { icon: <FaGithub />, label: "Git", level: 2 },
];

const levels = Array.from(new Set(skills.map((s) => s.level))).sort();

const SkillsSection: React.FC = () => {
  return (
    <section id="habilidades" className="relative mb-10">
      <div className="px-4 sm:px-6">
        <h3 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Habilidades e Conhecimentos
          </span>
        </h3>
      </div>

      <div 
        className="w-full flex flex-col items-center py-16 space-y-12 relative z-10"
      >
        {/* Fundo responsivo */}
        <div className="absolute inset-0 z-0">
          {/* Desktop */}
          <div 
            className="hidden md:block w-full h-full"
            style={{
              backgroundImage: `url('assets/images/supernova.png')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          />
          
          {/* Mobile */}
          <div 
            className="md:hidden w-full h-full"
            style={{
              backgroundImage: `url('assets/images/supernovamobile.png')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />

          {/* Overlay de desfoque preto no topo */}
          <div 
            className="absolute top-0 left-0 right-0 h-32"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          />
          
          {/* Overlay de desfoque preto na base */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          />
        </div>

        {levels.map((level) => {
          const skillsAtLevel = skills.filter((s) => s.level === level);
          return (
            <div key={level} className="w-full max-w-5xl">
              <div className="flex justify-center gap-4 sm:gap-6 flex-wrap relative z-10">
                {skillsAtLevel.map((skill, index) => (
                  <div
                    key={index}
                    className="group flex flex-col items-center p-3 sm:p-4 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg transition duration-300 hover:scale-105"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-primary text-[2rem] sm:text-[2.5rem] group-hover:text-sky-400 transition-colors duration-300">
                      {skill.icon}
                    </div>
                    <span className="capitalize text-xs sm:text-sm mt-2 text-center text-zinc-800 dark:text-zinc-200">
                      {skill.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;