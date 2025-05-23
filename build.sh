#!/bin/bash

# Build TypeScript files
npx tsc

# Create a dist directory if it doesn't exist
mkdir -p dist

# Copy HTML file to dist directory
cp src/index.html dist/

echo "Build complete! Open dist/index.html in your browser to play the game."