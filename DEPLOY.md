# Guia de Deploy - Portfólio Moisés Eduardo

## Problemas Resolvidos

### 1. Erro NIXPACKS_PATH Undefined
**Problema**: `UndefinedVar: Usage of undefined variable '$NIXPACKS_PATH'`

**Solução**: Criado arquivo `.nixpacks.toml` com configuração correta das variáveis de ambiente.

### 2. Erro Docker Build Failed
**Problema**: `process "/bin/bash -ol pipefail -c npm ci" did not complete successfully`

**Solução**: Criado `Dockerfile` otimizado com multi-stage build.

## Arquivos Criados

### `.nixpacks.toml`
Configuração para plataformas que usam NIXPACKS (como Railway):
- Define versões específicas do Node.js e npm
- Configura comandos de build corretamente
- Resolve problema com variável `$NIXPACKS_PATH`

### `Dockerfile`
Docker container otimizado:
- Multi-stage build para reduzir tamanho da imagem
- Usa nginx para servir arquivos estáticos
- Configuração otimizada para aplicações React SPA

### `nginx.conf`
Configuração do nginx:
- Suporte para SPA (Single Page Application)
- Cache otimizado para assets estáticos
- Configurações de segurança
- Compressão gzip

### `docker-compose.yml`
Orquestração de containers:
- Frontend com nginx
- API JSON Server
- Ambiente de desenvolvimento opcional

## Opções de Deploy

### 1. Plataformas com NIXPACKS (Railway, Render)
```bash
# Certifique-se de que o arquivo .nixpacks.toml está no root do projeto
git add .nixpacks.toml
git commit -m "Add NIXPACKS configuration"
git push origin main
```

### 2. Docker (VPS, DigitalOcean, AWS)
```bash
# Build e execução local
docker-compose up --build

# Ou apenas o frontend
docker build -t meu-portfolio .
docker run -p 80:80 meu-portfolio
```

### 3. Plataformas Static (Vercel, Netlify)
```bash
# Build para produção
npm run build

# Os arquivos estarão em dist/
```

## Comandos Úteis

### Para desenvolvimento com Docker
```bash
# Executar em modo desenvolvimento
docker-compose --profile dev up

# Parar todos os serviços
docker-compose down

# Rebuild após mudanças
docker-compose up --build
```

### Para debug
```bash
# Verificar logs do container
docker logs <container-id>

# Acessar shell do container
docker exec -it <container-id> /bin/sh
```

## Variáveis de Ambiente

### Para produção
```env
NODE_ENV=production
VITE_API_URL=https://sua-api.com
```

### Para desenvolvimento
```env
NODE_ENV=development
VITE_API_URL=http://localhost:3001
```

## Troubleshooting

### Erro "npm ci failed"
- Verifique se o `package-lock.json` está atualizado
- Execute `npm install` localmente e commit o package-lock.json atualizado

### Erro "Container not found"
- Limpe containers antigos: `docker system prune -a`
- Rebuild a imagem: `docker-compose up --build`

### Erro de roteamento SPA
- Verifique se o `nginx.conf` está sendo usado corretamente
- Teste localmente com `npm run preview`

## Suporte

Se encontrar problemas durante o deploy, verifique:
1. Todos os arquivos estão commitados no git
2. Node.js versão 18+ está sendo usada
3. Dependências estão atualizadas
4. Build local funciona com `npm run build` 