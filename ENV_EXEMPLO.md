# 📋 Exemplo Prático: Configurar ENV no Dockploy

## 🎯 Para seu Projeto Específico

Vejo que você tem uma API em `https://backend.gcodevs.com.br`. Vamos configurar isso como variável de ambiente!

## 🔧 Passo 1: Atualizar o Código (Opcional mas Recomendado)

Atualize `src/services/api.ts` para usar variável de ambiente:

```typescript
// Antes (hardcoded)
const API_BASE_URL = 'https://backend.gcodevs.com.br';

// Depois (usando env)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend.gcodevs.com.br';
```

## 📝 Passo 2: Configurar no Dockploy

### No Painel do Dockploy:

1. **Acesse sua aplicação**
2. **Vá em Settings → Environment Variables**
3. **Adicione estas variáveis**:

| Name | Value |
|------|-------|
| `NODE_ENV` | `production` |
| `VITE_API_URL` | `https://backend.gcodevs.com.br` |

4. **Salve e faça Redeploy**

## ✅ Configuração Mínima (Se não quiser mudar código)

Se você não quiser alterar o código agora, adicione apenas:

```
NODE_ENV=production
```

O código continuará funcionando com a URL hardcoded.

## 🚀 Configuração Completa (Recomendado)

### 1. Atualizar código para usar env
### 2. Adicionar variável no Dockploy
### 3. Fazer redeploy

Assim você terá flexibilidade para mudar a URL da API sem alterar código!

