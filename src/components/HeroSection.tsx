import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GitHub, LinkedIn, Instagram, Download, Email } from "./Icons";
import { useThemeStyles } from "../hooks/useThemeStyles";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  
  const titles = t('hero.titles', { returnObjects: true }) as string[];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section id="sobre" className={`min-h-screen w-full relative overflow-hidden pt-20 ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-black' 
        : 'bg-gradient-to-b from-blue-50 to-white'
    }`}>
      {/* Automatic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-purple-500/20 rounded-full animate-pulse" />
          <div className="absolute top-40 right-32 w-32 h-32 border border-blue-500/20 rounded-full animate-pulse delay-700" />
          <div className="absolute bottom-32 left-32 w-48 h-48 border border-purple-500/20 rounded-full animate-pulse delay-1000" />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Automatic Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
        
        {/* Moving Gradient Lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-slide-right" />
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-slide-left" />
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden h-screen w-full relative flex items-center justify-center px-6">
        <div className={`w-full max-w-sm text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Profile Image - PROFESSIONAL */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative">
              <div className={`w-48 h-48 rounded-full overflow-hidden shadow-2xl ${
                isDark ? 'border-2 border-gray-600 bg-gray-800' : 'border-2 border-gray-300 bg-gray-100'
              }`}>
                <img
                  src="/assets/images/Moises.jpg"
                  alt="Moisés Eduardo"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Professional Status Indicator */}
              <div className={`absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 shadow-lg ${
                isDark ? 'border-gray-900' : 'border-white'
              }`} />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className={`text-sm uppercase tracking-[0.4em] font-light animate-fade-in ${
                isDark ? 'text-purple-300' : 'text-blue-500'
              }`}>
                {t('hero.greeting')}
              </p>
              <h1 className={`text-4xl font-bold animate-gradient-x ${
                isDark 
                  ? 'bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent' 
                  : 'bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent'
              }`}>
                {t('hero.name')}
              </h1>
              <div className="h-8 overflow-hidden">
                <div className={`text-lg font-semibold animate-slide-up ${
                  isDark ? 'text-purple-400' : 'text-blue-600'
                }`}>
                  {titles[currentTitle]}
                </div>
              </div>
            </div>
            
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto animate-pulse" />
            
            <p className={`text-sm leading-relaxed animate-fade-in-delay ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('hero.mobileDescription')}
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-8">
              {[
                { icon: GitHub, href: "https://github.com/MoisesE2", label: "GitHub" },
                { icon: LinkedIn, href: "https://www.linkedin.com/in/moises-e2/", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/moises_e1/", label: "Instagram" },
                { icon: Email, href: "mailto:moises.eduardogc@gmail.com?subject=QUERO%20TRABALHAR%20COM%20VOCÊ!", label: "Email" }
              ].map(({ icon: Icon, href, label }, index) => (
                <a
                  key={label}
                  href={href}
                  className={`group relative p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg animate-fade-in-delay ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-400 hover:shadow-purple-500/25' 
                      : 'bg-white/80 border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-blue-400 hover:shadow-blue-500/25'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  aria-label={label}
                >
                  <Icon size={18} className="group-hover:animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
            </div>
            
            {/* Download Button */}
            <div className="mt-8 animate-fade-in-delay">
              <a
                href="/assets/Moisés Eduardo.pdf"
                download
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-900/40 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Download size={16} className="group-hover:animate-bounce" />
                <span className="relative z-10">{t('hero.downloadCV')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:flex h-screen w-full items-center max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-2 gap-16 lg:gap-24 w-full items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm uppercase tracking-[0.3em] text-purple-300 font-light">
                  {t('hero.available')}
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className={`text-6xl 2xl:text-7xl font-bold leading-[1.1] animate-gradient-x ${
                  isDark 
                    ? 'bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent'
                }`}>
                  {t('hero.greeting')}
                  <br />
                  <span className={`${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 bg-clip-text text-transparent' 
                      : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent'
                  }`}>
                    {t('hero.name')}
                  </span>
                </h1>
                
                <div className="h-16 overflow-hidden">
                  <div className={`text-3xl 2xl:text-4xl font-semibold animate-slide-up ${
                    isDark ? 'text-purple-400' : 'text-blue-600'
                  }`}>
                    {titles[currentTitle]}
                  </div>
                </div>
              </div>
              
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
            </div>
            
            <p className={`text-xl 2xl:text-2xl leading-relaxed max-w-2xl animate-fade-in-delay ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('hero.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-6 mt-12">
              {[
                { icon: GitHub, href: "https://github.com/MoisesE2", label: "GitHub" },
                { icon: LinkedIn, href: "https://www.linkedin.com/in/moises-e2/", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/moises_e1/", label: "Instagram" },
                { icon: Email, href: "mailto:moises.eduardogc@gmail.com?subject=QUERO%20TRABALHAR%20COM%20VOCÊ!", label: "Email" }
              ].map(({ icon: Icon, href, label }, index) => (
                <a
                  key={label}
                  href={href}
                  className={`group relative p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg animate-fade-in-delay ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-400 hover:shadow-purple-500/25' 
                      : 'bg-white/80 border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-blue-400 hover:shadow-blue-500/25'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  aria-label={label}
                >
                  <Icon size={24} className="group-hover:animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
            </div>
            
            {/* Download Button */}
            <div className="mt-10 animate-fade-in-delay">
              <a
                href="/assets/Moisés Eduardo.pdf"
                download
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-900/40 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Download size={20} className="group-hover:animate-bounce" />
                <span className="relative z-10">{t('hero.downloadCV')}</span>
              </a>
            </div>
          </div>

          {/* Right Image - PROFESSIONAL */}
          <div className={`flex justify-center items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className={`w-80 h-80 2xl:w-96 2xl:h-96 rounded-full overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 ${
                isDark ? 'border-4 border-gray-600 bg-gray-800 hover:border-gray-500' : 'border-4 border-gray-300 bg-gray-100 hover:border-gray-400'
              }`}>
                <img
                  src="/assets/images/Moises.jpg"
                  alt="Moisés Eduardo"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Professional Status Indicator */}
              <div className={`absolute bottom-4 right-4 w-8 h-8 bg-green-500 rounded-full border-4 shadow-lg ${
                isDark ? 'border-gray-900' : 'border-white'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;