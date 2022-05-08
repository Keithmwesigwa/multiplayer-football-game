import * as THREE from 'three'

export class Camera extends THREE.PerspectiveCamera {
    constructor() {
        super (75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }
}