import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js';

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(window.devicePixelRatio || 2);

var camera = new THREE.PerspectiveCamera(10, 1, 1, 1000);
camera.position.set(0, 0, 3.2);

var canvas = renderer.domElement;
document.querySelector('#character').appendChild(canvas);

var light1 = new THREE.PointLight(0xFFFFFF, 1, 0);
light1.position.set(10, 0, 0);
scene.add(light1);

var light2 = new THREE.PointLight(0xFFFFFF, 1, 0);
light2.position.set(-10, 0, 2, 0);
scene.add(light2);

var light1 = new THREE.PointLight(0xFFFFFF, 1, 0);
light1.position.set(0, 10, 0);
scene.add(light1);

var light2 = new THREE.PointLight(0xFFFFFF, 1, 0);
light2.position.set(0, -10, 0);
scene.add(light2);

var light1 = new THREE.PointLight(0xFFFFFF, 1, 0);
light1.position.set(0, 0, 10);
scene.add(light1);

var light2 = new THREE.PointLight(0xFFFFFF, 0,5, 0);
light2.position.set(0, 0, 2.677);
scene.add(light2);

const modelPath = 'assets/models/bot-drafts.gltf';

const loader = new GLTFLoader();

loader.load(modelPath, function (gltf) {
  const model = gltf.scene;

  const scale = 0.07;
  model.scale.set(scale, scale, scale);

  const cubeObject = model.getObjectByName('Cube001_1', true);

  
  cubeObject.geometry.attributes.uv.array.forEach((uv, index) => {
    cubeObject.geometry.attributes.uv.array[index] = 1 - uv;

  });

  const video = document.getElementById('video');

  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;

  const material = new THREE.MeshBasicMaterial({
    map: videoTexture,
    alphaTest: 0.5,
  });

  cubeObject.material = material;
  base.add(model);
});




let base = new THREE.Object3D();
scene.add(base);

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
window.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 12 - 6;
  mouse.y = -(event.clientY / window.innerHeight) * 12 + 6;
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, pointOfIntersection);
  base.lookAt(pointOfIntersection);
}

renderer.setAnimationLoop(() => {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
});

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
