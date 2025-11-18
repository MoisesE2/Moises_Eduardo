import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useInView } from "react-intersection-observer";
import { FaWhatsapp } from "react-icons/fa";
import LinkInBioPreview from "./LinkInBioPreview";
import LandingPagePreview from "./LandingPagePreview";
import EcommercePreview from "./EcommercePreview";

type ProjectType = 'linkInBio' | 'landingPage' | 'ecommerce';

const ProjectsTypesSection: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();
  const [activeTab, setActiveTab] = useState<ProjectType>('linkInBio');
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

  const tabs: ProjectType[] = ['linkInBio', 'landingPage', 'ecommerce'];

  const handleTabChange = (tab: ProjectType) => {
    setActiveTab(tab);
  };

  return (
    <section 
      ref={sectionRef}
      id="tipos-projetos" 
      className={`relative py-16 px-4 sm:px-6 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-gray-900 to-black' 
          : 'bg-gradient-to-b from-white to-gray-50'
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
            {t('projectsTypes.title')}
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t('projectsTypes.subtitle')}
          </p>
        </div>
        
        {/* Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-10 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className={`flex items-center backdrop-blur-sm border rounded-2xl p-2 ${
            isDark 
              ? 'bg-gray-900/80 border-gray-700/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                    : (isDark 
                        ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                        : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:text-gray-900')
                }`}
              >
                {t(`projectsTypes.tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className={`transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className={`backdrop-blur-md border rounded-3xl p-8 sm:p-12 ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700/50' 
              : 'bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-200/60'
          }`}>
            {/* Tab Content */}
            {activeTab === 'linkInBio' && (
              <div className="animate-fade-in">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent`}>
                      {t('projectsTypes.linkInBio.title')}
                    </h3>
                    <p className={`text-lg mb-6 leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t('projectsTypes.linkInBio.description')}
                    </p>
                    <ul className={`space-y-3 mb-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {(['feature1', 'feature2', 'feature3', 'feature4'] as const).map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="text-purple-400 mt-1">✓</span>
                          <span>{t(`projectsTypes.linkInBio.${feature}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://wa.me/5585998444203?text=${encodeURIComponent(`Olá! Gostaria de fazer um orçamento para um projeto de ${t('projectsTypes.tabs.linkInBio')}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all`}
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      {t('projectsTypes.requestQuote')}
                    </a>
                  </div>
                  <div className="flex-shrink-0">
                    <LinkInBioPreview />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'landingPage' && (
              <div className="animate-fade-in">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent`}>
                      {t('projectsTypes.landingPage.title')}
                    </h3>
                    <p className={`text-lg mb-6 leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t('projectsTypes.landingPage.description')}
                    </p>
                    <ul className={`space-y-3 mb-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {(['feature1', 'feature2', 'feature3', 'feature4'] as const).map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="text-purple-400 mt-1">✓</span>
                          <span>{t(`projectsTypes.landingPage.${feature}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://wa.me/5585998444203?text=${encodeURIComponent(`Olá! Gostaria de fazer um orçamento para um projeto de ${t('projectsTypes.tabs.landingPage')}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all`}
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      {t('projectsTypes.requestQuote')}
                    </a>
                  </div>
                  <div className="flex-shrink-0">
                    <LandingPagePreview />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ecommerce' && (
              <div className="animate-fade-in">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent`}>
                      {t('projectsTypes.ecommerce.title')}
                    </h3>
                    <p className={`text-lg mb-6 leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t('projectsTypes.ecommerce.description')}
                    </p>
                    <ul className={`space-y-3 mb-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {(['feature1', 'feature2', 'feature3', 'feature4'] as const).map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="text-purple-400 mt-1">✓</span>
                          <span>{t(`projectsTypes.ecommerce.${feature}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://wa.me/5585998444203?text=${encodeURIComponent(`Olá! Gostaria de fazer um orçamento para um projeto de ${t('projectsTypes.tabs.ecommerce')}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all`}
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      {t('projectsTypes.requestQuote')}
                    </a>
                  </div>
                  <div className="flex-shrink-0">
                    <EcommercePreview />
                  </div>
                </div>
              </div>
            )}
          </div>
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
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
});

ProjectsTypesSection.displayName = 'ProjectsTypesSection';

export default ProjectsTypesSection;

