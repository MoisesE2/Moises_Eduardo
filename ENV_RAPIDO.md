# ⚡ Configurar ENV no Dockploy - Guia Rápido

## 🎯 Passos Rápidos

### 1. No Painel do Dockploy

1. Acesse: **Sua Aplicação** → **Settings** → **Environment Variables**
2. Clique em **"Add Variable"** ou **"Adicionar"**
3. Adicione:

```
NODE_ENV = production
VITE_API_URL = https://backend.gcodevs.com.br
```

4. Clique em **Save**
5. Faça **Redeploy**

### 2. Pronto! ✅

As variáveis estarão disponíveis na aplicação.

## 📝 Variáveis Recomendadas

| Variável | Valor | Obrigatória |
|----------|-------|-------------|
| `NODE_ENV` | `production` | ✅ Sim |
| `VITE_API_URL` | `https://backend.gcodevs.com.br` | ⚠️ Se usar API |

## ⚠️ Importante

- Variáveis do **Vite** devem começar com `VITE_`
- Após adicionar variáveis, **sempre faça redeploy**
- Variáveis sensíveis **NÃO** devem ser commitadas no Git

## 📚 Guias Completos

- **Guia Completo**: `CONFIGURAR_ENV_DOCKPLOY.md`
- **Exemplo Prático**: `ENV_EXEMPLO.md`

---

**Dica**: Comece com apenas `NODE_ENV=production` se não precisar de outras variáveis!

