import { Camera, Scene, Renderer } from './lib/threeD.js';

let camera = new Camera()
let scene = new Scene()
let renderer = new Renderer()

renderer.setSize(window.innerWidth, window.innerHeight);
let canvas = renderer.domElement;
document.body.appendChild(canvas);
