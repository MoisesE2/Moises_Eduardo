import { useEffect, useRef, useCallback } from 'react';

interface UseA11yOptions {
  announceOnMount?: string;
  trapFocus?: boolean;
  autoFocus?: boolean;
  role?: string;
}

export const useA11y = (options: UseA11yOptions = {}) => {
  const { announceOnMount, trapFocus = false, autoFocus = false, role } = options;
  const elementRef = useRef<HTMLElement>(null);

  // Função para anunciar texto para leitores de tela
  const announce = useCallback((text: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = text;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  // Função para focar no elemento
  const focusElement = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.focus();
    }
  }, []);

  // Função para gerenciar trap focus
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!trapFocus || !elementRef.current) return;

    if (event.key === 'Tab') {
      const focusableElements = elementRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }

    if (event.key === 'Escape') {
      focusElement();
    }
  }, [trapFocus, focusElement]);

  // Configuração inicial
  useEffect(() => {
    if (announceOnMount) {
      announce(announceOnMount);
    }

    if (autoFocus) {
      focusElement();
    }

    if (elementRef.current && role) {
      elementRef.current.setAttribute('role', role);
    }

    if (trapFocus) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [announceOnMount, autoFocus, role, trapFocus, handleKeyDown, announce, focusElement]);

  return {
    ref: elementRef,
    announce,
    focusElement,
  };
};

// Hook para navegação por teclado
export const useKeyboardNavigation = () => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Navegação por Enter/Space em elementos interativos
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
        target.click();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

// Hook para skip links
export const useSkipLinks = () => {
  const skipToContent = useCallback((targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { skipToContent };
};

 