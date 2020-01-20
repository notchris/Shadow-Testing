import Phaser from 'phaser';
import * as THREE from 'three';
import Controller from './Controller';

const clock = new THREE.Clock();
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, threeScene, threeCamera) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.speed = 160;
        this.x = x;
        this.y = y;
        this.frame = frame;
        this.threeScene = threeScene;
        this.threeCamera = threeCamera;
        this.setTexture(texture);
        this.setPosition(this.x, this.y);
        scene.physics.world.enable(this); // necessary?
        scene.add.existing(this);
        this.body.setBounce(0);
        this.body.width = 40;
        this.body.height = 40;
        this.displayWidth = 40;
        this.displayHeight = 40;
        this.alpha = 0;
        this.obj = null;
        if (this.threeScene) {
            this.load(this.threeScene);
        }
        this.controller = new Controller(this.scene);
        this.rotationY = 0;
    }
    load(scene) {
        let cube = new THREE.Mesh(
            new THREE.BoxGeometry( 40, 40, 40 ),
            new THREE.MeshLambertMaterial({
                color: '#CCCCCC'
            })
        );
        cube.castShadow = true;
        this.obj = cube;
    }

    controls() {
        // Vertical movement
        if (this.controller.up() && this.body.touching.down) {
            this.body.setVelocityY(-200);
        } else if (this.controller.down()) {
            // console.log('down');
        }
        // Horizontal movement
        if (this.controller.left()) {
            this.body.setVelocityX(-this.speed);
        } else if (this.controller.right()) {
            this.body.setVelocityX(this.speed);
        }
    }
    
    update() {
        this.body.setVelocityX(0);
        this.controls();
        if (this.obj) {
            this.obj.position.x = this.x;
            this.obj.position.y = this.y;
        }
    }
}