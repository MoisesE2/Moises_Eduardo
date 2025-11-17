import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStyles } from '../hooks/useThemeStyles';
import usePortfolio from '../hooks/usePortfolio';
import { PortfolioItem } from '../types/portfolio';
import LazyImage from './LazyImage';
import { resolveImageUrl, resolveVideoUrl } from '../utils/imageUtils';
import { ApiErrorBoundary } from './ErrorBoundaries';

const PortfolioSectionContent: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { isDark } = useThemeStyles();
  const { portfolioItems, loading, error, retry, isApiError } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const openModal = useCallback((project: PortfolioItem) => {
    setSelectedProject(project);
    document.body.classList.add('modal-open');
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.classList.remove('modal-open');
  }, []);

  // Memoizar projetos filtrados
  const filteredProjects = useMemo(() => 
    activeCategory === 'all'
    ? portfolioItems
      : portfolioItems.filter(project => project.category === activeCategory),
    [activeCategory, portfolioItems]
  );

  // Memoizar categorias únicas
  const categories = useMemo(() => 
    ['all', ...new Set(portfolioItems.map(item => item.category))],
    [portfolioItems]
  );

  // Callback para mudança de categoria
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  if (loading) {
    return (
      <section id="portfolio" className={`relative py-20 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-gray-900 to-black' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            {t('portfolio.title')}
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" role="status" aria-label={t('portfolio.loading')}></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className={`relative py-20 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-gray-900 to-black' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            {t('portfolio.title')}
          </h2>
          <div className={`text-center py-10 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-semibold mb-4 text-red-400">
              {isApiError ? t('portfolio.error') : t('portfolio.error')}
            </h3>
            <p className={`mb-6 max-w-md mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {isApiError 
                ? 'Não foi possível conectar com o servidor. Verifique sua conexão e tente novamente.'
                : `Erro: ${error}`
              }
            </p>
            <button
              onClick={retry}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-purple-500/30"
            >
              {t('portfolio.retry')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className={`relative py-20 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-black' 
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          {t('portfolio.title')}
        </h2>

        {/* Filtro de categorias */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2 rounded-full capitalize transition-colors ${activeCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-purple-500/30 shadow-lg'
                : (isDark 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900')
                }`}
            >
              {category === 'all' ? t('skills.categories.all') : category}
            </button>
          ))}
        </div>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border group ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 hover:border-purple-500/50'
                  : 'bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10'
              }`}
              onClick={() => openModal(project)}
            >
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-4 text-center group-hover:text-purple-300 transition-colors ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                <div className={`aspect-video overflow-hidden rounded-lg border group-hover:border-purple-500/50 transition-colors ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <LazyImage
                    src={resolveImageUrl(project.imageUrl)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-800/80 to-blue-800/80 text-purple-200 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className={`rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-purple-900/30'
                : 'bg-gradient-to-br from-white to-gray-50 border-gray-300 shadow-purple-900/50'
            }`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                      {selectedProject.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-purple-800/80 to-blue-800/80 text-purple-200 px-2 py-1 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className={`text-3xl transition-colors ${
                      isDark 
                        ? 'text-gray-400 hover:text-purple-400'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    &times;
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`text-lg font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>Descrição</h4>
                    <p className={`mb-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>{selectedProject.description}</p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-700/80 to-blue-700/80 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-purple-500/30"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        {t('portfolio.viewGithub')}
                      </a>
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-700/80 to-blue-700/80 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-purple-500/30"
                        >
                          {t('portfolio.viewLive')}
                        </a>
                      )}
                    </div>
                  </div>

                  {selectedProject.videoUrl && (
                    <div>
                      <h4 className={`text-lg font-semibold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>Demonstração</h4>
                      <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-1">
                        <iframe
                          src={resolveVideoUrl(selectedProject.videoUrl)}
                          title={`${selectedProject.title} Demo`}
                          className="w-full h-64 rounded-lg"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

// Componente principal com error boundary
const PortfolioSection: React.FC = () => (
  <ApiErrorBoundary>
    <PortfolioSectionContent />
  </ApiErrorBoundary>
);

export default PortfolioSection;