# 🚀 Guia de Deploy no Dockploy (Dokploy) - gcodevs.com

## 📋 O que é Dockploy?

Dockploy (ou Dokploy) é uma plataforma moderna de deploy que facilita o deploy de aplicações Docker em VPS, oferecendo:
- ✅ Deploy automático via Git
- ✅ SSL automático com Let's Encrypt
- ✅ CI/CD integrado
- ✅ Gerenciamento de domínios
- ✅ Interface web intuitiva

## 🔧 Pré-requisitos

1. **VPS com Docker instalado**
2. **Domínio configurado** (gcodevs.com)
3. **Repositório Git** (GitHub, GitLab, etc.)
4. **Acesso SSH à VPS**

## 📝 Passo a Passo

### Passo 1: Instalar Dockploy na VPS

Conecte-se à sua VPS via SSH:

```bash
ssh root@seu-ip-vps
# ou
ssh usuario@seu-ip-vps
```

Instale o Dockploy:

```bash
curl -fsSL https://get.dokploy.io | bash
```

**Nota**: O comando pode variar. Verifique a documentação oficial do Dockploy para o comando correto de instalação.

### Passo 2: Acessar o Painel do Dockploy

Após a instalação, acesse o painel web:

```
http://seu-ip-vps:3000
```

Ou se configurou um domínio:

```
http://dokploy.gcodevs.com:3000
```

### Passo 3: Configurar Aplicação no Dockploy

1. **Criar Nova Aplicação**
   - No painel, clique em "New Application" ou "Nova Aplicação"
   - Escolha "Docker" como tipo de aplicação

2. **Conectar Repositório Git**
   - Conecte seu repositório GitHub/GitLab
   - Autorize o acesso
   - Selecione o branch (geralmente `main` ou `master`)

3. **Configurar Build**
   - **Dockerfile Path**: `Dockerfile` (já está na raiz)
   - **Build Context**: `.` (raiz do projeto)
   - **Docker Image Name**: `moises-portfolio` (ou qualquer nome)

4. **Configurar Portas**
   - **Porta do Container**: `80`
   - **Porta Pública**: `80` (HTTP)
   - **Porta Pública**: `443` (HTTPS - será configurado automaticamente)

### Passo 4: Configurar Domínio e SSL

1. **Adicionar Domínio**
   - No painel da aplicação, vá em "Domains" ou "Domínios"
   - Adicione: `gcodevs.com`
   - Adicione: `www.gcodevs.com`

2. **Configurar SSL Automático**
   - O Dockploy geralmente oferece SSL automático via Let's Encrypt
   - Ative a opção "Enable SSL" ou "Habilitar SSL"
   - O certificado será gerado automaticamente

### Passo 5: Variáveis de Ambiente (Opcional)

Se necessário, configure variáveis de ambiente no painel:

```
NODE_ENV=production
```

### Passo 6: Fazer Deploy

1. **Deploy Manual**
   - Clique em "Deploy" ou "Fazer Deploy"
   - O Dockploy irá:
     - Fazer pull do código do Git
     - Build da imagem Docker
     - Iniciar o container

2. **Deploy Automático (CI/CD)**
   - Configure webhook no GitHub/GitLab
   - A cada push no branch principal, o deploy será automático

## 🔍 Verificações Importantes

### 1. Verificar Dockerfile

Certifique-se de que o `Dockerfile` está correto:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:production

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Verificar nginx.conf

**IMPORTANTE**: O Dockploy geralmente gerencia SSL através de um proxy reverso. Você tem duas opções:

**Opção A: Usar nginx.conf com SSL (recomendado se Dockploy não gerencia SSL)**
- Use o `nginx.conf` atual que já está configurado para SSL
- Certifique-se de que os certificados estão montados no container

**Opção B: Usar nginx.conf sem SSL (se Dockploy gerencia SSL)**
- Use o `nginx.conf.temp` que funciona apenas com HTTP
- O Dockploy fará o proxy reverso e gerenciará o SSL

Para testar, comece com `nginx.conf.temp` e depois migre para `nginx.conf` completo se necessário.

O `nginx.conf` deve estar configurado para o domínio:

```nginx
server_name gcodevs.com www.gcodevs.com;
```

### 3. Verificar DNS

Na sua página de DNS, certifique-se de ter:

| Tipo | Nome | Conteúdo | TTL |
|------|------|----------|-----|
| **A** | @ | IP_DA_VPS | 300 |
| **CNAME** | www | gcodevs.com | 300 |

## 🐳 Configuração Alternativa: Docker Compose no Dockploy

Se o Dockploy suportar docker-compose, você pode usar o `docker-compose.yml`:

1. No painel, escolha "Docker Compose" como tipo
2. Cole o conteúdo do `docker-compose.yml`
3. Ajuste as portas conforme necessário

## 🔧 Configurações Avançadas

### Health Check

Configure um health check no Dockploy:

- **Path**: `/`
- **Port**: `80`
- **Interval**: `30s`

### Recursos (Resources)

Configure limites de recursos:

- **CPU**: 0.5 - 1.0 cores
- **RAM**: 512MB - 1GB

### Restart Policy

Configure política de reinicialização:

- **Policy**: `unless-stopped` ou `always`

## 🧪 Testar Deploy

Após o deploy, teste:

1. **HTTP**: http://gcodevs.com (deve redirecionar para HTTPS)
2. **HTTPS**: https://gcodevs.com (deve funcionar com cadeado verde)
3. **WWW**: https://www.gcodevs.com

## 🔍 Troubleshooting

### Erro: "Build Failed"

**Causa**: Erro no build do Docker

**Solução**:
1. Verifique os logs no painel do Dockploy
2. Teste o build localmente: `docker build -t teste .`
3. Verifique se todas as dependências estão no `package.json`

### Erro: "Bad Gateway"

**Causa**: Nginx não está reconhecendo o domínio

**Solução**:
1. Verifique se o `nginx.conf` tem `server_name gcodevs.com www.gcodevs.com;`
2. Verifique logs: `docker logs <container-id>`
3. Reinicie a aplicação no painel

### Erro: "SSL Certificate Failed"

**Causa**: Problema na validação do Let's Encrypt

**Solução**:
1. Verifique se o DNS está propagado: `nslookup gcodevs.com`
2. Verifique se a porta 80 está acessível
3. Tente gerar o certificado novamente no painel

### Erro: "Port Already in Use"

**Causa**: Porta 80 ou 443 já está em uso

**Solução**:
1. Verifique processos: `netstat -tulpn | grep :80`
2. Pare outros serviços usando essas portas
3. Ou configure o Dockploy para usar outras portas

## 📊 Monitoramento

### Logs

Acesse os logs da aplicação no painel do Dockploy:
- **Logs em Tempo Real**: Veja logs ao vivo
- **Logs Históricos**: Veja logs anteriores

### Métricas

Monitore:
- **CPU Usage**: Uso de CPU
- **Memory Usage**: Uso de memória
- **Network**: Tráfego de rede

## 🔄 Atualizar Aplicação

### Atualização Manual

1. No painel, clique em "Redeploy" ou "Reimplantar"
2. Ou faça push para o branch principal (se CI/CD estiver ativo)

### Atualização Automática

Configure webhook no GitHub/GitLab para deploy automático a cada push.

## 📝 Checklist Final

- [ ] Dockploy instalado na VPS
- [ ] Painel acessível
- [ ] Repositório Git conectado
- [ ] Aplicação criada no Dockploy
- [ ] Dockerfile configurado corretamente
- [ ] nginx.conf atualizado com domínio
- [ ] Domínio adicionado no Dockploy
- [ ] SSL configurado e funcionando
- [ ] DNS configurado corretamente
- [ ] Deploy realizado com sucesso
- [ ] Site acessível via HTTPS
- [ ] CI/CD configurado (opcional)

## 🆘 Precisa de Ajuda?

### Logs Úteis

```bash
# No servidor VPS, verificar containers Docker
docker ps
docker logs <container-id>

# Verificar nginx
docker exec -it <container-id> nginx -t
```

### Comandos Úteis

```bash
# Reiniciar aplicação
# (Faça pelo painel do Dockploy)

# Verificar status
docker ps | grep moises-portfolio

# Ver logs
docker logs -f <container-id>
```

## 📚 Recursos

- [Documentação Dockploy/Dokploy](https://dokploy.com/docs) (verifique URL oficial)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

**Última atualização**: Guia de deploy no Dockploy para gcodevs.com

