# Deploy

Guia genérico para publicar o portfólio. **Não commite** domínios reais, IPs de VPS, tokens ou arquivos `.env` no repositório.

## Pré-requisitos

- Node.js 20+
- Docker (opcional, recomendado para produção)

## Variáveis de ambiente

Copie o template e preencha localmente:

```bash
cp .env.example .env.local
```

| Variável | Descrição |
|----------|-----------|
| `VITE_SITE_URL` | URL pública do site |
| `VITE_CV_PT_FILENAME` | Nome do PDF em PT dentro de `public/assets/site/cv/` |
| `VITE_CV_EN_FILENAME` | Nome do PDF em EN dentro de `public/assets/site/cv/` |

Os PDFs de currículo **não são versionados**. Adicione-os manualmente em `public/assets/site/cv/` antes do build.

## Build local

```bash
npm ci
npm run test:ci
npm run build:production
npm run preview
```

## Docker

```bash
docker build -t portfolio .
docker run -p 8080:80 portfolio
```

Ou com Compose:

```bash
docker compose up --build -d
```

## Plataformas (Dockploy, Railway, etc.)

1. Conecte o repositório Git
2. Defina `NODE_ENV=production`
3. Configure as variáveis `VITE_*` no painel da plataforma (não no Git)
4. Use o `Dockerfile` da raiz ou o comando `npm run build:production`
5. Aponte o domínio e SSL no painel da plataforma — não documente IPs/domínios reais aqui

## Dados do portfólio

Os projetos ficam em `src/data/portfolio.json` e são empacotados no build estático. Não há API externa em produção.

## Checklist antes de publicar

- [ ] `.env.local` e PDFs fora do Git
- [ ] Nenhum token ou senha em arquivos versionados
- [ ] Build e testes passando (`npm run test:ci && npm run build:production`)
