import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';//creating scene



  // Texture
  const textureLoader = new THREE.TextureLoader();
  const normalTexture = textureLoader.load("/img/black-and-white-flat-world-map-illustration-free-vector.jpg");

  // Canvas
  const canvas = document.querySelector("canvas.webgl");

  // Scene
  const scene = new THREE.Scene();

  // Objects
  const geometry = new THREE.SphereBufferGeometry( 0.5,65,65 );

  // Materials
  const material = new THREE.MeshStandardMaterial();
  material.map = normalTexture;
  material.rotationSpeed = 10;  

  // Mesh
  const shape = new THREE.Mesh(geometry, material);
  scene.add(shape);

  // Lights
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.x = 2;
  pointLight.position.y = 3;
  pointLight.position.z = 4;
  scene.add(pointLight);

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 5;
  scene.add(camera);

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */
  document.addEventListener('mousemove', onDocumentMouseMove);

  let mouseX = 0;
  let mouseY = 0;
  
  let targetX= 0;
  let targetY = 0;
 
  const windowX = window.innerHeight/2;
  const windowY = window.innerWidth/2;
 
 function onDocumentMouseMove(event){
   mouseX = event.clientX = windowX;
   mouseY = event.clientY = windowY;
 }
 const updateShape = (event) => {
   shape.positionY = window.scrollY * 0.001;
 };
  
 window.addEventListener('scroll', updateShape)
 

  const clock = new THREE.Clock();

  const tick = () => {
     targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    shape.rotation.y = 0.4 * elapsedTime;
   
    shape.rotation.y += 0.4 * (targetX - shape.rotation.y);

    shape.rotation.x += 0.2 * (targetY - shape.rotation.x);
  

    // Update Orbital Controls
    // controls.update()
    

    // Render
    const canvas = document.querySelector(".webgl");
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(sizes.width,sizes.height);
    renderer.render(scene, camera);

    //controls
    const controls = new OrbitControls(camera, canvas);
    controls.autoRotate =true;
    controls.autoRotateSpeed = 20;

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();


