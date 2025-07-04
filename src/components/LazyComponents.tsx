import React, { Suspense, lazy } from 'react';
import { ComponentLoadingFallback } from './LazyImage';

// Lazy components para carregamento sob demanda
const LazySkillsSection = lazy(() => import('./SkillsSection'));
const LazyPortfolioSection = lazy(() => import('./PortfolioSection'));
const LazyContactSection = lazy(() => import('./ContactSection'));

// Wrappers com Suspense e fallbacks específicos
export const SkillsSectionLazy: React.FC = () => (
  <Suspense 
    fallback={
      <ComponentLoadingFallback 
        message="Carregando habilidades..." 
        height="h-96"
      />
    }
  >
    <LazySkillsSection />
  </Suspense>
);

export const PortfolioSectionLazy: React.FC = () => (
  <Suspense 
    fallback={
      <ComponentLoadingFallback 
        message="Carregando portfólio..." 
        height="h-96"
      />
    }
  >
    <LazyPortfolioSection />
  </Suspense>
);

export const ContactSectionLazy: React.FC = () => (
  <Suspense 
    fallback={
      <ComponentLoadingFallback 
        message="Carregando contato..." 
        height="h-64"
      />
    }
  >
    <LazyContactSection />
  </Suspense>
);

// Hook para precarregar componentes quando necessário
export const usePreloadComponents = () => {
  const preloadSkills = () => import('./SkillsSection');
  const preloadPortfolio = () => import('./PortfolioSection');
  const preloadContact = () => import('./ContactSection');

  return {
    preloadSkills,
    preloadPortfolio,
    preloadContact,
  };
};

// Componente de erro boundary específico para lazy components
export class LazyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
} 