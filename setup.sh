#!/bin/bash

echo "🚀 Dishant Portfolio - Quick Setup Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

echo "🔧 Building project to verify setup..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check for errors above."
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""

echo "================================================"
echo "🎉 Setup Complete! Your portfolio is ready!"
echo "================================================"
echo ""
echo "Next steps:"
echo "  1. Run 'npm run dev' to start the development server"
echo "  2. Open http://localhost:5173 in your browser"
echo "  3. Customize your portfolio (see SETUP_GUIDE.md)"
echo ""
echo "Quick commands:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run preview - Preview production build"
echo ""
echo "Happy coding! 🚀"
