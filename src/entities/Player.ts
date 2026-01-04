import Phaser from 'phaser';
import { Entity } from './Entity';

export class Player extends Entity {
    private targetPosition: Phaser.Math.Vector2 | null = null;
    private isMoving: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        // 플레이어 생성자에서 텍스처 키 전달, 체력 100, 속도 200
        super(scene, x, y, texture, 100, 200);
        // 초기 애니메이션
        this.sprite.play('idle');
    }

    public travelTo(x: number, y: number): void {
        this.targetPosition = new Phaser.Math.Vector2(x, y);
        this.isMoving = true;

        // 속도를 간단히 계산하거나 물리 moveTo 사용
        this.scene.physics.moveTo(this, x, y, this.speed);

        // 걷기 애니메이션
        this.sprite.play('walk', true);

        // 방향 전환 (왼쪽/오른쪽)
        if (x < this.x) {
            this.sprite.setFlipX(true);
        } else {
            this.sprite.setFlipX(false);
        }
    }

    public update(): void {
        if (this.isMoving && this.targetPosition) {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, this.targetPosition.x, this.targetPosition.y);

            // 충분히 가까워지면 멈춤 (예: 5픽셀 미만)
            if (distance < 5) {
                const body = this.body as Phaser.Physics.Arcade.Body;
                body.setVelocity(0);
                this.isMoving = false;
                this.targetPosition = null;

                // 멈추면 대기 애니메이션
                this.sprite.play('idle', true);
            }
        }
    }
}
