// Import three
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
// Import the default VRButton
import { VRButton } from 'https://unpkg.com/three/examples/jsm/webxr/VRButton.js';
// GLTF Loader
import {GLTFLoader} from './js/GLTFLoader.js';

let scene = new THREE.Scene();
let Mesh, Mesh2;

////////////////////////////////////
// Code for Skybox
const loader = new THREE.CubeTextureLoader();
const bg_texture = loader.load([
	'./skybox/kenon_star_ft.jpg',
	'./skybox/kenon_star_bk.jpg',
	'./skybox/kenon_star_up.jpg',
	'./skybox/kenon_star_dn.jpg',
	'./skybox/kenon_star_rt.jpg',
	'./skybox/kenon_star_lf.jpg',
]);
scene.background = bg_texture;
////////////////////////////////////

// Make a camera
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);
scene.add(camera);

// Add some lights
var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(1, 1, 1).normalize();
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 1))


// need_some_space
let need_some_space = new GLTFLoader();
need_some_space.load('./need_some_space/scene.gltf', (gltf) => {
	Mesh = gltf.scene;
	Mesh.scale.set(1, 1, 1);
	scene.add(Mesh);
	Mesh.position.set(0, -100, 0)
	console.log(Mesh.children[0].name)
});

// need_some_space
let need_some_space2 = new GLTFLoader();
need_some_space2.load('./need_some_space/scene.gltf', (gltf) => {
	Mesh2 = gltf.scene;
	Mesh2.scale.set(1, 1, 1);
	scene.add(Mesh2);
	Mesh2.position.set(0, -100, 0)
	console.log(Mesh2.children[0].name)
});

function animate() {
	requestAnimationFrame(animate);
}

animate();

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;

// Set animation loop
renderer.setAnimationLoop(render);
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function render(time) {
	if (Mesh && Mesh.rotation) {
		Mesh.rotation.y -= 0.005;
	}
	if (Mesh2 && Mesh2.rotation) {
		Mesh2.rotation.y += 0.005;
	}
	renderer.render(scene, camera);
}

const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('./audio/space.mp3', function (buffer) {
	sound.setBuffer(buffer);
	sound.setLoop(true);
	sound.setVolume(5);
	if (Mesh) {
		sound.play();
		console.log('Playing Audio!');
	}
});