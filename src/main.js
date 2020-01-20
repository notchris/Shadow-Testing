import Phaser from 'phaser';
import './style.css';
import SceneA from "./scenes/SceneA.js";

const config = {
    type: Phaser.WEBGL,
    canvas: document.querySelector('#render'),
    antialias: true,
    antialiasGL: true,
    pixelArt: false,
    roundPixels: false,
    //disableContextMenu: true,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [SceneA],
};

const game = new Phaser.Game(config);