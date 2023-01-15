import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { AlwaysStencilFunc, Box2, Box3, DirectionalLight, SpotLightHelper, Vector4 } from 'three';
import{GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'; 
import earth from './src/img/original.jpg';
import stars from './src/img/star-pattern-white-background-gold-gift-wrap-vector-20510302.jpg';
 
const house = new URL('./src/untitled.glb', import.meta.url);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth/innerHeight,
  0.1, 
  1000
  );
  camera.position.set(0,2,5);
  camera.position.z =5;
  const canvas = document.querySelector(".webgl");
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.shadowMap.enabled = true;
  renderer.setSize( window.innerWidth,window.innerHeight);
  
  //scene/object control on mouse
  const orbit = new OrbitControls( camera, renderer.domElement );
  orbit.update();
////////////geometry adding
//box adding
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const boxgeometry = new THREE.BoxGeometry( 1, 1, 1 );
const boxmaterial = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
const box2 = new THREE.Mesh( boxgeometry, boxmaterial );
scene.add( box2 );
box2.position.set(5,1,1);

//plane2
const plane2geometry = new THREE.PlaneGeometry( 10, 10, 10 ,10 , 10 , 10 );
const plane2material = new THREE.MeshBasicMaterial( {
  color: 0xFFFFFF,
  wireframe:true} );
const plane2 = new THREE.Mesh(plane2geometry, plane2material);
scene.add(plane2);
plane2.position.set(10,10,15);

//sphere adding
const spheregeometry = new THREE.SphereGeometry( 0.5 );
const spherematerial = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
const sphere = new THREE.Mesh( spheregeometry, spherematerial );
scene.add( sphere );
sphere.position.set(2,1,1);
sphere.castShadow = true;


//plane adding
const planegeometry = new THREE.PlaneGeometry( 10, 10 );
const planematerial = new THREE.MeshStandardMaterial( {
  color: 0xFFFFFF,
  side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planegeometry, planematerial );
scene.add( plane );
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;




// //shader geometry
// const sphere2geometry = new THREE.SphereGeometry(4);
// const vShader = `
//   void main(){
//     gl_Position = projectionMatrix * modelViewMatrix * Vector4(position, 1.0);
//   }
//   `;

//   const fShader = `
//   void main(){
//     gl_FragColor = vec4(0.5 , 1.0, 1.0);
//   }`;
// const sphere2material = new THREE.ShaderMaterial({
//   vertexShader : vShader,
//   fragmentShader : fShader
// });
// const sphere2 = new THREE.Mesh(sphere2geometry, sphere2material);
// scene.add(sphere2);
// sphere2.position.set(-5,10,10);

//importing blender file
const assetLoader = new GLTFLoader();
assetLoader.load(house.href, function(gltf){
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12, 4,10);

}, undefined, function(error){
  console.error(error);
});

//grid
const gridHelper = new THREE.GridHelper(10);
scene.add(gridHelper);

//////////////lights//////////////
// const ambient = new THREE.AmbientLight(0x333333);
// scene.add(ambient);
// const dLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(dLight);
// dLight.position.set(-70, 50, 0);
// dLight.castShadow = true;
// dLight.shadow.camera.bottom = -30;

// const shadowHelper = new THREE.CameraHelper(dLight.shadow.camera);
// scene.add(shadowHelper);

// const dLightHelper = new THREE.DirectionalLightHelper(dLight, 5);
// scene.add(dLightHelper);

const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-1000,500,1000,1000);
spotLight.castShadow =true;
spotLight.angle = 0.1;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

///fog

//scene.fog = new THREE.Fog(0xFFFFFF , 0, 50);
// scene.fog = new THREE.FogExp2(0xFFFFFF ,0.01);

/////////////background

//renderer.setClearColor(0xFFEA00);
// const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(earth);
const reflectionCube = new THREE.CubeTextureLoader()
scene.background= reflectionCube.load([
  earth,
  earth,
  earth,
 
  earth,
  earth,
  earth,
 
]);

///////////////////dat gui//////////////// 
const gui = new dat.GUI();
const options = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1
};

//color changer
gui.addColor(options, 'sphereColor').onChange(function(e){
  sphere.material.color.set(e);
});
//wireframe switch
gui.add(options,'wireframe').onChange(function(e){
  sphere.material.wireframe = e;
});
//speed controler
gui.add(options,'speed', 0, 0.1);

//light controls
gui.add(options, 'angle',0,1);
gui.add(options, 'penumbra',0,1);
gui.add(options, 'intensity',0,1);
let step = 0;

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e){
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

});
const raycaster = new THREE.Raycaster();
const sphereId = sphere.id;
box2.name = 'theBox';


//rotation function
function animate(time){
  cube.rotation.x = time/1000;
  cube.rotation.y = time/1000;
  
  step += options.speed;
  sphere.position.y = 2 * Math.abs(Math.sin(step));

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  sLightHelper.update();
  

  raycaster.setFromCamera(mousePosition ,camera);
const intersects = raycaster.intersectObjects(scene.children);
console.log(intersects);
for(let i =0 ; i<intersects.length ; i++){
  if(intersects[i].object.id === sphereId)
  intersects[i].object.material.color.set(0xFF0000);

  if(intersects[i].object.name ==='theBox'){
    intersects[i].object.rotation.x = time/1000;
    intersects[i].object.rotation.y = time/1000;
    
  }
}

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth / this.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

