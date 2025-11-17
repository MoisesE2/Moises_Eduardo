# 🔐 Como Configurar Variáveis de Ambiente no Dockploy

## 📋 Visão Geral

No Dockploy, você pode configurar variáveis de ambiente de duas formas:
1. **No painel web** (recomendado)
2. **Via arquivo `.env`** (se suportado)

## 🚀 Método 1: Configurar no Painel do Dockploy (Recomendado)

### Passo a Passo

1. **Acesse sua aplicação no Dockploy**
   - Entre no painel: `http://seu-ip-vps:3000`
   - Selecione sua aplicação

2. **Vá para a seção "Environment Variables" ou "Variáveis de Ambiente"**
   - Geralmente está em: **Settings** → **Environment Variables**
   - Ou: **Config** → **Env Variables**

3. **Adicione as variáveis**
   - Clique em **"Add Variable"** ou **"Adicionar Variável"**
   - Preencha:
     - **Name**: Nome da variável (ex: `VITE_API_URL`)
     - **Value**: Valor da variável (ex: `https://api.gcodevs.com`)

4. **Salve e faça redeploy**
   - Clique em **"Save"** ou **"Salvar"**
   - Faça um **redeploy** da aplicação para aplicar as mudanças

## 📝 Variáveis de Ambiente Recomendadas

### Para Aplicação Vite/React

Como você está usando **Vite**, as variáveis de ambiente precisam começar com `VITE_` para serem expostas no frontend:

```env
# Ambiente
NODE_ENV=production

# API (se usar)
VITE_API_URL=https://api.gcodevs.com

# Outras configurações (se necessário)
VITE_APP_NAME=Portfólio Moisés Eduardo
VITE_APP_VERSION=1.0.0
```

### Exemplo no Painel Dockploy

| Name | Value |
|------|-------|
| `NODE_ENV` | `production` |
| `VITE_API_URL` | `https://api.gcodevs.com` |

## 🔧 Método 2: Arquivo .env (Se Suportado)

Alguns Dockploy suportam arquivo `.env` no repositório:

1. **Crie arquivo `.env.production`** na raiz do projeto:

```env
NODE_ENV=production
VITE_API_URL=https://api.gcodevs.com
```

2. **Adicione ao `.gitignore`** (se não quiser commitar):

```gitignore
.env
.env.local
.env.production
.env.development
```

3. **OU commite o arquivo** (se não tiver dados sensíveis)

## ⚠️ Importante: Variáveis Vite

### Regras para Vite

1. **Variáveis devem começar com `VITE_`** para serem acessíveis no frontend:
   ```typescript
   // ✅ Correto
   VITE_API_URL=https://api.gcodevs.com
   
   // ❌ Errado (não será exposta)
   API_URL=https://api.gcodevs.com
   ```

2. **Acessar no código**:
   ```typescript
   // No código TypeScript/React
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

3. **Variáveis sem `VITE_`** só funcionam no servidor (build time)

## 📋 Variáveis Comuns para seu Projeto

Baseado no seu código, estas são as variáveis que você pode precisar:

### Obrigatórias

```env
NODE_ENV=production
```

### Opcionais (se usar API externa)

```env
VITE_API_URL=https://api.gcodevs.com
```

### Para Debug (desenvolvimento)

```env
NODE_ENV=development
VITE_API_URL=http://localhost:3001
```

## 🎯 Configuração Específica para seu Projeto

### Se você NÃO usa API externa

Você só precisa de:

```env
NODE_ENV=production
```

### Se você usa API externa

Adicione também:

```env
NODE_ENV=production
VITE_API_URL=https://sua-api.com
```

## 🔍 Verificar se as Variáveis Estão Funcionando

### 1. No Código

Crie um arquivo de teste para verificar:

```typescript
// src/utils/env.ts
export const env = {
  NODE_ENV: import.meta.env.MODE,
  API_URL: import.meta.env.VITE_API_URL,
  // Adicione outras variáveis aqui
};

// Log apenas em desenvolvimento
if (import.meta.env.MODE === 'development') {
  console.log('Environment Variables:', env);
}
```

### 2. No Console do Navegador

No código, adicione temporariamente:

```typescript
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
```

**⚠️ CUIDADO**: Não faça log de variáveis sensíveis em produção!

## 🐳 Variáveis no Dockerfile

Se precisar de variáveis durante o **build** (não runtime), adicione no `Dockerfile`:

```dockerfile
# Build time
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Runtime (será sobrescrito pelo Dockploy)
ENV VITE_API_URL=""
```

## 📝 Exemplo Completo: Configuração no Dockploy

### Passo 1: No Painel

1. Acesse: **Aplicação** → **Settings** → **Environment Variables**
2. Adicione:

```
NODE_ENV = production
```

3. Clique em **Save**

### Passo 2: Redeploy

1. Vá em **Deploy** ou **Redeploy**
2. Aguarde o build completar
3. Verifique se está funcionando

### Passo 3: Verificar Logs

No painel do Dockploy, veja os logs para verificar se as variáveis foram aplicadas.

## 🔒 Variáveis Sensíveis (Segurança)

### ⚠️ NUNCA commite:

- Senhas
- Tokens de API
- Chaves secretas
- Credenciais de banco de dados

### ✅ Use o painel do Dockploy para:

- Configurar variáveis sensíveis
- Não commitar no Git
- Gerenciar de forma segura

## 🧪 Testar Localmente

Antes de fazer deploy, teste localmente:

### 1. Criar `.env.local`:

```env
NODE_ENV=development
VITE_API_URL=http://localhost:3001
```

### 2. Testar:

```bash
npm run dev
```

### 3. Verificar no console:

```typescript
console.log(import.meta.env.VITE_API_URL);
```

## 📚 Referências

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Dockploy Documentation](https://dokploy.com/docs) (verifique URL oficial)

## ✅ Checklist

- [ ] Variáveis configuradas no painel do Dockploy
- [ ] Variáveis começam com `VITE_` (se necessário no frontend)
- [ ] `NODE_ENV=production` configurado
- [ ] Redeploy realizado após adicionar variáveis
- [ ] Variáveis testadas e funcionando
- [ ] Variáveis sensíveis NÃO commitadas no Git

---

**Dica**: Comece com apenas `NODE_ENV=production`. Adicione outras variáveis conforme necessário!

