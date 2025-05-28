import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaVuejs,
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
  { icon: <FaReact size={70} />, label: "React" },
  { icon: <SiTypescript size={70} />, label: "TypeScript" },
  { icon: <FaPython size={70} />, label: "Python" },
  { icon: <SiFigma size={70} />, label: "Figma" },
  { icon: <SiTailwindcss size={70} />, label: "Tailwind" },
  { icon: <FaCss3Alt size={70} />, label: "CSS3" },
  { icon: <SiJavascript size={70} />, label: "JavaScript" },
  { icon: <FaNodeJs size={70} />, label: "Node.js" },
  { icon: <FaJava size={70} />, label: "Java" },
  { icon: <FaVuejs size={70} />, label: "Vue.js" },
];

const SkillsSection: React.FC = () => {
  return (
    <section id="habilidades" className="px-4 sm:px-6 mb-10">
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Habilidades e Conhecimentos
        </span>
      </h3>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-6 gap-x-4 justify-items-center text-center max-w-6xl">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group flex flex-col items-center transition duration-300 hover:scale-105 hover:-rotate-1 hover:shadow-md hover:bg-gray-100 dark:hover:bg-zinc-800 p-2 rounded-md"
            >
              <div className="text-primary group-hover:text-green-300 transition-colors duration-300">
                {skill.icon}
              </div>
              <span className="capitalize text-xs sm:text-sm mt-1 text-zinc-800 dark:text-zinc-200">
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
