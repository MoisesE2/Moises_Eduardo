#!/bin/bash

# Script de Deploy - Portfólio Moisés Eduardo
# Autor: Assistente AI
# Data: $(date)

set -e  # Parar em caso de erro

echo "🚀 Iniciando processo de deploy..."

# Função para verificar se um comando existe
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ Erro: $1 não está instalado"
        exit 1
    fi
}

# Verificar dependências
echo "🔍 Verificando dependências..."
check_command "node"
check_command "npm"

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

# Limpar cache e node_modules
echo "🧹 Limpando cache..."
rm -rf node_modules
rm -rf dist
rm -rf .vite
npm cache clean --force

# Instalar dependências
echo "📦 Instalando dependências..."
npm ci

# Executar testes
echo "🧪 Executando testes..."
npm run test:ci

# Executar lint
echo "🔍 Verificando código com ESLint..."
npm run lint:check

# Verificar tipos TypeScript
echo "🔍 Verificando tipos TypeScript..."
npm run type-check

# Build da aplicação
echo "🏗️ Fazendo build da aplicação..."
npm run build:production

# Verificar se o build foi bem-sucedido
if [ ! -d "dist" ]; then
    echo "❌ Erro: Build falhou - diretório dist não foi criado"
    exit 1
fi

echo "✅ Build concluído com sucesso!"

# Opções de deploy
echo "
🎯 Escolha uma opção de deploy:
1) Docker (local)
2) Docker Compose (completo)
3) Apenas build (para upload manual)
4) Testar localmente
5) Cancelar
"

read -p "Escolha uma opção (1-5): " option

case $option in
    1)
        echo "🐳 Fazendo build do Docker..."
        docker build -t moises-portfolio .
        echo "✅ Imagem Docker criada: moises-portfolio"
        echo "Para executar: docker run -p 80:80 moises-portfolio"
        ;;
    2)
        echo "🐳 Executando com Docker Compose..."
        docker-compose up --build -d
        echo "✅ Aplicação rodando em http://localhost"
        ;;
    3)
        echo "📁 Arquivos prontos para upload no diretório: dist/"
        echo "✅ Faça upload dos arquivos da pasta dist/ para seu servidor"
        ;;
    4)
        echo "🧪 Testando aplicação localmente..."
        npm run preview &
        SERVER_PID=$!
        echo "✅ Aplicação rodando em http://localhost:4173"
        echo "Pressione Ctrl+C para parar o servidor"
        wait $SERVER_PID
        ;;
    5)
        echo "❌ Deploy cancelado"
        exit 0
        ;;
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac

echo "🎉 Deploy concluído com sucesso!" 