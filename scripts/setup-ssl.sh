#!/bin/bash

# Script para configurar SSL com Let's Encrypt
# Domínio: gcodevs.com
# Autor: Assistente AI

set -e

DOMAIN="gcodevs.com"
EMAIL="seu-email@exemplo.com"  # ALTERE PARA SEU EMAIL

echo "🔒 Configurando SSL para $DOMAIN..."

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Por favor, execute como root (sudo)"
    exit 1
fi

# Verificar se certbot está instalado
if ! command -v certbot &> /dev/null; then
    echo "📦 Instalando certbot..."
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
fi

# Verificar se nginx está instalado
if ! command -v nginx &> /dev/null; then
    echo "❌ Nginx não está instalado. Instale primeiro."
    exit 1
fi

# Criar diretório para desafios do Let's Encrypt
mkdir -p /var/www/certbot

# Parar nginx temporariamente para obter certificado standalone
echo "🛑 Parando nginx temporariamente..."
systemctl stop nginx || docker-compose stop frontend || true

# Obter certificado SSL
echo "📜 Obtendo certificado SSL..."
certbot certonly --standalone \
    --preferred-challenges http \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --email $EMAIL \
    --agree-tos \
    --non-interactive \
    --expand

# Reiniciar nginx
echo "🔄 Reiniciando nginx..."
systemctl start nginx || docker-compose start frontend || true

# Configurar renovação automática
echo "⏰ Configurando renovação automática..."
(crontab -l 2>/dev/null; echo "0 0,12 * * * certbot renew --quiet --post-hook 'systemctl reload nginx || docker-compose restart frontend'") | crontab -

echo "✅ SSL configurado com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Verifique se o nginx.conf está configurado corretamente"
echo "2. Reinicie o nginx: sudo systemctl reload nginx"
echo "3. Teste o site: https://$DOMAIN"
echo ""
echo "🔍 Para verificar o certificado:"
echo "   certbot certificates"


