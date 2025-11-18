import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { GitHub, LinkedIn, Instagram, Email } from "./Icons";

interface LinkInBioPreviewProps {
  className?: string;
}

const LinkInBioPreview: React.FC<LinkInBioPreviewProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();

  // Links funcionais
  const links = [
    {
      id: 1,
      label: "GitHub",
      url: "https://github.com/MoisesE2",
      icon: <GitHub className="w-5 h-5" />,
      color: "from-gray-800 to-gray-900",
      external: true
    },
    {
      id: 2,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/moises-e2/",
      icon: <LinkedIn className="w-5 h-5" />,
      color: "from-blue-600 to-blue-700",
      external: true
    },
    {
      id: 3,
      label: "Instagram",
      url: "https://www.instagram.com/moises_e1/",
      icon: <Instagram className="w-5 h-5" />,
      color: "from-pink-500 to-purple-600",
      external: true
    },
    {
      id: 4,
      label: "Email",
      url: "mailto:moises.eduardogc@gmail.com?subject=QUERO%20TRABALHAR%20COM%20VOCÊ!",
      icon: <Email className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      external: false
    },
    {
      id: 5,
      label: "Meu Portfólio",
      url: "#portfolio",
      icon: null,
      color: "from-purple-600 to-blue-600",
      external: false
    }
  ];

  return (
    <div className={`${className} w-full max-w-sm mx-auto px-2 sm:px-0`}>
      {/* Phone Frame */}
      <div className={`relative rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl ${
        isDark 
          ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
          : 'bg-gradient-to-b from-gray-200 to-gray-300'
      }`}>
        {/* Screen */}
        <div className={`relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] ${
          isDark 
            ? 'bg-gradient-to-b from-gray-900 to-black' 
            : 'bg-gradient-to-b from-white to-gray-50'
        }`}>
          {/* Status Bar */}
          <div className={`flex justify-between items-center px-4 sm:px-6 pt-3 sm:pt-4 pb-1.5 sm:pb-2 text-[10px] sm:text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span>9:41</span>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className="w-3 h-1.5 sm:w-4 sm:h-2 border border-current rounded-sm">
                <div className="w-2.5 h-1 sm:w-3 sm:h-1.5 bg-current rounded-sm m-0.5" />
              </div>
              <span className="text-[9px] sm:text-xs">100%</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-3 sm:pt-4 space-y-4 sm:space-y-6 max-h-[600px] overflow-y-auto">
            {/* Profile Section */}
            <div className="text-center space-y-3 sm:space-y-4">
              {/* Profile Photo */}
              <div className="flex justify-center">
                <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-xl ${
                  isDark ? 'ring-3 sm:ring-4 ring-purple-500/30' : 'ring-3 sm:ring-4 ring-purple-200'
                }`}>
                  <img
                    src="/assets/images/Moises.jpg"
                    alt={t('hero.name')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <h2 className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('hero.name')}
                </h2>
                <p className={`text-xs sm:text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {t('hero.titles.0')}
                </p>
              </div>

              {/* Bio Text */}
              <p className={`text-xs sm:text-sm leading-relaxed px-2 sm:px-4 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('hero.mobileDescription')}
              </p>
            </div>

            {/* Links */}
            <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
              {links.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`group relative flex items-center justify-center gap-2 sm:gap-3 w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl 
                    bg-gradient-to-r ${link.color} text-white font-medium cursor-pointer
                    transition-all duration-300 active:scale-95 hover:scale-105 hover:shadow-xl touch-manipulation
                    ${index === 0 ? 'animate-fade-in' : ''}`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  onClick={(e) => {
                    // Para links internos (portfólio), fazer scroll suave
                    if (!link.external && link.url.startsWith('#')) {
                      e.preventDefault();
                      const element = document.querySelector(link.url);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                >
                  {link.icon && (
                    <span className="flex-shrink-0 group-active:scale-110 transition-transform duration-300">
                      {React.cloneElement(link.icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })}
                    </span>
                  )}
                  <span className="flex-1 text-center text-sm sm:text-base">{link.label}</span>
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/0 group-active:bg-white/10 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className={`text-center pt-3 sm:pt-4 text-[10px] sm:text-xs ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <p>Made By Gcodevs</p>
            </div>
          </div>
        </div>

        {/* Home Indicator (iPhone style) */}
        <div className="flex justify-center pt-1.5 sm:pt-2 pb-0.5 sm:pb-1">
          <div className={`w-24 sm:w-32 h-0.5 sm:h-1 rounded-full ${
            isDark ? 'bg-gray-600' : 'bg-gray-400'
          }`} />
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default LinkInBioPreview;

