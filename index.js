import * as THREE from 'three'
// import {TrackballControls} from 'three/examples/jsm/controls/OrbitControls';

import { OBJLoader } from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader.js';
import { Camera, Scene, Renderer, Shape } from './lib/threeD.js';
import { TrackballControls } from 'TrackballControls'
// import { TrackballControls } from './lib/trackball.js'
// import TrackballControls from 'https://cdn.jsdelivr.net/npm/three-trackballcontrols@0.0.8/index.min.js';
// import { TrackballControls } from 'https://unpkg.com/browse/three@0.92.0/examples/js/controls/TrackballControls.js';
// import TrackballControls from 'https://cdn.jsdelivr.net/npm/three-trackballcontrols@0.0.8/index.min.js';
// import structuredClone from "@ungap/structuredimport TrackballControls from 'https://cdn.jsdelivr.net/npm/three-trackballcontrols@0.0.8/index.min.js';-clone"

let camera = new Camera()
camera.position.z = 8;

let scene = new Scene()
let renderer = new Renderer()

renderer.setSize(window.innerWidth, window.innerHeight);
let canvas = renderer.domElement;
document.body.appendChild(canvas);

scene.background = new THREE.Color(0xe5e5e5);

let loader = new OBJLoader();
const textureLoader = new THREE.TextureLoader()
const grassTexture = textureLoader.load( "images/Stylized_Grass.jpg" );
const soccerTexture = textureLoader.load( "images/football.jpg" );
soccerTexture.flipY = true
soccerTexture.rotation =  -0.1
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
// soccerTexture.wrapS = THREE.RepeatWrapping;
// soccerTexture.wrapT = THREE.RepeatWrapping;
function loadMeshObj(file, objColor=0xffffff, ka=0.4, kd=0.4, ks=0.4, scale = [1,1,1], pos=[0,0,0], rotate=[1,1,1] , texture="NULL") {

    loader.load(
        // resource URL
        file,
        // called when resource is loaded
        function (object) {
            object.traverse(function (obj) {
                if (obj.isMesh) {
                    // obj.geometry.mergeVertices()
                    if(texture === "NULL"){
                        obj.material = new THREE.MeshLambertMaterial()
                    }
                    else{
                        obj.material = new THREE.MeshLambertMaterial(
                            {
                                map: texture
                            }
                        )
                    }
                    // console.log(Scene)
                    scene.setMaterialProperties(obj.material,ka,kd,ks)
                    obj.material.color.setHex(objColor);
                }
            });

            object.name = (scene.primitives).toString();
            object.position['x'] = pos[0]
            object.position['y'] = pos[1]
            object.position['z'] = pos[2]
            object.scale['x'] = scale[0]
            object.scale['y'] = scale[1]
            object.scale['z'] = scale[2]
            object.rotateX(rotate[0])
            object.rotateY(rotate[1])
            object.rotateZ(rotate[2])

            scene.add(object)
            scene.primitives += 1;
        },
    );
    // scene.primitives += 1;
}

// document.addEventListener('keydown', function (event) {
// 	console.log("Key pressed = ", event.key);
// 	if(event.key == "/") {
//         let s = scene.getObjectByName("3")
//         // s.position['x'] += 2
//         // console.log(s.position)
//         let shape = new Shape()
//         // s.position.set(1,1,0)
//         // console.log(s)
//         // scene.getObjectByName("3").copy(shape)
        // shape.position['x'] = s.position['x']
        // shape.position['y'] = s.position['y']
        // shape.position['z'] = s.position['z']
//         shape.name = s.name
//         shape.position['x'] = 1.5
//         shape.position['y'] = 1.5
//         shape.position['z'] = 1.5
//         // shape.scale['x'] = 100000000000
//         // shape.scale['y'] = 100000000000
//         // shape.scale['z'] = 100000000000
//         // shape.rotateX(-1.5)
//         scene.remove(scene.getObjectByName("3"))
//         console.log(shape)
//         scene.add(shape);
//         console.log(scene)
    
// 	}


// }, false);

loadMeshObj('./objects/football_field.obj', 0x00ff00, 0.4,0.4,0.4, [0.4,0.4,0.4],[0,0,0],[Math.PI/2,Math.PI/2,0], grassTexture);
loadMeshObj('./objects/football_player.obj', 0x0000ff, 0.4,0.4,0.4, [1,1,1],[1,0,0],[1.5,-1.5,0]);
loadMeshObj('./objects/football_player.obj', 0x0000ff, 0.4,0.4,0.4, [1,1,1],[-1,0,0],[1.5,1.5,0]);
loadMeshObj('./objects/sphere.obj', 0xffffff, 0.4,0.4,0.4, [0.2,0.2,0.2],[0,0,0.22],[1.5,-1.5,0],soccerTexture);

loadMeshObj('./objects/goal.obj', 0x000000, 0.4,0.4,0.4, [3.2,1,1],[11.4,-3.5,0.05],[Math.PI/2,Math.PI/2,0]);
loadMeshObj('./objects/goal.obj', 0x000000, 0.4,0.4,0.4, [3.2,1,1],[-11.2,-3.5,0.36],[-0,0,Math.PI/2]);
let s = scene.getObjectByName("3")

const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
const points = [];
points.push( new THREE.Vector3( 0, 0, 0 ) );
points.push( new THREE.Vector3( 0, 4, 0 ) );
points.push( new THREE.Vector3( 0, -4, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );
scene.add( line );

// loadMeshObj('./objects/player.obj', 0x00ff00, [0.5,0.5,0.5],[-1,1,0],0.4,0.4,0.4);

// const clone = JSON.parse(JSON.stringify(camera))

// let light = new THREE.AmbientLight(0xffffff)
// light.name = "light"
// scene.add(light)

scene.addLight("l3")

const controls = new TrackballControls(camera, renderer.domElement)
console.log(controls);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
    controls.update();
}
animate();
