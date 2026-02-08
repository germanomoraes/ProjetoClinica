@echo off
REM Script para instalar e rodar OdontoWise

echo.
echo ================================
echo   OdontoWise Setup Script
echo ================================
echo.

REM Instalar Backend
echo [1/4] Instalando dependencias do Backend...
cd /d "%~dp0backend"
call npm install
if errorlevel 1 (
    echo Erro ao instalar backend
    pause
    exit /b 1
)

REM Instalar Frontend
echo.
echo [2/4] Instalando dependencias do Frontend...
cd /d "%~dp0frontend"
call npm install
if errorlevel 1 (
    echo Erro ao instalar frontend
    pause
    exit /b 1
)

echo.
echo ================================
echo   Setup Completo!
echo ================================
echo.
echo Proximos passos:
echo.
echo [Terminal 1] Iniciar o Backend:
echo   cd backend
echo   npm run dev
echo.
echo [Terminal 2] Iniciar o Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Acesse: http://localhost:3000
echo.
pause
