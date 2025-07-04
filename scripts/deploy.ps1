# Script de Deploy - Portfólio Moisés Eduardo
# Autor: Assistente AI
# Data: $(Get-Date)

param(
    [string]$Option = ""
)

# Configurar para parar em caso de erro
$ErrorActionPreference = "Stop"

Write-Host "🚀 Iniciando processo de deploy..." -ForegroundColor Green

# Função para verificar se um comando existe
function Test-Command {
    param([string]$Command)
    
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Verificar dependências
Write-Host "🔍 Verificando dependências..." -ForegroundColor Yellow
if (-not (Test-Command "node")) {
    Write-Host "❌ Erro: Node.js não está instalado" -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "npm")) {
    Write-Host "❌ Erro: npm não está instalado" -ForegroundColor Red
    exit 1
}

# Verificar se estamos no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: package.json não encontrado. Execute este script na raiz do projeto." -ForegroundColor Red
    exit 1
}

# Limpar cache e node_modules
Write-Host "🧹 Limpando cache..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}
if (Test-Path ".vite") {
    Remove-Item -Recurse -Force ".vite"
}
npm cache clean --force

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm ci

# Executar testes
Write-Host "🧪 Executando testes..." -ForegroundColor Yellow
npm run test:ci

# Executar lint
Write-Host "🔍 Verificando código com ESLint..." -ForegroundColor Yellow
npm run lint:check

# Verificar tipos TypeScript
Write-Host "🔍 Verificando tipos TypeScript..." -ForegroundColor Yellow
npm run type-check

# Build da aplicação
Write-Host "🏗️ Fazendo build da aplicação..." -ForegroundColor Yellow
npm run build

# Verificar se o build foi bem-sucedido
if (-not (Test-Path "dist")) {
    Write-Host "❌ Erro: Build falhou - diretório dist não foi criado" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build concluído com sucesso!" -ForegroundColor Green

# Opções de deploy
if ($Option -eq "") {
    Write-Host ""
    Write-Host "🎯 Escolha uma opção de deploy:" -ForegroundColor Cyan
    Write-Host "1) Docker (local)" -ForegroundColor White
    Write-Host "2) Docker Compose (completo)" -ForegroundColor White
    Write-Host "3) Apenas build (para upload manual)" -ForegroundColor White
    Write-Host "4) Testar localmente" -ForegroundColor White
    Write-Host "5) Cancelar" -ForegroundColor White
    Write-Host ""
    
    $Option = Read-Host "Escolha uma opção (1-5)"
}

switch ($Option) {
    "1" {
        Write-Host "🐳 Fazendo build do Docker..." -ForegroundColor Yellow
        docker build -t moises-portfolio .
        Write-Host "✅ Imagem Docker criada: moises-portfolio" -ForegroundColor Green
        Write-Host "Para executar: docker run -p 80:80 moises-portfolio" -ForegroundColor Cyan
    }
    "2" {
        Write-Host "🐳 Executando com Docker Compose..." -ForegroundColor Yellow
        docker-compose up --build -d
        Write-Host "✅ Aplicação rodando em http://localhost" -ForegroundColor Green
    }
    "3" {
        Write-Host "📁 Arquivos prontos para upload no diretório: dist/" -ForegroundColor Yellow
        Write-Host "✅ Faça upload dos arquivos da pasta dist/ para seu servidor" -ForegroundColor Green
    }
    "4" {
        Write-Host "🧪 Testando aplicação localmente..." -ForegroundColor Yellow
        Start-Job -ScriptBlock { npm run preview }
        Write-Host "✅ Aplicação rodando em http://localhost:4173" -ForegroundColor Green
        Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Cyan
        npm run preview
    }
    "5" {
        Write-Host "❌ Deploy cancelado" -ForegroundColor Red
        exit 0
    }
    default {
        Write-Host "❌ Opção inválida" -ForegroundColor Red
        exit 1
    }
}

Write-Host "🎉 Deploy concluído com sucesso!" -ForegroundColor Green 