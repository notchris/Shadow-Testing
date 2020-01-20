import Phaser from 'phaser';
import * as THREE from 'three';
import CameraControls from 'camera-controls';

import Player from '../classes/Player';
import Platform from '../classes/Platform';
import World from '../classes/World';
import { tmx } from 'tmx-tiledmap';
import map from '../maps/TestA.tmx';

CameraControls.install( { THREE: THREE } );

export default class SceneA extends Phaser.Scene {
    constructor() {
        super({key: "SceneA"});
    }

    preload() {

    }

    init (data) {
        this.view = this.add.extern();

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.sys.game.canvas,
            context: this.sys.game.context,
            antialias: true
        });
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.autoClear = false;
        this.renderer.autoClearColor = false;
        this.renderer.setSize( 800, 600 );

        this.threeScene = new THREE.Scene();

        const fov = 180 * ( 2 * Math.atan( 600 / 2 / 800 ) ) / Math.PI;
        

        this.threeClock = new THREE.Clock();
        this.threeCamera = new THREE.PerspectiveCamera( fov, 800 / 600, 1, 10000 );
        this.threeCamera.position.set( 0.0, 0.0, 800 );

        this.cameraControls = new CameraControls( this.threeCamera, this.sys.game.canvas );

        // Shadow
        this.renderer.shadowMap.enabled = true;

    }

    create() {

        const platforms = [];
        const pivot = new THREE.Group();
        this.threeScene.add(pivot);
        tmx(map).then((data) => {
            
            const layers = data.layers;
            const platformObjects = layers.filter((layer) => layer.name === 'Platforms')[0].objects;
            const spawn = layers.filter((layer) => layer.name === 'Spawns')[0].objects[0];
            this.player = new Player(this, spawn.x, spawn.y, null, 0, this.threeScene, this.threeCamera);
            
            platformObjects.forEach((p) => {
                let platform = new Platform(this, p.x + (p.width/2), p.y + (p.height/2), null, 0, this.threeScene, this.threeCamera, p.width, p.height);
                platforms.push(platform);
                pivot.add(platform.obj);
            });

            this.physics.add.collider(platforms, this.player, (p,tile) => {}, null, this);

            this.cameras.main.startFollow(this.player);
            pivot.add(this.player.obj)
            this.threeScene.add(pivot);
            pivot.rotation.x += Math.PI;

            this.world = new World(this.threeScene, pivot);
            this.threeCamera.position.set( (this.player.x), -this.player.y, 800 );
            this.threeCamera.zoom = -0.5;
        });

        this.view.render = () => {
            this.render();
        }

    }

    render() {
        this.renderer.state.reset();
        if (this.world) {
            this.world.update();
            this.player.update();
            const delta = this.threeClock.getDelta();
            this.cameraControls.update( delta );
            //this.threeCamera.position.set( (this.player.x), -this.player.y, 800 );
            this.renderer.render(this.threeScene, this.threeCamera);
        }
    }
}
