import Phaser from 'phaser';
import * as THREE from 'three';

export default class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, threeScene, threeCamera, wtest, htest) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.wtest = wtest;
        this.htest = htest;
        this.frame = frame;
        this.threeScene = threeScene;
        this.threeCamera = threeCamera;

        this.setTexture(texture);
        this.setPosition(x, y);
        scene.physics.world.enable(this); // necessary?
        scene.add.existing(this);
        this.body.setImmovable();
        this.body.allowGravity = false;
        this.body.setBounce(0, 0);
        this.body.width = this.wtest;
        this.body.height = this.htest;
        this.displayWidth = this.wtest;
        this.displayHeight = this.htest;
        this.alpha = 0;

        this.obj = null;
        if (this.threeScene) {
            this.load(this.threeScene);
        }
    }
    load(scene) {
        let cube = new THREE.Mesh(
            new THREE.BoxGeometry( this.wtest, this.htest, this.htest ),
            new THREE.MeshLambertMaterial({color: '#666666', side: THREE.DoubleSide})
        );
        cube.receiveShadow = true;
        cube.castShadow = true;
        this.obj = cube;
        this.obj.position.x = this.x;
        this.obj.position.y = this.y;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}