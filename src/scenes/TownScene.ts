import Phaser from 'phaser';
import { Player } from '../entities/Player';
import idleGui from '../assets/Samurai/Idle.png';
import walkGui from '../assets/Samurai/Walk.png';

export class TownScene extends Phaser.Scene {
    private player!: Player;

    constructor() {
        super('TownScene');
    }

    preload() {
        // 에셋 로드
        // 프레임 크기는 128x128로 가정합니다. (일반적인 무료 에셋 크기)
        this.load.spritesheet('samurai_idle', idleGui, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('samurai_walk', walkGui, { frameWidth: 128, frameHeight: 128 });
    }

    create() {
        // 씬 진입 시 해상도를 1200x800으로 변경
        this.scale.resize(1200, 800);

        // 애니메이션 생성
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('samurai_idle', { start: 0, end: 5 }), // 대략 6프레임 가정
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('samurai_walk', { start: 0, end: 7 }), // 8프레임 (0~7)
            frameRate: 10,
            repeat: -1
        });

        // 큰 월드 경계 생성
        this.physics.world.setBounds(0, 0, 2000, 2000);

        // 이동을 시각화하기 위한 간단한 배경 그리드 생성
        this.add.grid(1000, 1000, 2000, 2000, 32, 32, 0x000000, 1, 0x222222, 1);

        // 중앙에 플레이어 초기화 (samurai_idle 텍스처 사용)
        this.player = new Player(this, 1000, 1000, 'samurai_idle');

        // 카메라 설정
        this.cameras.main.setBounds(0, 0, 2000, 2000);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(1);

        // 마우스 우클릭 시 브라우저 메뉴가 뜨지 않게 방지
        this.input.mouse?.disableContextMenu();

        // 입력 처리
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (pointer.rightButtonDown()) {
                // 우클릭 이벤트: 차후 스프라이트 교체 로직 추가 예정
                console.log('Right click detected!');
                // 여기에 공격이나 스킬 사용 등의 로직을 넣을 수 있습니다.
            } else {
                // 좌클릭: 이동
                // 월드 좌표 가져오기 (카메라 고려)
                const worldPoint = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;

                // 클릭한 위치로 플레이어 이동
                this.player.travelTo(worldPoint.x, worldPoint.y);
            }
        });

        // 시각적 안내 텍스트 추가
        const text = this.add.text(10, 10, 'Town Scene', { font: '16px Arial', color: '#ffffff' });
        text.setScrollFactor(0); // 화면에 텍스트 고정
    }

    update() {
        if (this.player) {
            this.player.update();
        }
    }
}
