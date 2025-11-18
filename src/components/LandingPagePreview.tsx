import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeStyles } from "../hooks/useThemeStyles";

interface LandingPagePreviewProps {
  className?: string;
}

const LandingPagePreview: React.FC<LandingPagePreviewProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();

  // Tema: Design Gráfico
  const features = [
    { 
      id: 1, 
      icon: "🎨", 
      title: "Templates Premium",
      description: "Coleção exclusiva de layouts"
    },
    { 
      id: 2, 
      icon: "🎯", 
      title: "Design Personalizado",
      description: "Criação única para sua marca"
    },
    { 
      id: 3, 
      icon: "✨", 
      title: "Elementos Gráficos",
      description: "Ícones, ilustrações e mais"
    }
  ];

  const stats = [
    { value: "2K+", label: "Projetos Realizados" },
    { value: "500+", label: "Templates Criados" },
    { value: "100%", label: "Satisfação" }
  ];

  return (
    <div className={`${className} w-full max-w-2xl mx-auto px-2 sm:px-0`}>
      {/* Browser Frame */}
      <div className={`relative rounded-t-xl sm:rounded-t-2xl overflow-hidden shadow-2xl ${
        isDark 
          ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
          : 'bg-gradient-to-b from-gray-200 to-gray-300'
      }`}>
        {/* Browser Bar */}
        <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 ${
          isDark ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          </div>
          <div className={`flex-1 mx-2 sm:mx-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs truncate ${
            isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'
          }`}>
            creativestudio.design
          </div>
        </div>

        {/* Screen Content */}
        <div className={`relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-black' 
            : 'bg-gradient-to-br from-white via-purple-50/50 to-gray-50'
        }`}>
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-32 h-32 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl" />
          </div>

          <div className="max-h-[600px] overflow-y-auto relative">
            {/* Header/Navigation */}
            <header className={`sticky top-0 z-20 backdrop-blur-xl border-b ${
              isDark 
                ? 'bg-gray-900/90 border-gray-800/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg`}>
                    CS
                  </div>
                  <span className={`text-base sm:text-lg font-bold truncate ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    CreativeStudio
                  </span>
                </div>
                <nav className="hidden sm:flex gap-4 md:gap-6">
                  <a href="#portfolio" className={`text-xs sm:text-sm font-medium active:text-purple-400 hover:text-purple-400 transition-colors touch-manipulation ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Portfólio
                  </a>
                  <a href="#services" className={`text-xs sm:text-sm font-medium active:text-purple-400 hover:text-purple-400 transition-colors touch-manipulation ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Serviços
                  </a>
                  <a href="#contact" className={`text-xs sm:text-sm font-medium active:text-purple-400 hover:text-purple-400 transition-colors touch-manipulation ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Contato
                  </a>
                </nav>
                <button className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white active:shadow-lg active:scale-95 hover:scale-105 transition-all touch-manipulation whitespace-nowrap`}>
                  Solicitar Orçamento
                </button>
              </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-10 md:py-16 text-center relative z-10">
              <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                <h1 className={`text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight px-2 sm:px-0 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Design Gráfico que
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mt-1">
                    Transforma sua Marca
                  </span>
                </h1>
                <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 sm:px-0 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Criação de identidade visual, materiais gráficos e design personalizado. Do conceito à entrega final, elevamos sua marca com criatividade e qualidade profissional.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 px-4 sm:px-0">
                  <button className={`group w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white active:shadow-xl active:shadow-purple-500/50 active:scale-95 hover:scale-105 transition-all flex items-center justify-center gap-2 touch-manipulation`}>
                    Ver Portfólio
                    <span className="group-active:translate-x-1 transition-transform">→</span>
                  </button>
                  <button className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold border-2 ${
                    isDark 
                      ? 'border-gray-700 text-gray-300 active:border-purple-500 active:text-purple-400' 
                      : 'border-gray-300 text-gray-700 active:border-purple-500 active:text-purple-600'
                  } transition-all flex items-center justify-center gap-2 active:scale-95 touch-manipulation`}>
                    <span className="text-base sm:text-lg">📧</span>
                    Contatar
                  </button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-6 sm:pt-8 px-4 sm:px-0">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center min-w-[80px] sm:min-w-0">
                      <div className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className={`text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Preview Mockup */}
              <div className={`mt-6 sm:mt-12 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 mx-2 sm:mx-0 ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white border-gray-200 shadow-xl'
              }`}>
                <div className={`rounded-lg overflow-hidden ${
                  isDark ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                  <div className={`h-36 sm:h-48 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 flex items-center justify-center relative`}>
                    {/* Design Elements Pattern */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-4 opacity-30">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 blur-sm`} />
                      <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 rotate-45 blur-sm`} />
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-pink-400 to-blue-400 blur-sm`} />
                    </div>
                    {/* Typography Preview */}
                    <div className="relative z-10 text-center space-y-1 sm:space-y-2">
                      <div className={`text-2xl sm:text-3xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        ABC
                      </div>
                      <div className={`text-xs sm:text-sm font-medium px-2 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Tipografia & Elementos Gráficos
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services/Features Section */}
            <section id="services" className={`container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 ${
              isDark ? 'bg-gray-900/30' : 'bg-gray-50/50'
            } relative z-10`}>
              <div className="text-center mb-6 sm:mb-10">
                <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Nossos Serviços
                </h2>
                <p className={`text-xs sm:text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Soluções completas em design gráfico
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 px-2 sm:px-0">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`group p-4 sm:p-6 rounded-xl border transition-all active:scale-95 hover:shadow-lg hover:-translate-y-1 touch-manipulation ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-700 active:border-purple-500/50' 
                        : 'bg-white border-gray-200 active:border-purple-300 active:shadow-purple-100'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-active:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className={`text-sm sm:text-base font-bold mb-1.5 sm:mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-xs sm:text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 text-center relative z-10">
              <div className={`p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 border-2 backdrop-blur-sm mx-2 sm:mx-0 ${
                isDark ? 'border-purple-500/30' : 'border-purple-300/50'
              }`}>
                <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Pronto para dar vida ao seu projeto?
                </h2>
                <p className={`mb-4 sm:mb-6 text-xs sm:text-sm md:text-base px-2 sm:px-0 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Vamos conversar sobre como podemos transformar suas ideias em design
                </p>
                <button className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white active:shadow-xl active:shadow-purple-500/50 active:scale-95 hover:scale-105 transition-all touch-manipulation text-sm sm:text-base`}>
                  Solicitar Orçamento Grátis
                </button>
              </div>
            </section>

            {/* Footer */}
            <footer className={`border-t ${
              isDark 
                ? 'bg-gray-900/80 border-gray-800' 
                : 'bg-white/80 border-gray-200'
            } relative z-10`}>
              <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className={`text-xs sm:text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Made By Gcodevs
                </div>
                <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                  <a href="#" className={`active:text-purple-400 hover:text-purple-400 transition-colors touch-manipulation ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Portfólio
                  </a>
                  <a href="#" className={`active:text-purple-400 hover:text-purple-400 transition-colors touch-manipulation ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Serviços
                  </a>
                  <a href="#" className={`active:text-purple-400 hover:text-purple-400 transition-colors touch-manipulation ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Contato
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPagePreview;
