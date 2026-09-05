@echo off
cd /d "%~dp0"
start "" http://localhost:8731/
python -m http.server 8731
