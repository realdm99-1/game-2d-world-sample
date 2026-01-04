import Phaser from 'phaser';
import { MainScene } from './scenes/MainScene';
import { TownScene } from './scenes/TownScene';
import './style.css';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  dom: {
    createContainer: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 0 }, // 탑다운 시점, 중력 없음
      debug: true // 디버그 켜기 (충돌 박스 확인)
    }
  },
  scene: [MainScene, TownScene]
};

new Phaser.Game(config);
