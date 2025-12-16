# DocForge Development Server Launcher
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Starting DocForge Dev Servers" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "[1/2] Starting Backend Server..." -ForegroundColor Yellow
$backendPath = Join-Path $PSScriptRoot "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; .\venv\Scripts\activate; Write-Host 'Backend Server Starting...' -ForegroundColor Green; python start.py"

# Wait a bit for backend to start
Write-Host "Waiting for backend to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "[2/2] Starting Frontend Server..." -ForegroundColor Yellow
$frontendPath = Join-Path $PSScriptRoot "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Frontend Server Starting...' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Servers Started!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:8000" -ForegroundColor White
Write-Host "Frontend: http://localhost:3001" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
