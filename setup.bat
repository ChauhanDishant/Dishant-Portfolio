@echo off
echo.
echo ============================================
echo Dishant Portfolio - Quick Setup Script
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js version:
node --version
echo.

REM Check if in correct directory
if not exist "package.json" (
    echo [ERROR] package.json not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed successfully!
echo.

echo Building project to verify setup...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed. Please check for errors above.
    pause
    exit /b 1
)

echo.
echo [OK] Build successful!
echo.

echo ================================================
echo Setup Complete! Your portfolio is ready!
echo ================================================
echo.
echo Next steps:
echo   1. Run 'npm run dev' to start the development server
echo   2. Open http://localhost:5173 in your browser
echo   3. Customize your portfolio (see SETUP_GUIDE.md)
echo.
echo Quick commands:
echo   npm run dev     - Start development server
echo   npm run build   - Build for production
echo   npm run preview - Preview production build
echo.
echo Happy coding!
echo.

pause
