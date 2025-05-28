import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaCss3Alt,
  FaPython,
} from "react-icons/fa";
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
  { icon: <SiJavascript />, label: "JavaScript", level:0 },
  { icon: <FaNodeJs />, label: "Node.js", level: 4 },
  { icon: <FaJava />, label: "Java", level: 4 },
];

const levels = Array.from(new Set(skills.map((s) => s.level))).sort();

const SkillsSection: React.FC = () => {
  return (
    <section id="habilidades" className="relative px-4 sm:px-6 mb-10">
      <div
        className="w-full flex flex-col items-center space-y-14 relative z-10"
        style={{
          backgroundImage: `url('assets/images/supernova.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Habilidades e Conhecimentos
        </span>
      </h3>
        {levels.map((level) => {
          const skillsAtLevel = skills.filter((skill) => skill.level === level);
          return (
            <div key={level} className="relative w-full flex justify-center">
              {/* Linha horizontal removida, então não colocamos mais este div */}
              <div className="flex justify-center gap-6 flex-wrap relative z-10">
                {skillsAtLevel.map((skill, index) => (
                  <div
                    key={index}
                    className="group flex flex-col items-center transition duration-300 hover:scale-105 hover:-rotate-1 hover:shadow-md hover:bg-gray-100 dark:hover:bg-zinc-800 p-3 rounded-md bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700"
                  >
                    <div className="w-16 h-16 flex items-center justify-center text-primary group-hover:text-green-300 transition-colors duration-300 text-[2.5rem]">
                      {skill.icon}
                    </div>
                    <span className="capitalize text-xs sm:text-sm mt-1 text-zinc-800 dark:text-zinc-200">
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
