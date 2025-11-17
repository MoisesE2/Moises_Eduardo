# 🔒 Guia de Configuração DNS e SSL - gcodevs.com

## 📋 Problemas Identificados

1. **Bad Gateway**: O nginx estava configurado apenas para `localhost`, não reconhecia o domínio `gcodevs.com`
2. **Falta de HTTPS**: Não havia configuração SSL/HTTPS

## ✅ Soluções Implementadas

### 1. Configuração Nginx Atualizada

O arquivo `nginx.conf` foi atualizado para:
- ✅ Aceitar requisições do domínio `gcodevs.com` e `www.gcodevs.com`
- ✅ Redirecionar HTTP (porta 80) para HTTPS (porta 443)
- ✅ Configurar SSL/TLS com certificados Let's Encrypt
- ✅ Configurações de segurança modernas (HSTS, etc.)

### 2. Verificação DNS

Baseado na imagem que você compartilhou, vejo que você já tem:
- ✅ Registro **A** apontando para `72.50.51.85` (correto)
- ✅ Registro **CNAME** para `www` apontando para `goodevs.com` (verifique se está correto)

## 🔧 Passos para Configurar

### Passo 1: Verificar Configuração DNS

Na sua página de DNS, certifique-se de ter:

| Tipo | Nome | Conteúdo | TTL |
|------|------|----------|-----|
| **A** | @ | 72.50.51.85 | 300 |
| **CNAME** | www | gcodevs.com | 300 |

**⚠️ IMPORTANTE**: 
- O registro CNAME `www` deve apontar para `gcodevs.com` (não para `goodevs.com`)
- Se você vê `goodevs.com` no CNAME, **altere para `gcodevs.com`**

### Passo 2: Verificar se o Site está Acessível via IP

Antes de configurar SSL, teste se o site está funcionando:

```bash
# No seu servidor VPS, verifique se o nginx está rodando
sudo systemctl status nginx
# ou se estiver usando Docker:
docker ps
```

Teste acessando diretamente pelo IP:
- http://72.50.51.85

Se não funcionar, verifique:
1. Firewall permitindo portas 80 e 443
2. Nginx rodando corretamente
3. Docker container rodando (se usar Docker)

### Passo 3: Configurar SSL com Let's Encrypt

#### Opção A: Se o nginx está rodando diretamente na VPS (não Docker)

```bash
# 1. Instalar certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# 2. Parar nginx temporariamente
sudo systemctl stop nginx

# 3. Obter certificado SSL
sudo certbot certonly --standalone \
    -d gcodevs.com \
    -d www.gcodevs.com \
    --email seu-email@exemplo.com \
    --agree-tos \
    --non-interactive

# 4. Copiar o nginx.conf atualizado para o servidor
# (faça upload do arquivo nginx.conf atualizado)

# 5. Reiniciar nginx
sudo systemctl start nginx
sudo systemctl reload nginx
```

#### Opção B: Se está usando Docker

```bash
# 1. No servidor VPS, instale certbot
sudo apt-get update
sudo apt-get install -y certbot

# 2. Pare o container Docker temporariamente
docker-compose stop frontend

# 3. Obtenha o certificado
sudo certbot certonly --standalone \
    -d gcodevs.com \
    -d www.gcodevs.com \
    --email seu-email@exemplo.com \
    --agree-tos \
    --non-interactive

# 4. Atualize o docker-compose.yml para montar os certificados
# (veja instruções abaixo)

# 5. Reconstrua e inicie o container
docker-compose up -d --build
```

### Passo 4: Atualizar Docker Compose (se usar Docker)

Se você está usando Docker, precisa montar os certificados SSL no container:

```yaml
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
      - "443:443"  # Adicione esta linha
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - /etc/letsencrypt:/etc/letsencrypt:ro  # Montar certificados
      - /var/www/certbot:/var/www/certbot:ro  # Montar diretório de desafios
    depends_on:
      - api
    restart: unless-stopped
```

### Passo 5: Configurar Renovação Automática

O certificado Let's Encrypt expira em 90 dias. Configure renovação automática:

```bash
# Adicionar ao crontab
sudo crontab -e

# Adicionar esta linha (renova diariamente às 00:00 e 12:00)
0 0,12 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'
# ou para Docker:
0 0,12 * * * certbot renew --quiet --post-hook 'docker-compose restart frontend'
```

## 🧪 Testar Configuração

### 1. Testar DNS
```bash
# Verificar se o DNS está propagado
nslookup gcodevs.com
dig gcodevs.com

# Deve retornar: 72.50.51.85
```

### 2. Testar HTTP (deve redirecionar para HTTPS)
```bash
curl -I http://gcodevs.com
# Deve retornar: 301 Moved Permanently
```

### 3. Testar HTTPS
```bash
curl -I https://gcodevs.com
# Deve retornar: 200 OK
```

### 4. Verificar Certificado SSL
Acesse no navegador:
- https://gcodevs.com
- Verifique se aparece o cadeado verde 🔒

## 🔍 Troubleshooting

### Erro: "Bad Gateway"
**Causa**: Nginx não está reconhecendo o domínio

**Solução**:
1. Verifique se o `nginx.conf` tem `server_name gcodevs.com www.gcodevs.com;`
2. Reinicie o nginx: `sudo systemctl reload nginx`
3. Verifique logs: `sudo tail -f /var/log/nginx/error.log`

### Erro: "SSL certificate not found"
**Causa**: Certificados não foram gerados ou caminho incorreto

**Solução**:
1. Verifique se os certificados existem:
   ```bash
   sudo ls -la /etc/letsencrypt/live/gcodevs.com/
   ```
2. Se não existirem, execute o certbot novamente
3. Verifique se o caminho no `nginx.conf` está correto

### Erro: "Connection refused" na porta 443
**Causa**: Firewall bloqueando porta 443

**Solução**:
```bash
# Ubuntu/Debian
sudo ufw allow 443/tcp
sudo ufw reload

# Ou iptables
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

### Erro: "Domain validation failed"
**Causa**: DNS não está propagado ou apontando para IP errado

**Solução**:
1. Verifique se o DNS está correto: `nslookup gcodevs.com`
2. Aguarde propagação (pode levar até 48 horas, geralmente 1-2 horas)
3. Verifique se o IP está correto (72.50.51.85)

## 📝 Checklist Final

- [ ] DNS configurado corretamente (A record para 72.50.51.85)
- [ ] CNAME www apontando para gcodevs.com (não goodevs.com)
- [ ] Site acessível via IP (http://72.50.51.85)
- [ ] Nginx.conf atualizado com domínio correto
- [ ] Certificado SSL obtido com sucesso
- [ ] Nginx reiniciado e funcionando
- [ ] HTTPS funcionando (https://gcodevs.com)
- [ ] Renovação automática configurada
- [ ] Firewall permitindo portas 80 e 443

## 🆘 Precisa de Ajuda?

Se ainda tiver problemas:

1. **Verifique logs do nginx**:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

2. **Verifique status do nginx**:
   ```bash
   sudo nginx -t  # Testa configuração
   sudo systemctl status nginx
   ```

3. **Verifique certificados**:
   ```bash
   sudo certbot certificates
   ```

4. **Teste configuração DNS**:
   ```bash
   dig gcodevs.com
   nslookup gcodevs.com
   ```

## 📚 Recursos Úteis

- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Certbot User Guide](https://eff-certbot.readthedocs.io/)
- [Nginx SSL Configuration](https://nginx.org/en/docs/http/configuring_https_servers.html)

---

**Última atualização**: Configuração para gcodevs.com com SSL/HTTPS


