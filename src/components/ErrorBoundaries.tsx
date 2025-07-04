import React, { Component, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStyles } from '../hooks/useThemeStyles';

// Interface base para error boundaries
interface BaseErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorId: string;
}

interface BaseErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo, errorId: string) => void;
}

// Gerador de ID único para errors
const generateErrorId = () => `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Error Boundary para APIs
export class ApiErrorBoundary extends Component<BaseErrorBoundaryProps, BaseErrorBoundaryState> {
  constructor(props: BaseErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<BaseErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: generateErrorId()
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log específico para erros de API
    console.error(`[API Error ${this.state.errorId}]:`, error, errorInfo);
    
    this.props.onError?.(error, errorInfo, this.state.errorId);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return <ApiErrorFallback onRetry={() => this.setState({ hasError: false, error: null, errorInfo: null })} />;
    }

    return this.props.children;
  }
}

// Error Boundary para componentes de UI
export class UIErrorBoundary extends Component<BaseErrorBoundaryProps, BaseErrorBoundaryState> {
  constructor(props: BaseErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<BaseErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: generateErrorId()
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    console.error(`[UI Error ${this.state.errorId}]:`, error, errorInfo);
    
    this.props.onError?.(error, errorInfo, this.state.errorId);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return <UIErrorFallback onRetry={() => this.setState({ hasError: false, error: null, errorInfo: null })} />;
    }

    return this.props.children;
  }
}

// Error Boundary para formulários
export class FormErrorBoundary extends Component<BaseErrorBoundaryProps, BaseErrorBoundaryState> {
  constructor(props: BaseErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<BaseErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: generateErrorId()
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    console.error(`[Form Error ${this.state.errorId}]:`, error, errorInfo);
    
    this.props.onError?.(error, errorInfo, this.state.errorId);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return <FormErrorFallback onRetry={() => this.setState({ hasError: false, error: null, errorInfo: null })} />;
    }

    return this.props.children;
  }
}

// Componentes de fallback específicos
const ApiErrorFallback: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  const { t } = useTranslation();
  const { styles } = useThemeStyles();

  return (
    <div className={`p-8 rounded-lg border text-center ${styles.card} ${styles.border}`}>
      <div className="text-4xl mb-4">🌐</div>
      <h3 className={`text-xl font-semibold mb-2 ${styles.text}`}>
        {t('errors.api.title', 'Erro de Conexão')}
      </h3>
      <p className={`mb-6 ${styles.textSecondary}`}>
        {t('errors.api.message', 'Não foi possível carregar os dados. Verifique sua conexão.')}
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          {t('errors.retry', 'Tentar Novamente')}
        </button>
        <button
          onClick={() => window.location.reload()}
          className={`px-6 py-2 rounded-lg transition-all ${styles.backgroundSecondary} ${styles.text} ${styles.hover}`}
        >
          {t('errors.reload', 'Recarregar')}
        </button>
      </div>
    </div>
  );
};

const UIErrorFallback: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  const { t } = useTranslation();
  const { styles } = useThemeStyles();

  return (
    <div className={`p-6 rounded-lg border text-center ${styles.card} ${styles.border}`}>
      <div className="text-3xl mb-3">🎨</div>
      <h3 className={`text-lg font-semibold mb-2 ${styles.text}`}>
        {t('errors.ui.title', 'Erro de Interface')}
      </h3>
      <p className={`mb-4 text-sm ${styles.textSecondary}`}>
        {t('errors.ui.message', 'Ocorreu um erro ao renderizar esta seção.')}
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
      >
        {t('errors.retry', 'Tentar Novamente')}
      </button>
    </div>
  );
};

const FormErrorFallback: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  const { t } = useTranslation();
  const { styles } = useThemeStyles();

  return (
    <div className={`p-6 rounded-lg border text-center ${styles.card} ${styles.border}`}>
      <div className="text-3xl mb-3">📝</div>
      <h3 className={`text-lg font-semibold mb-2 ${styles.text}`}>
        {t('errors.form.title', 'Erro no Formulário')}
      </h3>
      <p className={`mb-4 text-sm ${styles.textSecondary}`}>
        {t('errors.form.message', 'Ocorreu um erro no formulário. Tente novamente.')}
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
      >
        {t('errors.retry', 'Tentar Novamente')}
      </button>
    </div>
  );
};

// Hook para relatório de erros
export const useErrorReporting = () => {
  const reportError = (error: Error, context: string, extra?: Record<string, any>) => {
    const errorReport = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      extra
    };

    // Em produção, enviar para serviço de monitoramento
    if (process.env.NODE_ENV === 'production') {
      // Exemplo: Sentry, LogRocket, etc.
      console.error('[Error Report]:', errorReport);
    } else {
      console.error('[Dev Error Report]:', errorReport);
    }
  };

  return { reportError };
};

// Wrapper genérico para error boundaries
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryType: 'api' | 'ui' | 'form' = 'ui'
) => {
  const WrappedComponent = (props: P) => {
    const ErrorBoundaryComponent = {
      api: ApiErrorBoundary,
      ui: UIErrorBoundary,
      form: FormErrorBoundary
    }[errorBoundaryType];

    return (
      <ErrorBoundaryComponent>
        <Component {...props} />
      </ErrorBoundaryComponent>
    );
  };

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}; 