// src/pages/index.tsx
import React, { useEffect } from 'react';
import HeroSection from '../../components/HeroSection';
import { 
  SkillsSectionLazy, 
  ExperienceSectionLazy,
  EducationSectionLazy,
  PortfolioSectionLazy, 
  ContactSectionLazy,
  usePreloadComponents,
  LazyErrorBoundary 
} from '../../components/LazyComponents';
import { ComponentLoadingFallback } from '../../components/LazyImage';

const HomeIndex: React.FC = () => {
  const { preloadSkills, preloadExperience, preloadEducation, preloadPortfolio, preloadContact } = usePreloadComponents();

  useEffect(() => {
    // Precarrega componentes após um delay para não afetar o carregamento inicial
    const preloadTimer = setTimeout(() => {
      // Precarrega na ordem que o usuário provavelmente navegará
      preloadSkills();
      
      setTimeout(() => {
        preloadExperience();
        preloadEducation();
      }, 500);
      
      setTimeout(() => {
        preloadPortfolio();
      }, 1000);
      
      setTimeout(() => {
        preloadContact();
      }, 2000);
    }, 2000); // Aguarda 2s após carregamento inicial

    return () => clearTimeout(preloadTimer);
  }, [preloadSkills, preloadExperience, preloadEducation, preloadPortfolio, preloadContact]);

  // Precarrega componentes quando o usuário interage com a página
  useEffect(() => {
    const handleUserInteraction = () => {
      preloadSkills();
      preloadExperience();
      preloadEducation();
      preloadPortfolio();
      preloadContact();
    };

    // Precarrega em eventos de interação do usuário
    const events = ['mousedown', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [preloadSkills, preloadExperience, preloadEducation, preloadPortfolio, preloadContact]);

  return (
    <div className="min-h-screen">
      {/* Hero Section carregado imediatamente */}
      <HeroSection />
      
      {/* Componentes lazy com error boundaries */}
      <LazyErrorBoundary 
        fallback={
          <ComponentLoadingFallback 
            message="Erro ao carregar seção. Recarregue a página." 
            height="h-64"
          />
        }
      >
        <SkillsSectionLazy />
      </LazyErrorBoundary>
      
      <LazyErrorBoundary 
        fallback={
          <ComponentLoadingFallback 
            message="Erro ao carregar experiência. Recarregue a página." 
            height="h-64"
          />
        }
      >
        <ExperienceSectionLazy />
      </LazyErrorBoundary>
      
      <LazyErrorBoundary 
        fallback={
          <ComponentLoadingFallback 
            message="Erro ao carregar formação. Recarregue a página." 
            height="h-64"
          />
        }
      >
        <EducationSectionLazy />
      </LazyErrorBoundary>
      
      <LazyErrorBoundary 
        fallback={
          <ComponentLoadingFallback 
            message="Erro ao carregar portfólio. Recarregue a página." 
            height="h-64"
          />
        }
      >
        <PortfolioSectionLazy />
      </LazyErrorBoundary>
      
      <LazyErrorBoundary 
        fallback={
          <ComponentLoadingFallback 
            message="Erro ao carregar contato. Recarregue a página." 
            height="h-64"
          />
        }
      >
        <ContactSectionLazy />
      </LazyErrorBoundary>
    </div>
  );
};

export default HomeIndex;
