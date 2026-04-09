@echo off
cd /d "%~dp0"
start "Servidor Senderos" cmd /k py -m http.server 5500
timeout /t 2 /nobreak >nul
start "" "http://localhost:5500/estudio_biblico_v5_fixed.html"
