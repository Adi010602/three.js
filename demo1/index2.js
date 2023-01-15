import * as THREE from './node_modules/three/src/Three.js'; 
const canvas = document.querySelector("#glcanvas");
//creating a scene
const scene = new THREE.Scene();

//creating a camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
scene.add(camera);

//renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setClearColor(0x222222);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.render(scene, camera);

//adding box
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x781CE5 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = -2;