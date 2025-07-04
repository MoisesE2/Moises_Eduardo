// Sistema centralizado de ícones com tree-shaking otimizado
import React from 'react';

// Imports específicos para tree-shaking (sintaxe correta)
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaDownload,
  FaEnvelope,
  FaReact,
  FaNodeJs,
  FaJava,
  FaCss3Alt,
  FaPython,
} from 'react-icons/fa';

import {
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiFigma,
  SiNextdotjs,
  SiDocker,
} from 'react-icons/si';

import {
  HiAdjustments,
  HiSortAscending,
  HiViewGrid,
  HiViewList,
} from 'react-icons/hi';

// Interface para propriedades comuns dos ícones
interface IconProps {
  size?: number | string;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

// Wrapper para padronizar ícones
const createIcon = (IconComponent: React.ComponentType<IconProps>) => {
  return React.forwardRef<SVGElement, IconProps>(({ size = 24, className = '', ...props }, ref) => (
    <IconComponent
      ref={ref}
      size={size}
      className={className}
      {...props}
    />
  ));
};

// Ícones centralizados
export const Icons = {
  // Sociais
  GitHub: createIcon(FaGithub),
  LinkedIn: createIcon(FaLinkedin),
  Instagram: createIcon(FaInstagram),
  Email: createIcon(FaEnvelope),
  Download: createIcon(FaDownload),

  // Tecnologias Frontend
  React: createIcon(FaReact),
  TypeScript: createIcon(SiTypescript),
  JavaScript: createIcon(SiJavascript),
  TailwindCSS: createIcon(SiTailwindcss),
  CSS3: createIcon(FaCss3Alt),
  NextJS: createIcon(SiNextdotjs),

  // Tecnologias Backend
  NodeJS: createIcon(FaNodeJs),
  Python: createIcon(FaPython),
  Java: createIcon(FaJava),

  // Ferramentas
  Figma: createIcon(SiFigma),
  GitHubAlt: createIcon(FaGithub),
  Docker: createIcon(SiDocker),

  // UI Controls
  Adjustments: createIcon(HiAdjustments),
  SortAscending: createIcon(HiSortAscending),
  ViewGrid: createIcon(HiViewGrid),
  ViewList: createIcon(HiViewList),
} as const;

// Mapeamento de ícones por categoria para facilitar uso
export const IconCategories = {
  social: {
    github: Icons.GitHub,
    linkedin: Icons.LinkedIn,
    instagram: Icons.Instagram,
    email: Icons.Email,
  },
  
  frontend: {
    react: Icons.React,
    typescript: Icons.TypeScript,
    javascript: Icons.JavaScript,
    tailwind: Icons.TailwindCSS,
    css: Icons.CSS3,
    nextjs: Icons.NextJS,
  },
  
  backend: {
    nodejs: Icons.NodeJS,
    python: Icons.Python,
    java: Icons.Java,
  },
  
  tools: {
    figma: Icons.Figma,
    git: Icons.GitHubAlt,
    docker: Icons.Docker,
  },
  
  ui: {
    adjustments: Icons.Adjustments,
    sort: Icons.SortAscending,
    grid: Icons.ViewGrid,
    list: Icons.ViewList,
    download: Icons.Download,
  },
} as const;

// Hook para obter ícones com tipagem forte
export const useIcon = (category: keyof typeof IconCategories, name: string) => {
  const categoryIcons = IconCategories[category] as Record<string, React.ComponentType<IconProps>>;
  return categoryIcons[name] || null;
};

// Componente de ícone dinâmico com fallback
export const DynamicIcon: React.FC<{
  category: keyof typeof IconCategories;
  name: string;
  fallback?: React.ReactNode;
} & IconProps> = ({ category, name, fallback = '?', ...props }) => {
  const IconComponent = useIcon(category, name);
  
  if (!IconComponent) {
    return <span className="inline-flex items-center justify-center">{fallback}</span>;
  }
  
  return <IconComponent {...props} />;
};

// Export individual para compatibilidade
export const {
  GitHub,
  LinkedIn,
  Instagram,
  Email,
  Download,
  React: ReactIcon,
  TypeScript,
  JavaScript,
  TailwindCSS,
  CSS3,
  NextJS,
  NodeJS,
  Python,
  Java,
  Figma,
  GitHubAlt,
  Docker,
  Adjustments,
  SortAscending,
  ViewGrid,
  ViewList,
} = Icons;

export default Icons; 