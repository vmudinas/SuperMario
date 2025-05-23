// Platform interface
interface Platform {
    x: number;
    y: number;
    width: number;
    height: number;
}

// Coin interface
interface Coin {
    x: number;
    y: number;
    width: number;
    height: number;
}

// Goal flag interface
interface GoalFlag {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Level {
    platforms: Platform[] = [];
    coins: Coin[] = [];
    goalFlag: GoalFlag;
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        
        // Initialize platforms, coins, and goal
        this.createPlatforms();
        this.createCoins();
        this.createGoalFlag();
    }

    private createPlatforms(): void {
        // Ground
        this.platforms.push({
            x: 0,
            y: 400,
            width: 800,
            height: 80
        });
        
        // Platforms
        this.platforms.push({
            x: 200,
            y: 300,
            width: 100,
            height: 20
        });
        
        this.platforms.push({
            x: 400,
            y: 250,
            width: 100,
            height: 20
        });
        
        this.platforms.push({
            x: 600,
            y: 300,
            width: 100,
            height: 20
        });
        
        this.platforms.push({
            x: 300,
            y: 180,
            width: 80,
            height: 20
        });
    }

    private createCoins(): void {
        // Place coins on platforms
        this.coins.push({ x: 230, y: 270, width: 20, height: 20 });
        this.coins.push({ x: 260, y: 270, width: 20, height: 20 });
        this.coins.push({ x: 430, y: 220, width: 20, height: 20 });
        this.coins.push({ x: 460, y: 220, width: 20, height: 20 });
        this.coins.push({ x: 630, y: 270, width: 20, height: 20 });
        this.coins.push({ x: 660, y: 270, width: 20, height: 20 });
        this.coins.push({ x: 330, y: 150, width: 20, height: 20 });
        
        // Place coins on ground
        for (let i = 0; i < 5; i++) {
            this.coins.push({ x: 100 + i * 40, y: 360, width: 20, height: 20 });
        }
    }

    private createGoalFlag(): void {
        // Create goal flag at the end of level
        this.goalFlag = {
            x: 750,
            y: 300,
            width: 30,
            height: 100
        };
    }

    renderBackground(context: CanvasRenderingContext2D): void {
        // Draw sky
        context.fillStyle = '#6b88fe';
        context.fillRect(0, 0, this.width, this.height);
        
        // Draw clouds
        context.fillStyle = 'white';
        // Cloud 1
        this.drawCloud(context, 100, 80, 70, 30);
        // Cloud 2
        this.drawCloud(context, 300, 60, 80, 40);
        // Cloud 3
        this.drawCloud(context, 600, 100, 60, 30);
        
        // Draw hills
        context.fillStyle = '#75c443';
        // Hill 1
        this.drawHill(context, 150, 400, 200, 150);
        // Hill 2
        this.drawHill(context, 450, 400, 300, 200);
    }

    renderPlatforms(context: CanvasRenderingContext2D): void {
        context.fillStyle = '#ba906d'; // Brown color for platforms
        
        for (const platform of this.platforms) {
            context.fillRect(platform.x, platform.y, platform.width, platform.height);
            
            // Draw platform top edge
            context.fillStyle = '#edb078';
            context.fillRect(platform.x, platform.y, platform.width, 5);
            
            // Reset fill style for next platform
            context.fillStyle = '#ba906d';
        }
    }

    renderCoins(context: CanvasRenderingContext2D): void {
        for (const coin of this.coins) {
            // Draw coin
            context.fillStyle = 'gold';
            context.beginPath();
            context.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2);
            context.fill();
            
            // Draw coin inner detail
            context.fillStyle = '#ffd700';
            context.beginPath();
            context.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 4, 0, Math.PI * 2);
            context.fill();
        }
    }

    renderGoalFlag(context: CanvasRenderingContext2D): void {
        // Draw flag pole
        context.fillStyle = '#8b4513';
        context.fillRect(this.goalFlag.x, this.goalFlag.y, 5, this.goalFlag.height);
        
        // Draw flag
        context.fillStyle = 'green';
        context.beginPath();
        context.moveTo(this.goalFlag.x + 5, this.goalFlag.y);
        context.lineTo(this.goalFlag.x + 5, this.goalFlag.y + 40);
        context.lineTo(this.goalFlag.x + 30, this.goalFlag.y + 20);
        context.closePath();
        context.fill();
    }

    private drawCloud(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        context.beginPath();
        context.arc(x, y, height, 0, Math.PI * 2);
        context.arc(x + width / 3, y - height / 2, height, 0, Math.PI * 2);
        context.arc(x + width / 1.5, y, height * 1.2, 0, Math.PI * 2);
        context.arc(x + width, y, height, 0, Math.PI * 2);
        context.fill();
    }

    private drawHill(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        context.beginPath();
        context.moveTo(x - width / 2, y);
        context.lineTo(x + width / 2, y);
        context.lineTo(x, y - height);
        context.closePath();
        context.fill();
    }
}