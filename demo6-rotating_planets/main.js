import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from './src/img/stars.jpg';
import sunTexture from './src/img/sun.jpg';
import mercuryTexture from './src/img/mercury.jpg';
import venusTexture from './src/img/venus.jpg';
import earthTexture from './src/img/earth.jpg';
import marsTexture from './src/img/mars.jpg';
import jupiterTexture from './src/img/jupiter.jpg';
import saturnTexture from './src/img/saturn.jpg';
import saturnRingTexture from './src/img/saturn ring.png';
import uranusTexture from './src/img/uranus.jpg';
import uranusRingTexture from './src/img/uranus ring.png';
import neptuneTexture from './src/img/neptune.jpg';
import plutoTexture from './src/img/pluto.jpg';
import { SphereGeometry } from 'three';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

//loading planets
const textureload = new THREE.TextureLoader();
    //sun
const sunGeo = new THREE.SphereGeometry(12,25,20);
const sunMat = new THREE.MeshBasicMaterial({
 map:textureload.load(sunTexture)
}); 
const sun = new THREE.Mesh(sunGeo,sunMat);
scene.add(sun);

const pointLight = new THREE.PointLight(0xFFFFFF , 3, 300);
scene.add(pointLight);


//creating planets 
function createPlanet(size, texture, position, ring){

  const geometry = new THREE.SphereGeometry(size,25,20);
  const Material = new THREE.MeshStandardMaterial({
   map:textureload.load(texture)
  }); 
  const planet = new THREE.Mesh(geometry,Material);
  const planetObject = new THREE.Object3D;
  planetObject.add(planet);
  scene.add(planetObject);
  planet.position.x = position;

  if(ring){
    const RingGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,30
    );
     const RingMat = new THREE.MeshStandardMaterial({
         map:textureload.load(ring.texture),
         side : THREE.DoubleSide
      }); 
      const Ring = new THREE.Mesh(RingGeo,RingMat);
      
      planetObject.add(Ring);
      
      Ring.position.x = position;
      Ring.rotation.x = -0.5 * Math.PI;
      
  }

  return {planet, planetObject};
}

  const mercury = new createPlanet(5,mercuryTexture,20);
  const venus = new createPlanet(5,venusTexture,40);
  const earth = new createPlanet(5,earthTexture,60);
  const mars = new createPlanet(5,marsTexture,80);
  const jupiter = new createPlanet(5,jupiterTexture,100);
  const saturn = new createPlanet(5,saturnTexture,150,{
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
  });
  const uranus = new createPlanet(5,uranusTexture,200,{
    innerRadius: 10,
    outerRadius: 20,
    texture: uranusRingTexture
  });
  const neptune = new createPlanet(5,neptuneTexture,220);

function animate() {
    //Self-rotation
   
  sun.rotateY(0.002);
  mercury.planet.rotateY(0.001);
  mercury.planetObject.rotateY(0.001);
  venus.planet.rotateY(0.0012);
  venus.planetObject.rotateY(0.0015);
  earth.planet.rotateY(0.012);
  earth.planetObject.rotateY(0.0012);
  mars.planet.rotateY(0.013);
  mars.planetObject.rotateY(0.0019);
  jupiter.planet.rotateY(0.04);
  jupiter.planetObject.rotateY(0.0023);
  saturn.planet.rotateY(0.01);
  saturn.planetObject.rotateY(0.0021);
  uranus.planet.rotateY(0.01);
  uranus.planetObject.rotateY(0.0015);
  neptune.planet.rotateY(0.01);
  neptune.planetObject.rotateY(0.001);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});