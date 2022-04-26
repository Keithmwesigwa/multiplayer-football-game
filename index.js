import * as THREE from 'three'
// import {TrackballControls} from 'three/examples/jsm/controls/OrbitControls';

import { OBJLoader } from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader.js';
import { Camera, Scene, Renderer, Shape } from './lib/threeD.js';
import { TrackballControls } from 'TrackballControls'
import { FirstPersonControls } from 'FirstPersonControls'
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
function loadMeshObj(file, name, objColor=0xffffff, ka=0.4, kd=0.4, ks=0.4, scale = [1,1,1], pos=[0,0,0], rotate=[1,1,1] , texture="NULL") {

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

            object.name = name;
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

loadMeshObj('./objects/football_field.obj', "field", 0x00ff00, 0.4,0.4,0.4, [0.4,0.4,0.4],[0,0,0],[Math.PI/2,Math.PI/2,0], grassTexture);
loadMeshObj('./objects/football_player.obj', "player_1", 0x00ffff, 0.4,0.4,0.4, [1,1,1],[-1,0,0],[1.5,1.5,0]);
loadMeshObj('./objects/football_player.obj', "player_2", 0x0000ff, 0.4,0.4,0.4, [1,1,1],[1,0,0],[1.5,-1.5,0]);
loadMeshObj('./objects/sphere.obj', "ball", 0xffffff, 0.4,0.4,0.4, [0.2,0.2,0.2],[0,0,0.22],[1.5,-1.5,0],soccerTexture);
loadMeshObj('./objects/goal.obj', "goal_1" , 0x000000, 0.4,0.4,0.4, [3.2,1,1],[11.4,-3.5,0.05],[Math.PI/2,Math.PI/2,0]);
loadMeshObj('./objects/goal.obj', "goal_2", 0x000000, 0.4,0.4,0.4, [3.2,1,1],[-11.2,-3.5,0.36],[-0,0,Math.PI/2]);

const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
const points = [];
points.push( new THREE.Vector3( 0, 0, 0 ) );
points.push( new THREE.Vector3( 0, 4, 0 ) );
points.push( new THREE.Vector3( 0, -4, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );
scene.add( line );

let offset = 0.7;

function getBall(player,ball) {
    let bbox = new THREE.Box3().setFromObject(player)
    // console.log(bbox)
    // console.log(ball.position)
    let pos = ball.position
    if(ball.parent != scene){
        pos = ball.parent.position
    }
    if (
        pos['x'] > bbox.min['x'] - offset &&
        pos['x'] < bbox.max['x'] + offset &&
        pos['y'] > bbox.min['y'] - offset &&
        pos['y'] < bbox.max['y'] + offset
        ) {
            player.add(ball)
        }
}

scene.addLight("l3")

const controls = new TrackballControls(camera, renderer.domElement)

let dictionary_keys = {};

function checkKeys()
{
    for (const [key_pressed, value] of Object.entries(dictionary_keys))
    {
        // console.log(key_pressed + " " + value);
        if(value == false)
            continue;

        /**
         * Player 1 controls
         */

        if(key_pressed == "a")
        {
            let s = scene.getObjectByName("player_1");
            s.position['x'] -= 0.05;
        }
        else if(key_pressed == "d")
        {
            let s = scene.getObjectByName("player_1");
            s.position['x'] += 0.05;
        }
        else if(key_pressed == "w")
        {
            let s = scene.getObjectByName("player_1");
            s.position['y'] += 0.05;
        }
        else if(key_pressed == "s")
        {
            let s = scene.getObjectByName("player_1");
            s.position['y'] -= 0.05;
        }
        else if (key_pressed == "q") {
            let p = scene.getObjectByName("player_1");
            let b = scene.getObjectByName("ball");
            getBall(p, b)
        }


        /**
         * Player 2 controls
         */

        else if(key_pressed == "ArrowLeft")
        {
            let s = scene.getObjectByName("player_2");
            s.position['x'] -= 0.05;
        }
        else if(key_pressed == "ArrowRight")
        {
            let s = scene.getObjectByName("player_2");
            s.position['x'] += 0.05;
        }
        else if(key_pressed == "ArrowUp")
        {
            let s = scene.getObjectByName("player_2");
            s.position['y'] += 0.05;
        }
        else if(key_pressed == "ArrowDown")
        {
            let s = scene.getObjectByName("player_2");
            s.position['y'] -= 0.05;
        }
        else if (key_pressed == "p") {
            let p = scene.getObjectByName("player_2");
            let b = scene.getObjectByName("ball");
            getBall(p, b)
        }
    }
}

let flag = 0;
let camera_player_1 = new Camera();
let camera_player_2 = new Camera();
let init = 0;

document.addEventListener('keydown', function (event)
{
    dictionary_keys[event.key] = true;
    if(init == 0)
    {
        init = 1;
        let p1 = scene.getObjectByName("player_1");
        let pos1 = p1.position;
        camera_player_1.position.x = pos1['x'];
        camera_player_1.position.y = pos1['y'];
        camera_player_1.position.z = pos1['z']+1.2;


        let la_1 = new THREE.Vector3(-0.8,0,1.2);
        camera_player_1.lookAt(la_1);

        const quaternion_1 = new THREE.Quaternion();
		quaternion_1.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), Math.PI/2);
		camera_player_1.applyQuaternion( quaternion_1 );

        let p2 = scene.getObjectByName("player_2");
        let pos2 = p2.position;
        camera_player_2.position.x = pos2['x'];
        camera_player_2.position.y = pos2['y'];
        camera_player_2.position.z = pos2['z']+1.2;

        let la_2 = new THREE.Vector3(-0.8,0,1.2);
        camera_player_2.lookAt(la_2);

        const quaternion_2 = new THREE.Quaternion();
		quaternion_2.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), Math.PI/2);
		camera_player_2.applyQuaternion( quaternion_2 );

    }
    
    if(event.key == 'b')
    {
        flag = 0;
    }
    else if(event.key == 'n')
    {
        flag = 1;
    }
    else if(event.key == 'm')
    {
        flag = 2;
    }
}, false);

document.addEventListener('keyup', function (event)
{
    dictionary_keys[event.key] = false;
}, false);

function animate() {
	requestAnimationFrame(animate);
    if(flag == 0)
    	renderer.render(scene, camera);
    else if(flag == 1)
        renderer.render(scene, camera_player_1);
    else
        renderer.render(scene, camera_player_2);
    controls.update();
    checkKeys();
}
animate();