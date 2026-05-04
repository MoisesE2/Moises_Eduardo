import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useA11y, useSkipLinks } from "../hooks/useA11y";
import { 
  SunIcon, 
  MoonIcon, 
  LanguageIcon, 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  CpuChipIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  RectangleStackIcon
} from "@heroicons/react/24/outline";

const Header: React.FC = React.memo(() => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { isDark } = useThemeStyles();
  const { skipToContent } = useSkipLinks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { ref: headerRef, announce } = useA11y({
    role: 'banner'
  });

  const navItems = [
    { href: "#inicio", label: t('nav.home'), icon: HomeIcon },
    { href: "#habilidades", label: t('nav.skills'), icon: CpuChipIcon },
    { href: "#tipos-projetos", label: t('nav.projectsTypes'), icon: RectangleStackIcon },
    { href: "#portfolio", label: t('nav.portfolio'), icon: BriefcaseIcon },
    { href: "#contato", label: t('nav.contact'), icon: ChatBubbleLeftRightIcon },
  ];

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  /** pt-BR / en-US etc. → código usado nos recursos (pt, en, es) */
  const resolvedLangCode = (i18n.resolvedLanguage || i18n.language || 'pt').split('-')[0];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);

      const doc = document.documentElement;
      const scrollableHeight = doc.scrollHeight - doc.clientHeight;
      const progress = scrollableHeight > 0 ? (offset / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeToggle = useCallback(() => {
    toggleTheme();
    announce(t(`accessibility.${theme === 'dark' ? 'lightTheme' : 'darkTheme'}`));
  }, [toggleTheme, theme, announce, t]);

  const handleLanguageChange = useCallback((langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLanguageMenuOpen(false);
    announce(t('accessibility.changeLanguage'));
  }, [i18n, announce, t]);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    announce(t(isMenuOpen ? 'accessibility.closeMenu' : 'accessibility.openMenu'));
  }, [isMenuOpen, announce, t]);

  const handleSkipToContent = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      skipToContent('main-content');
    }
  }, [skipToContent]);

  // Fechar menus quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-language-menu]') && !target.closest('[data-language-button]')) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Fechar menu mobile no redimensionamento
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl z-50 
                   focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium shadow-lg"
        onKeyDown={handleSkipToContent}
      >
        {t('accessibility.skipToContent')}
      </a>

      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out
                   ${scrolled 
                     ? (isDark 
                        ? 'bg-black/90 backdrop-blur-xl shadow-2xl shadow-purple-500/10 border-b border-purple-500/20' 
                        : 'bg-white/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border-b border-blue-500/20')
                     : (isDark 
                        ? 'bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 backdrop-blur-md border-b border-transparent shadow-none'
                        : 'bg-gradient-to-r from-white/80 via-gray-50/80 to-white/80 backdrop-blur-md border-b border-transparent shadow-none')}`}
        role="banner"
      >
        {/* Scroll progress bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${
          isDark ? 'bg-gray-800/70' : 'bg-gray-200/70'
        }`}>
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        </div>
        
        <nav
          className="container mx-auto px-4 sm:px-6 py-4"
          role="navigation"
          aria-label={t('nav.home')}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center group">
              <a
                href="#inicio"
                className={`relative text-xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 
                           focus:ring-purple-300 rounded-lg px-4 py-2.5
                           group-hover:drop-shadow-lg will-change-transform
                           origin-center ${
                  isDark 
                    ? 'text-white hover:text-transparent bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400'
                    : 'text-gray-900 hover:text-transparent bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600'
                }`}
                aria-label={t('nav.home')}
              >
                <CodeBracketIcon className="w-5 h-5 inline-block mr-2 text-purple-400 group-hover:animate-pulse group-hover:text-blue-400 transition-colors duration-300" />
                <span className="group-hover:tracking-wide transition-all duration-300">Moisés Eduardo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 
                                rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-2" role="menubar">
                {navItems.map((item, index) => (
                  <li key={item.href} role="none">
                    <a
                      href={item.href}
                      className={`group relative flex items-center transition-all duration-300 
                                 focus:outline-none focus:ring-2 focus:ring-purple-300 
                                 rounded-xl px-5 py-3 text-sm font-medium
                                 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20
                                 hover:shadow-md hover:shadow-purple-500/20
                                 will-change-transform origin-center ${
                        isDark 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      role="menuitem"
                      tabIndex={0}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="relative z-10 flex items-center space-x-2 w-full">
                        <item.icon className="w-4 h-4 group-hover:text-purple-300 transition-all duration-300 flex-shrink-0" />
                        <span className="group-hover:font-semibold transition-all duration-300 group-hover:text-purple-300 flex-1">{item.label}</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 
                                      opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r 
                                      from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 
                                      transition-opacity duration-300 rounded-xl"></div>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Desktop Controls */}
              <div className="flex items-center space-x-3">
                {/* Language Selector */}
                <div className="relative z-50">
                  <button
                    type="button"
                    data-language-button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLanguageMenuOpen((open) => !open);
                    }}
                    className={`group flex items-center space-x-2 transition-all duration-300 focus:outline-none focus:ring-2 
                               focus:ring-purple-300 rounded-xl px-4 py-3
                               hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20
                               hover:shadow-md hover:shadow-purple-500/20
                               will-change-transform origin-center ${
                      isDark 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label={t('accessibility.changeLanguage')}
                    aria-expanded={isLanguageMenuOpen}
                    aria-haspopup="menu"
                  >
                    <LanguageIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-lg transition-transform duration-300">
                      {languages.find((lang) => lang.code === resolvedLangCode)?.flag || '🌐'}
                    </span>
                  </button>

                  {/* Language Dropdown */}
                  {isLanguageMenuOpen && (
                    <div
                      data-language-menu
                      className={`absolute right-0 top-full mt-2 w-52 backdrop-blur-xl
                                 border rounded-2xl shadow-2xl py-2 z-50
                                 animate-in fade-in slide-in-from-top-2 duration-200 ${
                        isDark 
                          ? 'bg-gray-900/95 border-gray-700/50 shadow-purple-500/10' 
                          : 'bg-white/95 border-gray-200/50 shadow-blue-500/10'
                      }`}
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {languages.map((lang, index) => (
                        <button
                          type="button"
                          key={lang.code}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLanguageChange(lang.code);
                          }}
                          className={`w-[calc(100%-1rem)] text-left px-4 py-3 text-sm transition-all duration-200 
                                     focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-xl mx-2
                                     hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20
                                     flex items-center space-x-3 group
                                     will-change-transform origin-center
                                     ${resolvedLangCode === lang.code 
                                       ? 'text-purple-300 bg-gradient-to-r from-purple-600/30 to-blue-600/30 shadow-lg' 
                                       : (isDark 
                                          ? 'text-gray-300 hover:text-white' 
                                          : 'text-gray-600 hover:text-gray-900')}`}
                          role="menuitem"
                          tabIndex={0}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="text-lg transition-transform duration-200">{lang.flag}</span>
                          <span className="font-medium group-hover:font-semibold transition-all duration-200">{lang.name}</span>
                          {resolvedLangCode === lang.code && (
                            <span className="ml-auto text-purple-400 group-hover:text-purple-300 transition-colors duration-200">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={handleThemeToggle}
                  className={`group p-3.5 transition-all duration-300 
                             focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-xl
                             hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20
                             hover:shadow-md hover:shadow-purple-500/20
                             will-change-transform origin-center ${
                    isDark 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={t('accessibility.toggleTheme')}
                  title={t(`accessibility.${theme === 'dark' ? 'lightTheme' : 'darkTheme'}`)}
                >
                  {theme === 'dark' ? (
                    <SunIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  ) : (
                    <MoonIcon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuToggle}
              className={`md:hidden group p-3.5 transition-all duration-300 
                         focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-xl
                         hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20
                         hover:shadow-lg hover:shadow-purple-500/20
                         will-change-transform origin-center ${
                isDark 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label={t(isMenuOpen ? 'accessibility.closeMenu' : 'accessibility.openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <XMarkIcon className={`absolute inset-0 w-6 h-6 transition-all duration-300 
                                     ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`} />
                <Bars3Icon className={`absolute inset-0 w-6 h-6 transition-all duration-300 
                                      ${isMenuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`} />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-500 ease-out
                          ${isMenuOpen ? 'max-h-[min(80vh,32rem)] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div
              id="mobile-menu"
              className={`mt-6 pb-6 border-t border-gradient-to-r from-purple-500/30 to-blue-500/30 pt-6 overflow-y-auto max-h-[min(70vh,28rem)] ${
                isDark ? 'border-gray-700/50' : 'border-gray-300/50'
              }`}
              role="menu"
              aria-orientation="vertical"
            >
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={item.href} role="none">
                    <a
                      href={item.href}
                      className={`group flex items-center space-x-3 px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-2 
                                 focus:ring-purple-300 rounded-xl hover:bg-gradient-to-r 
                                 hover:from-purple-600/20 hover:to-blue-600/20
                                 hover:shadow-md hover:shadow-purple-500/20
                                 will-change-transform origin-center w-full ${
                        isDark 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <item.icon className="w-5 h-5 group-hover:text-purple-300 transition-transform duration-200 flex-shrink-0" />
                      <span className="font-medium group-hover:font-semibold transition-all duration-300 group-hover:text-purple-300 flex-1">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Mobile Controls */}
              <div className={`flex items-center justify-between mt-6 pt-6 border-t ${
                isDark ? 'border-gray-700/50' : 'border-gray-300/50'
              }`}>
                <div className="flex items-center space-x-4">
                  {/* Mobile Language Selector */}
                  <div className="flex items-center space-x-2">
                    <LanguageIcon className={`w-5 h-5 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <div className="flex space-x-1">
                      {languages.map((lang) => (
                        <button
                          type="button"
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`p-3 rounded-xl transition-all duration-300 
                                     focus:outline-none focus:ring-2 focus:ring-purple-300
                                     will-change-transform origin-center
                                     ${resolvedLangCode === lang.code 
                                       ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                                       : (isDark 
                                          ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20'
                                          : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20')}`}
                          aria-label={`${t('accessibility.changeLanguage')} - ${lang.name}`}
                          title={lang.name}
                        >
                          <span className="text-base">{lang.flag}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Theme Toggle */}
                <button
                  onClick={handleThemeToggle}
                  className={`group p-3.5 transition-all duration-300 
                             focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-xl
                             hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20
                             will-change-transform origin-center ${
                    isDark 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={t('accessibility.toggleTheme')}
                  title={t(`accessibility.${theme === 'dark' ? 'lightTheme' : 'darkTheme'}`)}
                >
                  {theme === 'dark' ? (
                    <SunIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  ) : (
                    <MoonIcon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
});

Header.displayName = 'Header';

export default Header;