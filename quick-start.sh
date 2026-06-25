#!/bin/bash

# 🚀 Script de Verificación y Ejecución LUBIX
# Uso: bash quick-start.sh

echo "================================================"
echo "🚀 LUBIX - Quick Start Script"
echo "================================================"
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar Docker
echo -e "${YELLOW}📦 Verificando Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker encontrado${NC}"

# Verificar Docker Compose
echo -e "${YELLOW}📦 Verificando Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker Compose encontrado${NC}"

# Verificar archivo .env
echo -e "${YELLOW}📋 Verificando archivo .env...${NC}"
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  backend/.env no encontrado${NC}"
    echo "   Crea este archivo con las variables necesarias"
else
    echo -e "${GREEN}✅ backend/.env existe${NC}"
fi

# Construir y ejecutar
echo ""
echo -e "${YELLOW}🔨 Construyendo y ejecutando containers...${NC}"
docker-compose up -d

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✅ ¡LUBIX está en ejecución!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo "📍 Accesos:"
echo "   • Frontend:  http://localhost:5173"
echo "   • Backend:   http://localhost:8001"
echo "   • MinIO:     http://localhost:9000"
echo "   • Postgres:  localhost:5434"
echo ""
echo "📊 Logs en vivo:"
echo "   docker-compose logs -f frontend"
echo "   docker-compose logs -f backend"
echo ""
echo "🛑 Detener servicios:"
echo "   docker-compose down"
echo ""
