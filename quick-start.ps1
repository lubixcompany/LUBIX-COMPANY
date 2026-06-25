# 🚀 LUBIX - Quick Start Script (PowerShell - Windows)
# Uso: .\quick-start.ps1

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🚀 LUBIX - Quick Start (Windows)" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Función para logging
function Log-Success { Write-Host $args -ForegroundColor Green }
function Log-Warning { Write-Host $args -ForegroundColor Yellow }
function Log-Error { Write-Host $args -ForegroundColor Red }

# Verificar Docker
Log-Warning "📦 Verificando Docker..."
try {
    $dockerVersion = docker --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Log-Success "✅ Docker encontrado: $dockerVersion"
    }
} catch {
    Log-Error "❌ Docker no está instalado"
    exit 1
}

# Verificar Docker Compose
Log-Warning "📦 Verificando Docker Compose..."
try {
    $composeVersion = docker-compose --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Log-Success "✅ Docker Compose encontrado: $composeVersion"
    }
} catch {
    Log-Error "❌ Docker Compose no está instalado"
    exit 1
}

# Verificar archivo .env
Log-Warning "📋 Verificando archivo .env..."
if (-Not (Test-Path "backend\.env")) {
    Log-Warning "⚠️  backend\.env no encontrado"
    Write-Host "   ℹ️  Crea este archivo con las variables necesarias"
} else {
    Log-Success "✅ backend\.env existe"
}

# Construir y ejecutar
Write-Host ""
Log-Warning "🔨 Construyendo y ejecutando containers..."
docker-compose up -d

Write-Host ""
Log-Success "================================================"
Log-Success "✅ ¡LUBIX está en ejecución!"
Log-Success "================================================"
Write-Host ""

Write-Host "📍 Accesos:"
Write-Host "   • Frontend:  http://localhost:5173"
Write-Host "   • Backend:   http://localhost:8001"
Write-Host "   • MinIO:     http://localhost:9000"
Write-Host "   • Postgres:  localhost:5434"
Write-Host ""

Write-Host "📊 Logs en vivo:"
Write-Host "   docker-compose logs -f frontend"
Write-Host "   docker-compose logs -f backend"
Write-Host ""

Write-Host "🛑 Detener servicios:"
Write-Host "   docker-compose down"
Write-Host ""

# Abrir navegador (opcional)
Log-Warning "💡 Abriendo Frontend en navegador en 3 segundos..."
Start-Sleep -Seconds 3
Start-Process "http://localhost:5173"
