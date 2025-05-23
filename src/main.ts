import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { Level } from './level.js';

// Game class
class Game {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private player: Player;
    private enemies: Enemy[] = [];
    private level: Level;
    private score: number = 0;
    private lives: number = 3;
    private keys: { [key: string]: boolean } = {};
    private animationFrameId: number = 0;
    private isGameOver: boolean = false;

    constructor() {
        // Initialize canvas
        this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
        
        // Create game objects
        this.level = new Level(this.canvas.width, this.canvas.height);
        this.player = new Player(50, 200);
        
        // Create enemies
        this.createEnemies();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start game loop
        this.gameLoop();
        
        // Update UI
        this.updateUI();
    }

    private createEnemies(): void {
        // Create some enemies at different positions
        this.enemies.push(new Enemy(300, 340, 200, 400));
        this.enemies.push(new Enemy(600, 340, 500, 700));
    }

    private setupEventListeners(): void {
        // Keyboard event listeners
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    private gameLoop(): void {
        // Clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update game state
        this.update();
        
        // Render game objects
        this.render();
        
        // Continue game loop
        if (!this.isGameOver) {
            this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    private update(): void {
        // Update player based on input
        if (this.keys['ArrowLeft']) {
            this.player.moveLeft();
        }
        if (this.keys['ArrowRight']) {
            this.player.moveRight();
        }
        if (this.keys['Space'] && this.player.canJump) {
            this.player.jump();
        }
        
        // Update player physics
        this.player.update();
        
        // Check platform collisions
        for (const platform of this.level.platforms) {
            if (this.player.checkPlatformCollision(platform)) {
                this.player.land(platform.y);
            }
        }
        
        // Keep player within canvas bounds
        if (this.player.x < 0) {
            this.player.x = 0;
        }
        if (this.player.x + this.player.width > this.canvas.width) {
            this.player.x = this.canvas.width - this.player.width;
        }
        
        // Update enemies
        for (const enemy of this.enemies) {
            enemy.update();
            
            // Check for collision with player
            if (this.player.checkCollision(enemy)) {
                // Check if player is jumping on enemy
                if (this.player.velocityY > 0 && this.player.y + this.player.height < enemy.y + enemy.height / 2) {
                    // Player defeats enemy
                    enemy.defeat();
                    this.player.bounceOnEnemy();
                    this.score += 100;
                    this.updateUI();
                } else if (!enemy.isDefeated) {
                    // Player takes damage
                    this.lives--;
                    this.updateUI();
                    this.player.takeDamage();
                    
                    if (this.lives <= 0) {
                        this.gameOver();
                    }
                }
            }
        }
        
        // Collect coins
        for (let i = 0; i < this.level.coins.length; i++) {
            const coin = this.level.coins[i];
            if (this.player.checkCollision(coin)) {
                this.level.coins.splice(i, 1);
                i--;
                this.score += 10;
                this.updateUI();
            }
        }
        
        // Check if player fell out of the world
        if (this.player.y > this.canvas.height) {
            this.lives--;
            this.updateUI();
            
            if (this.lives <= 0) {
                this.gameOver();
            } else {
                this.resetPlayerPosition();
            }
        }
        
        // Check if player reached the goal
        if (this.player.checkCollision(this.level.goalFlag)) {
            this.levelComplete();
        }
    }

    private render(): void {
        // Render level background
        this.level.renderBackground(this.context);
        
        // Render platforms
        this.level.renderPlatforms(this.context);
        
        // Render coins
        this.level.renderCoins(this.context);
        
        // Render goal flag
        this.level.renderGoalFlag(this.context);
        
        // Render enemies
        for (const enemy of this.enemies) {
            enemy.render(this.context);
        }
        
        // Render player
        this.player.render(this.context);
    }

    private updateUI(): void {
        const scoreElement = document.getElementById('score');
        const livesElement = document.getElementById('lives');
        
        if (scoreElement) {
            scoreElement.textContent = `SCORE: ${this.score}`;
        }
        
        if (livesElement) {
            livesElement.textContent = `LIVES: ${this.lives}`;
        }
    }

    private resetPlayerPosition(): void {
        this.player.x = 50;
        this.player.y = 200;
        this.player.velocityY = 0;
    }

    private gameOver(): void {
        this.isGameOver = true;
        cancelAnimationFrame(this.animationFrameId);
        
        // Display game over message
        this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.context.fillStyle = 'white';
        this.context.font = '48px Arial';
        this.context.textAlign = 'center';
        this.context.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
        
        this.context.font = '24px Arial';
        this.context.fillText('Press F5 to restart', this.canvas.width / 2, this.canvas.height / 2 + 50);
    }

    private levelComplete(): void {
        this.isGameOver = true;
        cancelAnimationFrame(this.animationFrameId);
        
        // Display level complete message
        this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.context.fillStyle = 'white';
        this.context.font = '48px Arial';
        this.context.textAlign = 'center';
        this.context.fillText('LEVEL COMPLETE!', this.canvas.width / 2, this.canvas.height / 2);
        
        this.context.font = '24px Arial';
        this.context.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 50);
        this.context.fillText('Press F5 to restart', this.canvas.width / 2, this.canvas.height / 2 + 90);
    }
}

// Initialize the game when the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    new Game();
});