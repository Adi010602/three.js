import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

const scene = new THREE.Scene();
  
//sphere
const geometry = new THREE.SphereGeometry( 3,90,100 );
const material = new THREE.MeshPhongMaterial();
// Texture
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/img/black-and-white-flat-world-map-illustration-free-vector.jpg");
material.map = normalTexture;


const shape = new THREE.Mesh( geometry, material );

// shape.position.x = -32;
// shape.position.y = 30;
// shape.position.z = 0;
scene.add( shape );

//size
const sizes = {width:window.innerWidth,
              height:window.innerHeight};

// light
const light= new THREE.AmbientLight("white");

scene.add(light);

  // // Base camera
  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   sizes.width / sizes.height,
  //   0.1,
  //   100
  // );
  // camera.position.set(0,0,10);
  // scene.add(camera);

  var camera = new THREE.PerspectiveCamera(75, 
    window.innerWidth/window.innerHeight, 0.1, 100 ); // Specify camera type like this
    camera.position.set(0,2,); // Set position like this
    camera.lookAt(new THREE.Vector3(0,0,0)); // Set look at coordinate like this
    

 //animate
 document.addEventListener('mousemove', onDocumentMouseMove);

 let mouseX = 0;
 let mouseY = 0;
 const clock = new THREE.Clock();
 
 let targetX= 0;
 let targetY = 0;

 const windowX = window.innerHeight/2;
 const windowY = window.innerWidth/2;

function onDocumentMouseMove(event){
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}
const updateShape = (event) => {
  shape.positionY = window.scrollY * 0.001;
};
 
window.addEventListener('scroll', updateShape)

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});

//resize
window.addEventListener('resize', ()=>{
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;


//update camera
camera.aspect = sizes.width/sizes.height;
camera.updateProjectionMatrix();
})

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;
  const elapsedTime = clock.getElapsedTime();

 // Update objects
 shape.rotation.y = 0.1 * elapsedTime;
 shape.rotation.y += 0.4 * (targetX - shape.rotation.y);
 shape.rotation.x += 0.1 * (targetY - shape.rotation.x);

 // Render 
 renderer.setSize(sizes.width,sizes.height);
 renderer.setPixelRatio(4);
 renderer.render(scene, camera);

 // Call tick again on the next frame
 window.requestAnimationFrame(tick);
};

tick();