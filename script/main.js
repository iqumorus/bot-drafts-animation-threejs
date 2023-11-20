import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js';

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.outputEncoding = THREE.sRGBEncoding


var camera = new THREE.PerspectiveCamera(10, 1, 1, 1000);
camera.position.set(0, 0, 3.2);


var canvas = renderer.domElement;
document.querySelector('#character').appendChild(canvas);


var light = new THREE.PointLight(0xFFFFFF, 9, 0);
light.position.set(-2.005, 8.483, 10.960);
scene.add(light);


var light = new THREE.PointLight(0xFFFFFF, 9, 0);
light.position.set(-0.756, -5.324, 2.677);
scene.add(light);



const model = 'assets/models/bot-drafts.glb'

const loader = new GLTFLoader();
loader.load( model, function ( gltf ) {
    const model = gltf.scene;

    const scale = 0.07;
    model.scale.set(scale, scale, scale);
    base.add( model );
} );



let base = new THREE.Object3D();
scene.add(base);

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
window.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event){
  mouse.x = ( event.clientX / window.innerWidth ) * 11 - 6;
  mouse.y = - ( event.clientY / window.innerHeight ) * 11 + 6;
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