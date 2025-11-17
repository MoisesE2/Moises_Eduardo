# 🔧 Fix: Bad Gateway (502) no Dockploy

## 🐛 Problema

Após deploy bem-sucedido, o site retorna **502 Bad Gateway**.

## 🔍 Causa

O `nginx.conf` estava configurado para:
- Escutar na porta 443 (HTTPS)
- Usar certificados SSL que não existem no container
- Tentar redirecionar HTTP para HTTPS

O **Dockploy gerencia SSL através de um proxy reverso**, então o nginx dentro do container deve apenas escutar na porta 80 (HTTP).

## ✅ Solução Aplicada

O `nginx.conf` foi atualizado para:
- ✅ Escutar apenas na porta 80 (HTTP)
- ✅ Aceitar qualquer hostname (`server_name _`)
- ✅ Remover configurações SSL (gerenciadas pelo Dockploy)
- ✅ Manter todas as configurações de SPA, cache e segurança

## 🚀 Próximos Passos

### 1. Fazer Commit e Push

```bash
git add nginx.conf
git commit -m "Fix: nginx.conf para funcionar com Dockploy proxy reverso"
git push origin main
```

### 2. Fazer Redeploy no Dockploy

1. Acesse o painel do Dockploy
2. Vá em sua aplicação
3. Clique em **"Redeploy"** ou **"Deploy"**
4. Aguarde o build completar

### 3. Verificar

Após o redeploy, teste:
- http://gcodevs.com (deve funcionar)
- https://gcodevs.com (deve funcionar com SSL do Dockploy)

## 🔍 Se Ainda Não Funcionar

### Verificar Logs no Dockploy

1. No painel, vá em **Logs** da aplicação
2. Procure por erros do nginx
3. Verifique se o container está rodando

### Verificar Configuração do Domínio

1. No Dockploy, vá em **Domains**
2. Verifique se `gcodevs.com` e `www.gcodevs.com` estão configurados
3. Verifique se o SSL está habilitado

### Testar Container Localmente

```bash
# Build local
docker build -t teste .

# Rodar localmente
docker run -p 8080:80 teste

# Testar
curl http://localhost:8080
```

## 📝 Mudanças no nginx.conf

### Antes (não funcionava)
- Escutava na porta 443 com SSL
- Tentava usar certificados que não existem
- Redirecionava HTTP para HTTPS

### Depois (funciona)
- Escuta apenas na porta 80 (HTTP)
- Aceita qualquer hostname
- O Dockploy gerencia SSL externamente

## ✅ Checklist

- [ ] `nginx.conf` atualizado
- [ ] Commit e push realizados
- [ ] Redeploy feito no Dockploy
- [ ] Site acessível via HTTP
- [ ] Site acessível via HTTPS (gerenciado pelo Dockploy)
- [ ] SSL funcionando (cadeado verde)

---

**Nota**: O SSL será gerenciado automaticamente pelo Dockploy quando você configurar o domínio no painel.

