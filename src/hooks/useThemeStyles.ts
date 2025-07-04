import { useTheme } from '../contexts/ThemeContext';
import { useMemo } from 'react';

export const useThemeStyles = () => {
  const { theme, isDark, isLight } = useTheme();

  // Memoizar todas as classes para evitar recálculos desnecessários
  const styles = useMemo(() => ({
    // Classes de background
    background: isDark ? 'bg-gray-900' : 'bg-white',
    backgroundSecondary: isDark ? 'bg-gray-800' : 'bg-gray-50',
    backgroundTertiary: isDark ? 'bg-gray-700' : 'bg-gray-100',
    
    // Classes de texto  
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    textTertiary: isDark ? 'text-gray-400' : 'text-gray-500',
    
    // Classes de borda
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    borderSecondary: isDark ? 'border-gray-600' : 'border-gray-300',
    
    // Classes de hover
    hover: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    hoverSecondary: isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-100',
    
    // Classes de gradiente
    gradient: isDark ? 'from-gray-900 to-black' : 'from-gray-50 to-white',
    gradientSecondary: isDark ? 'from-gray-800 to-gray-900' : 'from-white to-gray-50',
    
    // Classes de sombra
    shadow: isDark ? 'shadow-2xl shadow-purple-500/10' : 'shadow-lg shadow-gray-300/20',
    shadowSecondary: isDark ? 'shadow-xl shadow-gray-900/50' : 'shadow-md shadow-gray-200/50',
    
    // Classes de input
    input: isDark 
      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
    
    // Classes de card
    card: isDark 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200',
    
    // Classes de accent
    accent: isDark ? 'text-purple-400' : 'text-purple-600',
    accentBg: isDark ? 'bg-purple-900/50' : 'bg-purple-100',
    
    // Classes de status
    success: isDark ? 'text-green-400' : 'text-green-600',
    error: isDark ? 'text-red-400' : 'text-red-600',
    warning: isDark ? 'text-yellow-400' : 'text-yellow-600',
    
    // Classes de link
    link: isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700',
  }), [isDark]);

  // Funções helper para compatibilidade com código existente
  const getBackgroundClasses = () => styles.background;
  const getTextClasses = () => styles.text;
  const getSecondaryTextClasses = () => styles.textSecondary;
  const getBorderClasses = () => styles.border;
  const getCardClasses = () => styles.card;
  const getHoverClasses = () => styles.hover;
  const getGradientClasses = () => styles.gradient;
  const getShadowClasses = () => styles.shadow;
  const getInputClasses = () => styles.input;

  return {
    theme,
    isDark,
    isLight,
    styles,
    // Funções compatíveis com código existente
    getBackgroundClasses,
    getTextClasses,
    getSecondaryTextClasses,
    getBorderClasses,
    getCardClasses,
    getHoverClasses,
    getGradientClasses,
    getShadowClasses,
    getInputClasses,
  };
}; 