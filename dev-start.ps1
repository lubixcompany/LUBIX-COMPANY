# ─────────────────────────────────────
# LUBIX — Arranque local de desarrollo
# Uso: .\dev-start.ps1
# ─────────────────────────────────────

Write-Host "Levantando LUBIX (dev local)..." -ForegroundColor Cyan

# Backend — puerto 8001, PYTHONPATH correcto
Start-Process powershell -ArgumentList "-NoExit", "-Command", `
  "`$env:PYTHONPATH='$PSScriptRoot\backend'; " + `
  "Set-Location '$PSScriptRoot\backend'; " + `
  "Write-Host '[BACKEND] http://localhost:8001' -ForegroundColor Green; " + `
  "C:\Python314\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8001"

Start-Sleep -Seconds 2

# Frontend — puerto 5173
Start-Process powershell -ArgumentList "-NoExit", "-Command", `
  "Set-Location '$PSScriptRoot\frontend'; " + `
  "Write-Host '[FRONTEND] http://localhost:5173' -ForegroundColor Green; " + `
  "pnpm run dev"

Write-Host ""
Write-Host "Servidores iniciando..." -ForegroundColor Yellow
Write-Host "  Backend:  http://localhost:8001/docs" -ForegroundColor Green
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor Green
