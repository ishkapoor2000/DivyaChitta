// Import three
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
// Import the default VRButton
import { VRButton } from 'https://unpkg.com/three/examples/jsm/webxr/VRButton.js';
// GLTF Loader
import { GLTFLoader } from './js/GLTFLoader.js';

let scene = new THREE.Scene();
let Mesh, MeshParent, MeshChild1, clock, mixer;
clock = new THREE.Clock();

////////////////////////////////////
// Code for Skybox
const loader = new THREE.CubeTextureLoader();
const bg_texture = loader.load([
	'./skybox/ft.jpg',
	'./skybox/bk.jpg',
	'./skybox/up.jpg',
	'./skybox/dn.jpg',
	'./skybox/rt.jpg',
	'./skybox/lf.jpg',
]);
scene.background = bg_texture;
////////////////////////////////////

// Make a camera
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, 30);
scene.add(camera);

var user = new THREE.Group();
user.position.set(-2.8, 0.8, -2.25);
user.rotation.set(0, 0.17, 0);
scene.add(user);
user.add(camera);

// Add some lights
var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(1, 1, 1).normalize();
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 1))

// floating_tree
let floating_tree = new GLTFLoader();
floating_tree.load('./model/floating_tree/scene.gltf', (gltf) => {
	Mesh = gltf.scene;
	MeshParent = gltf;
	scene.add(Mesh);
	console.log('Mesh added to the scene')
	user.rotation.set(0, 90.17, 0);
	MeshChild1 = Mesh.children[0]
	MeshChild1.scale.x = 0.050
	MeshChild1.scale.y = 0.050
	MeshChild1.scale.z = 0.050
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
	renderer.render(scene, camera);
	if (Mesh) {
		mixer = new THREE.AnimationMixer(Mesh);
		MeshParent.animations.forEach((clip) => {
			mixer.clipAction(clip).play();
		});
		const delta = clock.getDelta();
		mixer.update(delta);
	}
}

const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('./audio/nature.mp3', function (buffer) {
	sound.setBuffer(buffer);
	sound.setLoop(true);
	sound.setVolume(5);
	if (Mesh) {
		sound.play();
		console.log('Playing Audio!');
	}
});