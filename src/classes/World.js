import * as THREE from 'three';
const clock = new THREE.Clock();

export default class World {
    constructor(scene, pivot){
        this.scene = scene;
        this.pivot = pivot;
        this.create(scene, pivot);
    }
    create (scene, pivot) {
        // Ambient Light
        let ambientLight = new THREE.AmbientLight(0xEEEEEE, 0.3);
        scene.add(ambientLight);
        // Directional Light
        let light = new THREE.DirectionalLight( 0xffffff, 1);
        light.position.set( 0, 400, 0 );
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;  // default
        light.shadow.mapSize.height = 1024; // default
        light.shadow.camera.near = 1;    // default
        light.shadow.camera.far = 1000;     // default
        light.shadow.camera.left = -512;
        light.shadow.camera.right = 512;
        light.shadow.camera.top = -800;
        light.shadow.camera.bottom = 800;

        scene.add( light );

        let testobj = new THREE.Object3D();
        testobj.position.set(80, -20, 0);
        scene.add(testobj);
        light.target = testobj;

        let shadowCameraHelper = new THREE.CameraHelper(light.shadow.camera);
        shadowCameraHelper.visible = true;
        scene.add(shadowCameraHelper)
        

    }

    update() {
       let delta = clock.getDelta();
    }
}