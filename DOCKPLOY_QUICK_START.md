# ⚡ Deploy Rápido no Dockploy - Guia Resumido

## 🚀 Passos Rápidos

### 1. Instalar Dockploy na VPS

```bash
ssh root@seu-ip-vps
curl -fsSL https://get.dokploy.io | bash
```

### 2. Acessar Painel

```
http://seu-ip-vps:3000
```

### 3. Criar Aplicação

1. **New Application** → **Docker**
2. **Conectar Git** (GitHub/GitLab)
3. **Configurar**:
   - Dockerfile Path: `Dockerfile`
   - Build Context: `.`
   - Port: `80`

### 4. Configurar Domínio

1. **Domains** → Adicionar:
   - `gcodevs.com`
   - `www.gcodevs.com`
2. **Enable SSL** (automático)

### 5. Deploy

Clique em **Deploy** e aguarde!

## ✅ Verificações

- [ ] DNS apontando para IP da VPS
- [ ] Dockerfile na raiz do projeto
- [ ] nginx.conf configurado com domínio
- [ ] Repositório Git conectado

## 🔗 Links Úteis

- Guia completo: `DEPLOY_DOCKPLOY.md`
- Configuração DNS/SSL: `CONFIGURAR_DNS_SSL.md`

---

**Pronto!** 🎉

