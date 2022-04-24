import * as THREE from 'three'
import { Camera, Scene, Renderer, Shape } from './lib/threeD.js';
import { OBJLoader } from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader.js';

// import structuredClone from "@ungap/structured-clone"

let camera = new Camera()
camera.position.z = 5;

let scene = new Scene()
let renderer = new Renderer()

renderer.setSize(window.innerWidth, window.innerHeight);
let canvas = renderer.domElement;
document.body.appendChild(canvas);

scene.background = new THREE.Color(0xe5e5e5);

let loader = new OBJLoader();


function loadMeshObj(file, objColor, scale = [1,1,1], pos, ka, kd, ks) {

    loader.load(
        // resource URL
        file,
        // called when resource is loaded
        function (object) {
            object.traverse(function (obj) {
                if (obj.isMesh) {
                    // obj.geometry.mergeVertices()
                    obj.material = new THREE.MeshLambertMaterial()
                    // console.log(Scene)
                    scene.setMaterialProperties(obj.material,ka,kd,ks)
                    obj.material.color.setHex(objColor);
                }
            });

            object.name = (scene.primitives + 3).toString();
            object.scale['x'] = scale[0]
            object.scale['y'] = scale[0]
            object.scale['z'] = scale[0]
            object.position['x'] = pos[0]
            object.position['y'] = pos[1]
            object.position['z'] = pos[2]
            
            scene.add(object)

            // let shape = new Shape()
            // object.copy(shape,true) 
            // console.log(shape)
            // scene.add(shape);

        },
    );
    scene.primitives += 1;
}

loadMeshObj('./objects/sphere.obj', 0x00ff00, [1,1,1],[-1,1,0],0.4,0.4,0.4);

// const clone = JSON.parse(JSON.stringify(camera))

let light = new THREE.AmbientLight(0xffffff)
light.name = "light"
scene.add(light)


function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();
