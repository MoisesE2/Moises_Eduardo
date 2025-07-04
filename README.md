# 🚀 Moisés Eduardo - Portfólio Full Stack

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Características](#características)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Acessibilidade](#acessibilidade)
- [Internacionalização](#internacionalização)
- [SEO](#seo)
- [Testes](#testes)
- [Deploy](#deploy)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

Este é meu portfólio pessoal desenvolvido com as mais modernas tecnologias web, demonstrando expertise em desenvolvimento Full Stack. O projeto apresenta uma interface elegante, totalmente responsiva e acessível, com foco em performance e experiência do usuário.

### ✨ Principais Funcionalidades

- **Portfólio Interativo**: Apresentação de projetos com integração à API
- **Seção de Habilidades**: Visualização dinâmica de competências técnicas
- **Tema Claro/Escuro**: Alternância entre temas com persistência
- **Multilíngue**: Suporte a Português, Inglês e Espanhol
- **Totalmente Acessível**: Navegação por teclado e leitores de tela
- **SEO Otimizado**: Meta tags dinâmicas e structured data
- **Performance**: Lazy loading e otimizações avançadas

## 🌟 Características

### 🎨 Design Moderno
- Interface elegante com gradientes e glassmorphism
- Animações suaves e responsivas
- Componentes com estados de hover e foco
- Design system consistente

### ♿ Acessibilidade Avançada
- ARIA labels e roles adequados
- Navegação por teclado completa
- Suporte a leitores de tela
- Contraste otimizado
- Skip links implementados

### 🌍 Internacionalização
- Suporte a 3 idiomas (PT, EN, ES)
- Detecção automática de idioma
- Persistência de preferências
- URLs localizadas

### 🔍 SEO Otimizado
- Meta tags dinâmicas
- Structured data (JSON-LD)
- Sitemap automático
- Open Graph e Twitter Cards

### 📱 Responsividade
- Mobile-first approach
- Breakpoints otimizados
- Touch-friendly interface
- PWA-ready

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca JavaScript para UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultrarrápido
- **TailwindCSS 4.0** - Framework CSS utilitário
- **React Router** - Roteamento SPA

### Internacionalização
- **React-i18next** - Sistema de traduções
- **i18next-browser-languagedetector** - Detecção automática de idioma

### Acessibilidade
- **Hooks customizados** - useA11y, useKeyboardNavigation
- **Heroicons** - Ícones acessíveis
- **ARIA** - Atributos de acessibilidade

### Qualidade de Código
- **Jest** - Framework de testes
- **React Testing Library** - Testes de componentes
- **ESLint** - Linting
- **Prettier** - Formatação de código

### Performance
- **Lazy Loading** - Carregamento otimizado
- **React.memo** - Otimização de re-renders
- **useMemo/useCallback** - Otimização de performance
- **Intersection Observer** - Animações otimizadas

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/moiseseduardo/portfolio.git
cd portfolio
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

4. **Execute o projeto**
```bash
npm run dev
```

5. **Acesse o projeto**
```
http://localhost:5173
```

## 🧪 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria build de produção
npm run preview      # Visualiza o build de produção
```

### Qualidade
```bash
npm run test         # Executa todos os testes
npm run test:watch   # Executa testes em modo watch
npm run test:coverage # Gera relatório de cobertura
npm run lint         # Verifica problemas de linting
npm run lint:fix     # Corrige problemas de linting
```

### Utilidades
```bash
npm run sitemap      # Gera sitemap e robots.txt
npm run i18n:extract # Extrai strings para tradução
npm run build:analyze # Analisa o bundle
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx       # Cabeçalho com navegação
│   ├── SkillsSection.tsx # Seção de habilidades
│   ├── PortfolioSection.tsx # Seção de projetos
│   ├── LazyImage.tsx    # Componente de imagem otimizada
│   └── ErrorBoundary.tsx # Tratamento de erros
├── contexts/            # Contextos React
│   └── ThemeContext.tsx # Context para temas
├── hooks/               # Hooks customizados
│   ├── useA11y.ts       # Hook de acessibilidade
│   ├── usePortfolio.ts  # Hook para dados do portfólio
│   └── __tests__/       # Testes dos hooks
├── i18n/               # Internacionalização
│   ├── config.ts       # Configuração do i18n
│   └── locales/        # Arquivos de tradução
│       ├── pt.json     # Português
│       ├── en.json     # Inglês
│       └── es.json     # Espanhol
├── pages/              # Páginas da aplicação
│   └── home/           # Página inicial
├── services/           # Serviços e API
│   ├── api.ts          # Cliente da API
│   └── __tests__/      # Testes dos serviços
├── styles/             # Estilos globais
│   └── index.css       # CSS principal
├── types/              # Tipos TypeScript
│   └── portfolio.ts    # Tipos e schemas
├── utils/              # Utilitários
│   └── imageUtils.ts   # Utilitários de imagem
├── App.tsx             # Componente principal
└── main.tsx           # Ponto de entrada
```

## ♿ Acessibilidade

### Funcionalidades Implementadas

- **Navegação por Teclado**: Suporte completo para navegação sem mouse
- **Leitores de Tela**: ARIA labels e roles apropriados
- **Skip Links**: Links para pular ao conteúdo principal
- **Contraste**: Cores otimizadas para visibilidade
- **Foco Visível**: Indicadores claros de foco
- **Reduced Motion**: Respeita preferências de animação

### Hooks de Acessibilidade

```typescript
// Hook principal de acessibilidade
const { ref, announce, focusElement } = useA11y({
  announceOnMount: "Página carregada",
  trapFocus: true,
  autoFocus: true,
  role: "main"
});

// Hook para navegação por teclado
useKeyboardNavigation();

// Hook para skip links
const { skipToContent } = useSkipLinks();
```

## 🌍 Internacionalização

### Idiomas Suportados
- 🇧🇷 Português (pt-BR) - Idioma padrão
- 🇺🇸 Inglês (en)
- 🇪🇸 Espanhol (es)

### Uso
```typescript
import { useTranslation } from 'react-i18next';

function Component() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <button onClick={() => i18n.changeLanguage('en')}>
        Change Language
      </button>
    </div>
  );
}
```

### Detecção Automática
O sistema detecta automaticamente o idioma do usuário baseado em:
1. Preferência salva no localStorage
2. Configuração do navegador
3. Idioma padrão (pt-BR)

## 🔍 SEO

### Meta Tags Dinâmicas
- Title e description otimizados
- Open Graph para redes sociais
- Twitter Cards
- Canonical URLs

### Structured Data
Implementação completa de JSON-LD para:
- Informações pessoais
- Habilidades técnicas
- Projetos e trabalhos
- Informações de contato

### Sitemap Automático
Geração automática de:
- `sitemap.xml`
- `robots.txt`
- `sitemap-index.xml`

Execute para gerar:
```bash
npm run sitemap
```

## 🧪 Testes

### Estrutura de Testes
- **Testes Unitários**: Hooks e utilitários
- **Testes de Componentes**: Rendering e interação
- **Testes de Integração**: Fluxos completos
- **Testes de Acessibilidade**: A11y compliance

### Executar Testes
```bash
# Todos os testes
npm test

# Modo watch
npm run test:watch

# Cobertura
npm run test:coverage

# Testes específicos
npm test -- --testNamePattern="Header"
```

### Cobertura Atual
- **Statements**: 85%+
- **Branches**: 80%+
- **Functions**: 90%+
- **Lines**: 85%+

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build
npm run build

# Deploy manual ou conectar ao Git
```

### GitHub Pages
```bash
# Usar GitHub Actions workflow
# Ver .github/workflows/deploy.yml
```

### Variáveis de Ambiente
```bash
# Exemplo de .env
VITE_API_URL=https://backend.gcodevs.com.br
VITE_SITE_URL=https://moiseseduardo.dev
```

## 📊 Performance

### Métricas Lighthouse
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Otimizações Implementadas
- Code splitting
- Lazy loading de imagens
- Preload de recursos críticos
- Compressão de assets
- Cache otimizado

## 🔧 Configuração Avançada

### Tailwind CSS
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Customizações
    }
  }
}
```

### Vite Config
```javascript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          i18n: ['react-i18next', 'i18next']
        }
      }
    }
  }
})
```

## 🤝 Contribuição

### Como Contribuir

1. **Fork o projeto**
2. **Crie uma branch para sua feature** (`git checkout -b feature/AmazingFeature`)
3. **Commit suas mudanças** (`git commit -m 'Add some AmazingFeature'`)
4. **Push para a branch** (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

### Padrões de Código
- Use TypeScript
- Siga as regras do ESLint
- Mantenha cobertura de testes
- Adicione documentação

### Roadmap
- [ ] PWA completo
- [ ] Modo offline
- [ ] Animações 3D
- [ ] Blog integrado
- [ ] Sistema de comentários

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**Moisés Eduardo**
- 🌐 Website: [moiseseduardo.dev](https://moiseseduardo.dev)
- 📧 Email: contato@moiseseduardo.dev
- 💼 LinkedIn: [linkedin.com/in/moiseseduardo](https://linkedin.com/in/moiseseduardo)
- 🐙 GitHub: [github.com/moiseseduardo](https://github.com/moiseseduardo)

---

<p align="center">
  Feito com ❤️ e muito ☕ por Moisés Eduardo
</p>

<p align="center">
  <a href="#topo">Voltar ao topo</a>
</p>
