@echo off
REM Black Therapy Server Start Script for Windows

echo Starting Black Therapy Server...
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Check if .env file exists
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please create a .env file with your configuration.
    echo See README.md for required environment variables.
    echo.
    exit /b 1
)

REM Start the server in development mode
echo Running in development mode...
call npm run dev

