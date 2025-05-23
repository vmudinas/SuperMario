export class Enemy {
    x: number;
    y: number;
    width: number = 32;
    height: number = 32;
    minX: number;
    maxX: number;
    speed: number = 2;
    direction: number = 1; // 1 for right, -1 for left
    isDefeated: boolean = false;
    defeatTimer: number = 0;

    constructor(x: number, y: number, minX: number, maxX: number) {
        this.x = x;
        this.y = y;
        this.minX = minX;
        this.maxX = maxX;
    }

    update(): void {
        if (this.isDefeated) {
            this.defeatTimer++;
            if (this.defeatTimer >= 30) {
                // Make enemy fall off screen when defeated
                this.y += 5;
            }
            return;
        }
        
        // Move horizontally
        this.x += this.speed * this.direction;
        
        // Change direction if reaching boundary
        if (this.x <= this.minX) {
            this.x = this.minX;
            this.direction = 1;
        } else if (this.x + this.width >= this.maxX) {
            this.x = this.maxX - this.width;
            this.direction = -1;
        }
    }

    defeat(): void {
        this.isDefeated = true;
        this.defeatTimer = 0;
        // Flip upside down when defeated
        this.height = 16;
        this.y += 16;
    }

    render(context: CanvasRenderingContext2D): void {
        if (this.y > 600) {
            return; // Don't render if fallen off screen
        }
        
        // Draw enemy
        context.fillStyle = this.isDefeated ? '#888' : '#8B4513'; // Brown color, gray when defeated
        
        // Draw a rounded rectangle for the enemy body
        if (this.isDefeated) {
            // Draw flipped enemy
            context.fillRect(this.x, this.y, this.width, this.height);
        } else {
            // Draw normal enemy
            context.fillRect(this.x, this.y, this.width, this.height);
            
            // Draw eyes
            context.fillStyle = 'white';
            if (this.direction === 1) {
                context.fillRect(this.x + 20, this.y + 8, 8, 8);
            } else {
                context.fillRect(this.x + 4, this.y + 8, 8, 8);
            }
            
            // Draw feet
            context.fillStyle = '#654321';
            context.fillRect(this.x + 2, this.y + this.height - 6, 12, 6);
            context.fillRect(this.x + this.width - 14, this.y + this.height - 6, 12, 6);
        }
    }
}