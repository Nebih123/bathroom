@echo off
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo GABIM: Node.js nuk eshte i instaluar ne kete kompjuter.
    echo Shkarkoje nga https://nodejs.org ^(versioni LTS^) dhe provo perseri.
    echo.
    pause
    exit /b 1
)

if not exist node_modules (
    echo Po instalohen paketat per here te pare, prit pak...
    call npm install
)

echo.
echo Duke nisur serverin... MOS E MBYLL dritaren e re qe do te hapet.
echo.

start "Banjo Status - MOS E MBYLL kete dritare" cmd /k "npm start"
timeout /t 3 /nobreak >nul
start http://localhost:3000

exit
