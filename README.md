# Super Mario

A Mario Bros-like platformer game built with HTML and TypeScript.

## Features

- Player movement: Left/right walking and jumping with gravity
- Platforms: Static platforms with collision detection
- Enemies: Basic patrol movement with collision detection
- Coins: Collectible items that increase your score
- Basic UI: Score and lives tracking
- Goal Flag: Reach it to complete the level

## Installation and Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the project:
   ```
   npm run build
   ```
   
   Alternatively, you can use the provided build script:
   ```
   ./build.sh
   ```
4. Run the game:
   - Option 1: Open `dist/index.html` directly in your browser
   - Option 2: Start the local development server:
     ```
     npm run serve
     ```
     This will automatically open the game in your default browser at http://localhost:8080

## Controls

- **Left Arrow**: Move left
- **Right Arrow**: Move right
- **Space**: Jump

## Development

To start development with automatic compilation:
```
npm start
```

## Project Structure

```
/src
  index.html – Game canvas and UI
  main.ts – Game loop, input handling
  player.ts – Player logic
  enemy.ts – Enemy logic
  level.ts – Level data and rendering
  assets/ – Sprites, sounds (placeholder)
```
