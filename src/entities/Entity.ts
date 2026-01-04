import Phaser from 'phaser';

export abstract class Entity extends Phaser.GameObjects.Container {
    public sprite: Phaser.GameObjects.Sprite;
    protected speed: number;
    protected hp: number;
    protected maxHp: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, hp: number, speed: number) {
        super(scene, x, y);
        this.scene = scene;
        this.hp = hp;
        this.maxHp = hp;
        this.speed = speed;

        // 스프라이트 생성
        this.sprite = scene.add.sprite(0, 0, texture);
        this.sprite.setOrigin(0.5, 0.5); // 중심점 명시
        this.add(this.sprite);

        // 물리 바디 추가
        scene.physics.add.existing(this);
        const body = this.body as Phaser.Physics.Arcade.Body;

        // 바디 크기와 오프셋 직접 설정
        body.setSize(61, 86);
        body.setOffset(-30.5, -43); // (0,0)을 기준으로 좌상단으로 이동하여 중앙 정렬
        body.setCollideWorldBounds(true);

        // --- 디버그: 스프라이트 외곽선 그리기 (빨간색) ---
        const graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xff0000, 1);
        graphics.strokeRect(-64, -64, 128, 128);
        this.add(graphics);
        // ---------------------------------------------

        scene.add.existing(this);
    }

    // 공통 엔티티 메서드는 여기에 추가
    public takeDamage(amount: number): void {
        this.hp = Math.max(0, this.hp - amount);
        if (this.hp <= 0) {
            this.destroy();
        }
    }
}
