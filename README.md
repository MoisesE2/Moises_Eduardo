# 🚀 Moisés Eduardo — Portfólio + Gco Devs

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Sobre o Projeto

Um único projeto Vite que gera **dois sites** com públicos distintos, servidos pelo mesmo container:

| Site | Domínio | Público | Entrada |
|------|---------|---------|---------|
| **Portfólio** | [moises.gcodevs.com](https://moises.gcodevs.com) | Recrutadores | `index.html` → `src/main.tsx` |
| **Gco Devs** | [gcodevs.com](https://gcodevs.com) | Clientes | `gcodevs.html` → `src/gcodevs/main.tsx` |

O **portfólio** foca em informações técnicas: habilidades (resumo compacto e expansível), experiência profissional, formação acadêmica e projetos — tudo alinhado ao currículo.

O **site da Gco Devs** é a vitrine comercial: tipos de projetos com previews interativos, processo de trabalho, diferenciais, casos de clientes, FAQ e orçamento via WhatsApp.

Os dois compartilham componentes, tema claro/escuro e estilos.

### ✨ Principais Funcionalidades

**Portfólio (moises.gcodevs.com)**
- Seções de Experiência (timeline com dados do CV) e Formação
- Habilidades em resumo compacto por grupo, com expansão opcional
- Contadores animados e easter egg no console do DevTools
- Download de CV (PT/EN), multilíngue (PT/EN/ES), tema claro/escuro
- SEO com JSON-LD `Person` cross-linkado com a organização Gco Devs

**Gco Devs (gcodevs.com)**
- Hero comercial com CTA de orçamento via WhatsApp
- Serviços com previews interativos (Link-in-Bio, Landing Page, E-commerce)
- Como funciona (4 passos), diferenciais e casos reais de clientes
- FAQ com schema `FAQPage` (rich results no Google)
- Formulário de orçamento → WhatsApp e botão flutuante de WhatsApp
- SEO com JSON-LD `ProfessionalService` apontando o fundador para o portfólio

## 🛠️ Tecnologias Utilizadas

- **React 19** + **TypeScript 5.7** + **Vite 6** (modo multi-página)
- **TailwindCSS 4** com tema claro/escuro via CSS variables
- **React Router 7** (portfólio), **react-i18next** (PT/EN/ES)
- **Zod** para validação dos dados de projetos
- **Jest** + **React Testing Library**, **ESLint**
- **Docker** + **nginx** com roteamento por domínio (Dockploy)

## 📦 Instalação

### Pré-requisitos
- Node.js 20+

### Passos

```bash
git clone https://github.com/MoisesE2/Moises_Eduardo.git
cd Moises_Eduardo
npm install
cp .env.example .env.local   # opcional
```

Adicione os PDFs de currículo localmente em `public/assets/site/cv/` (não versionados).

```bash
npm run dev
```

- Portfólio: `http://localhost:5173/`
- Gco Devs: `http://localhost:5173/gcodevs.html`

## 🧪 Scripts Disponíveis

```bash
npm run dev              # Servidor de desenvolvimento (as duas entradas)
npm run build            # Build de produção (dist/index.html + dist/gcodevs.html)
npm run build:production # Build com config de produção
npm run preview          # Visualiza o build (portfólio em / e Gco Devs em /gcodevs.html)

npm run test             # Testes
npm run test:coverage    # Cobertura
npm run lint             # Lint com fix
npm run type-check       # tsc --noEmit

npm run sitemap          # Gera sitemaps e robots.txt dos DOIS domínios
```

## 📁 Estrutura do Projeto

```
├── index.html               # Entrada do portfólio (meta tags + JSON-LD Person)
├── gcodevs.html             # Entrada da Gco Devs (meta tags + JSON-LD Organization/FAQ)
├── nginx.conf               # Dois server blocks: roteamento por domínio
└── src/
    ├── main.tsx             # Bootstrap do portfólio (+ easter egg no console)
    ├── App.tsx              # Rotas do portfólio
    ├── gcodevs/
    │   ├── main.tsx         # Bootstrap do site Gco Devs (PT-only)
    │   └── GcodevsApp.tsx   # Página comercial completa
    ├── components/
    │   ├── HeroSection.tsx        # Hero do portfólio (CV, disponibilidade)
    │   ├── SkillsSection.tsx      # Habilidades compactas por grupo (expansível)
    │   ├── ExperienceSection.tsx  # Timeline de experiência + contadores
    │   ├── EducationSection.tsx   # Formação, idiomas e competências
    │   ├── PortfolioSection.tsx   # Grid de projetos
    │   ├── ContactSection.tsx     # Contato (tom recrutador) + link Gco Devs
    │   ├── ProjectsTypesSection.tsx # Serviços (usado só no site Gco Devs)
    │   └── ...previews, header, lazy loading
    ├── data/portfolio.json  # Projetos estáticos (validados com Zod)
    ├── i18n/locales/        # pt.json, en.json, es.json
    └── styles/index.css     # Tokens de tema + Tailwind
```

## 🔍 SEO

- **Cross-link Person ↔ Organization**: o JSON-LD do portfólio declara `worksFor` → Gco Devs, e o da Gco Devs declara `founder` → Moisés Eduardo. Isso ajuda o Google a entender a autoria dos dois sites.
- **FAQPage** no gcodevs.com para rich results (mantenha o JSON-LD do `gcodevs.html` em sincronia com a seção FAQ visível).
- **Sitemaps e robots por domínio**: `npm run sitemap` gera `sitemap.xml`/`robots.txt` (portfólio) e `sitemap-gcodevs.xml`/`robots-gcodevs.txt` (Gco Devs). O nginx serve os arquivos corretos conforme o domínio.
- Open Graph, Twitter Cards, canonical e hreflang em cada entrada.

Após o deploy, cadastre os dois domínios no [Google Search Console](https://search.google.com/search-console) e envie os sitemaps.

## 🚀 Deploy

Consulte [docs/DEPLOY.md](docs/DEPLOY.md) para instruções completas.

O mesmo container atende os dois sites; o `nginx.conf` decide qual HTML servir pelo header `Host`:

- `moises.gcodevs.com` (e qualquer host desconhecido) → `index.html`
- `gcodevs.com` / `www.gcodevs.com` → `gcodevs.html`

**No Dockploy**: aponte os domínios `moises.gcodevs.com`, `gcodevs.com` e `www.gcodevs.com` para o mesmo serviço/container. O SSL é gerenciado pelo proxy reverso do Dockploy.

## 🧪 Testes

```bash
npm test                 # Todos os testes
npm run test:watch       # Modo watch
npm run test:coverage    # Cobertura
```

## 📝 Licença

Este projeto está sob a licença MIT.

## 📞 Contato

**Moisés Eduardo**
- 🌐 Portfólio: [moises.gcodevs.com](https://moises.gcodevs.com)
- 💼 Freelance: [gcodevs.com](https://gcodevs.com)
- 📧 Email: [moises.eduardogc@gmail.com](mailto:moises.eduardogc@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/moises-e2](https://www.linkedin.com/in/moises-e2/)
- 🐙 GitHub: [github.com/MoisesE2](https://github.com/MoisesE2)

---

<p align="center">
  Feito com ❤️ e muito ☕ por Moisés Eduardo
</p>
