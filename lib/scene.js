import * as THREE from 'three'
import {Light, Shape} from './threeD.js'

export class Scene extends THREE.Scene {
    constructor() {
        super()
        this.primitives = 0
        // this.moveBy = 0.05;
    }

    setMaterialProperties(material,ka,kd,ks){
        material.metalness = 0.2;
        material.emissive = new THREE.Color(0xffffff);
        material.aoMapIntensity = 0.3;
        material.emissiveIntensity = 0;
        material.lightMapIntensity = 0.3;
        material.flatShading = false;
    
        material.reflectivity = ka; // ambient
        material.roughness = kd; // diffuse
        // material.specular = new THREE.Color(`rgb(${ks}*255,${ks}*255,${ks}*255)`) // specular
    
    }

    addLight(lightID,pos) {
        let light = new Light(lightID,pos)
        this.add(light)

    }

}