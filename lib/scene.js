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
    

    // loadMeshObj(file, objColor, scale = [1,1,1], pos, ka, kd, ks) {

    //     this.loader.load(
    //         // resource URL
    //         file,
    //         // called when resource is loaded
    //         function (object) {
    //             object.traverse(function (obj) {
    //                 if (obj.isMesh) {
    //                     // obj.geometry.mergeVertices()
    //                     obj.material = new THREE.MeshLambertMaterial()
    //                     // console.log(Scene)
    //                     Scene.setMaterialProperties(obj.material,ka,kd,ks)
    //                     obj.material.color.setHex(objColor);
    //                 }
    //             });
    
    //             object.name = (this.primitives + 3).toString();
    //             object.scale['x'] = scale[0]
    //             object.scale['y'] = scale[0]
    //             object.scale['z'] = scale[0]
    //             object.position['x'] = pos[0]
    //             object.position['y'] = pos[1]
    //             object.position['z'] = pos[2]
                
    //             let shape = new Shape()
    //             object.copy(shape,true) 
    //             this.add(shape);
    //         },
    //     );
    //     this.primitives += 1;
    // }

    addLight(lightID,pos) {
        let light = new Light(lightID,pos)
        this.add(light)

    }

}