import Phaser from 'phaser';
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    create() {
        // 로그인 화면은 기본 800x600 유지 (또는 복구)
        this.scale.resize(800, 600);

        this.add.text(400, 100, 'Micro RPG Login (RexUI)', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);

        // 배경 박스 (Graphics)
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 0.8);
        bg.fillRoundedRect(300, 180, 250, 250, 16);

        // ID Input
        const idInput = new InputText(this, 425, 230, 200, 40, {
            type: 'text',
            placeholder: 'ID',
            fontSize: '20px',
            backgroundColor: '#ffffff',
            color: '#000000',
            border: 1,
            borderColor: '#000000',
            paddingLeft: '10px'
        });
        this.add.existing(idInput);

        // Password Input
        const passwordInput = new InputText(this, 425, 290, 200, 40, {
            type: 'password',
            placeholder: 'Password',
            fontSize: '20px',
            backgroundColor: '#ffffff',
            color: '#000000',
            border: 1,
            borderColor: '#000000',
            paddingLeft: '10px'
        });
        this.add.existing(passwordInput);

        // Login Button (Phaser Text + Interactive)
        const loginButton = this.add.text(425, 360, 'Log In', {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#4CAF50',
            padding: { x: 20, y: 10 }
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                // 검증 없이 바로 이동
                console.log(`Login Attempt: ID=${idInput.text}`);
                this.scene.start('TownScene');
            })
            // 마우스 오버 효과
            .on('pointerover', () => loginButton.setStyle({ fill: '#ffff00' }))
            .on('pointerout', () => loginButton.setStyle({ fill: '#ffffff' }));
    }
}
