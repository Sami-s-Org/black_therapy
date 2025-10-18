#!/bin/bash

# Black Therapy Server Start Script

echo "🚀 Starting Black Therapy Server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  WARNING: .env file not found!"
    echo "Please create a .env file with your configuration."
    echo "See README.md for required environment variables."
    echo ""
    exit 1
fi

# Check if NODE_ENV is set
if [ -z "$NODE_ENV" ]; then
    echo "🔧 Running in development mode..."
    npm run dev
else
    echo "🔧 Running in $NODE_ENV mode..."
    npm start
fi

