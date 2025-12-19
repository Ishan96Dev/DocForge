@echo off
echo ====================================
echo DocForge Documentation Site
echo ====================================
echo.

cd docs-site

echo Checking if node_modules exists...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting documentation site...
echo.
echo Visit: http://localhost:5173/DocForge/
echo.
call npm run dev
