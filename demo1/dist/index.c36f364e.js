// import * as THREE from THREE
// const canvas = document.querySelector(webgl);
// creating a scene
// const scene = new THREE.Scene();
// creating a camera
// const aspect = window.innerWidth / window.innerHeight;
// const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
// scene.add(camera);
// renderer
// const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
// renderer.setClearColor(0x222222);
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.render(scene, camera);
// adding box
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x781CE5 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
// camera.position.z = 2;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

//# sourceMappingURL=index.c36f364e.js.map
