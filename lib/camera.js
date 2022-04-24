import * as THREE from 'three'

export class Camera extends THREE.PerspectiveCamera {
    constructor() {
        super (75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }
}

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;