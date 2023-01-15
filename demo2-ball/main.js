import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';//creating scene
const scene = new THREE.Scene();

//sphere
const geometry = new THREE.SphereGeometry( 3,90,100 );
const material = new THREE.MeshStandardMaterial( { color: "#0000" } );
const sphere = new THREE.Mesh( geometry, material );
sphere.position.y+=10;
scene.add( sphere );

//cone
const geometry1 = new THREE.ConeGeometry( 5, 20, 100 );
const material1 = new THREE.MeshStandardMaterial( {color: "#FF0000"} );
const cone = new THREE.Mesh( geometry1, material1 );

scene.add( cone );


//size
const sizes = {width:window.innerWidth,
              height:window.innerHeight}

// light
// const light= new THREE.AmbientLight(0x404040 );
// light.position.set(5,20,1);
// scene.add(light);

// const light2= new THREE.PointLight(0xffffff,1,20);
// light2.position.x+=10;
// light2.position.y+=10;
// scene.add(light2);

// const directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
// scene.add( directionalLight );

// const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
// scene.add( light );

// const light = new THREE.PointLight( 0xff0000, 10, 100, 0 );
// light.position.set( 50, 50, 50 );
// scene.add( light );

// const width = 10;
// const height = 10;
// const intensity = 1;
// const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
// rectLight.position.set( 5, 5, 0 );
// rectLight.lookAt( 0, 0, 0 );
// scene.add( rectLight )


const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );


spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );


//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height ,0.1,100);
camera.position.z=30;
scene.add(camera);

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width,sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(2);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;
controls.autoRotate =true;
controls.autoRotateSpeed = 10;

//resize
window.addEventListener('resize', ()=>{
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;


//update camera
camera.aspect = sizes.width/sizes.height;
camera.updateProjectionMatrix();
renderer.setSize(sizes.width,sizes.height);
})

const loop = () =>{
  controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}
loop(); 