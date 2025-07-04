# Sistema de Temas - Portfólio Moisés Eduardo

## Visão Geral

O sistema de temas implementado permite alternar entre tema claro e escuro com persistência de preferências e detecção automática da preferência do sistema.

## Componentes Implementados

### 1. ThemeContext (`src/contexts/ThemeContext.tsx`)
- Gerencia o estado global do tema
- Detecta preferência do sistema (`prefers-color-scheme`)
- Persiste a escolha no localStorage
- Aplica classes CSS automaticamente no elemento root

### 2. Hook useTheme
- Fornece acesso ao contexto de tema
- Retorna: `theme`, `toggleTheme`, `isDark`, `isLight`

### 3. Hook useThemeStyles (`src/hooks/useThemeStyles.ts`)
- Fornece classes CSS adaptáveis ao tema
- Métodos disponíveis:
  - `getBackgroundClasses()`
  - `getTextClasses()`
  - `getSecondaryTextClasses()`
  - `getBorderClasses()`
  - `getCardClasses()`
  - `getHoverClasses()`
  - `getGradientClasses()`
  - `getShadowClasses()`
  - `getInputClasses()`

### 4. Variáveis CSS (`src/styles/index.css`)
- Tema claro: cores em tons de azul e cinza claro
- Tema escuro: cores em tons de preto e cinza escuro
- Transições suaves entre temas

## Componentes Atualizados

### HeroSection
- Background adapta entre gradientes claro/escuro
- Texto e elementos visuais se adaptam ao tema
- Imagem com bordas temáticas

### ContactSection
- Formulário com inputs adaptativos
- Cards e botões com cores temáticas
- Validação visual mantida em ambos os temas

### Header
- Botão de toggle com ícones Sol/Lua
- Navegação com cores adaptáveis
- Dropdown de idiomas com tema consistente

## Funcionalidades

1. **Toggle Manual**: Botão no Header para alternar temas
2. **Detecção Automática**: Detecta preferência do sistema no primeiro acesso
3. **Persistência**: Salva preferência no localStorage
4. **Meta Tag**: Atualiza `theme-color` automaticamente
5. **Transições**: Animações suaves entre temas

## Uso

### Usando o Hook de Tema
```typescript
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme, isDark, isLight } = useTheme();
  
  return (
    <div className={isDark ? 'bg-gray-900' : 'bg-white'}>
      <button onClick={toggleTheme}>
        {isDark ? 'Modo Claro' : 'Modo Escuro'}
      </button>
    </div>
  );
};
```

### Usando o Hook de Estilos
```typescript
import { useThemeStyles } from '../hooks/useThemeStyles';

const MyComponent = () => {
  const { isDark, getBackgroundClasses } = useThemeStyles();
  
  return (
    <div className={getBackgroundClasses()}>
      Conteúdo
    </div>
  );
};
```

## Estrutura de Cores

### Tema Claro
- Background: `#ffffff`, `#f8fafc`, `#f1f5f9`
- Texto: `#1e293b`, `#475569`, `#64748b`
- Bordas: `#e2e8f0`, `#cbd5e1`
- Acentos: `#3b82f6`, `#8b5cf6`

### Tema Escuro
- Background: `#000000`, `#111827`, `#1f2937`
- Texto: `#ffffff`, `#d1d5db`, `#9ca3af`
- Bordas: `#374151`, `#4b5563`
- Acentos: `#60a5fa`, `#a78bfa`

## Acessibilidade

- Botão de toggle com ARIA labels
- Contraste adequado em ambos os temas
- Suporte a `prefers-color-scheme`
- Anúncios via screen reader quando tema muda

## Testes

O sistema foi testado com:
- Alternância manual entre temas
- Detecção automática da preferência do sistema
- Persistência após recarregamento da página
- Responsividade em diferentes tamanhos de tela
- Funcionalidade de todos os componentes em ambos os temas 