export class Player {
    x: number;
    y: number;
    width: number = 32;
    height: number = 48;
    velocityX: number = 0;
    velocityY: number = 0;
    speed: number = 5;
    jumpPower: number = -15;
    gravity: number = 0.8;
    canJump: boolean = false;
    isInvulnerable: boolean = false;
    invulnerabilityTimer: number = 0;
    facingRight: boolean = true;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    update(): void {
        // Apply gravity
        this.velocityY += this.gravity;
        
        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Apply friction
        this.velocityX *= 0.9;
        
        // Update invulnerability
        if (this.isInvulnerable) {
            this.invulnerabilityTimer++;
            if (this.invulnerabilityTimer >= 60) {
                this.isInvulnerable = false;
                this.invulnerabilityTimer = 0;
            }
        }
    }

    moveLeft(): void {
        this.velocityX = -this.speed;
        this.facingRight = false;
    }

    moveRight(): void {
        this.velocityX = this.speed;
        this.facingRight = true;
    }

    jump(): void {
        if (this.canJump) {
            this.velocityY = this.jumpPower;
            this.canJump = false;
        }
    }

    land(platformY: number): void {
        // Only land if moving downward
        if (this.velocityY >= 0) {
            this.y = platformY - this.height;
            this.velocityY = 0;
            this.canJump = true;
        }
    }

    takeDamage(): void {
        if (!this.isInvulnerable) {
            this.isInvulnerable = true;
            this.invulnerabilityTimer = 0;
            
            // Knock back player
            this.velocityY = this.jumpPower / 2;
            this.velocityX = this.facingRight ? -8 : 8;
        }
    }

    bounceOnEnemy(): void {
        this.velocityY = this.jumpPower / 1.5;
        this.canJump = false;
    }

    checkPlatformCollision(platform: { x: number, y: number, width: number, height: number }): boolean {
        // Check if player is intersecting with platform
        return (
            this.x < platform.x + platform.width &&
            this.x + this.width > platform.x &&
            this.y + this.height >= platform.y &&
            this.y + this.height <= platform.y + platform.height &&
            this.y < platform.y
        );
    }

    checkCollision(entity: { x: number, y: number, width: number, height: number }): boolean {
        // Check if player is intersecting with entity
        return (
            this.x < entity.x + entity.width &&
            this.x + this.width > entity.x &&
            this.y < entity.y + entity.height &&
            this.y + this.height > entity.y
        );
    }

    render(context: CanvasRenderingContext2D): void {
        // Don't render if player is invulnerable and blinking
        if (this.isInvulnerable && this.invulnerabilityTimer % 6 < 3) {
            return;
        }
        
        // Draw player
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw face direction (eyes)
        context.fillStyle = 'white';
        if (this.facingRight) {
            context.fillRect(this.x + 20, this.y + 10, 8, 8);
        } else {
            context.fillRect(this.x + 4, this.y + 10, 8, 8);
        }
        
        // Draw mustache
        context.fillStyle = 'black';
        context.fillRect(this.x + 8, this.y + 25, 16, 3);
        
        // Draw cap
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, 10);
    }
}