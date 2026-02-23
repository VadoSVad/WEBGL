import * as THREE from "three";
import { CubeController } from "./controllers/cube";

const webgl = document.getElementById("webgl");
const webgl_width = webgl.clientWidth;
const webgl_height = webgl.clientHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(
  50,
  webgl_width / webgl_height,
  0.1,
  100,
);
camera.position.set(0, 1, 6);

const ambient = new THREE.AmbientLight(0xffffff, 1);
const direction = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(ambient, direction);

// сетка для наглядности
const grid = new THREE.GridHelper(10, 50);
scene.add(grid);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(webgl_width, webgl_height);
renderer.setPixelRatio(window.devicePixelRatio);
webgl.appendChild(renderer.domElement);

//  кубы
const cube1 = new CubeController(scene, {
  position: new THREE.Vector3(0.8, 0.5, 1.5),
  defaultColor: 0x00ff66,
  size: 0.5,
});

const cube2 = new CubeController(scene, {
  position: new THREE.Vector3(-0.8, 0.5, 1.5),
  defaultColor: 0x00ff66,
  size: 0.5,
});

// нажатие на ссылку
let toggled = false;
const toggleBtn = document.getElementById("pressme");
const svgCircle = document.getElementById("svgCircle");

toggleBtn.addEventListener("click", () => {
  toggled = !toggled;
  if (toggled) {
    svgCircle.classList.add("active");

    cube1.getAnimation({
      position: new THREE.Vector3(0.3, 0.5, 1.5),
      color: 0xff3333,
      duration: 0.5,
    });
    cube2.getAnimation({
      position: new THREE.Vector3(-0.3, 0.5, 1.5),
      color: 0xff3333,
      duration: 0.5,
    });
  } else {
    svgCircle.classList.remove("active");

    cube1.getAnimation({
      position: new THREE.Vector3(0.8, 0.5, 1.5),
      color: 0x00ff66,
      duration: 0.5,
    });
    cube2.getAnimation({
      position: new THREE.Vector3(-0.8, 0.5, 1.5),
      color: 0x00ff66,
      duration: 0.5,
    });
  }
});

function onResize() {
  const width = webgl.clientWidth;
  const height = webgl.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", onResize);

const clock = new THREE.Clock();

(function animate() {
  const delta = clock.getDelta();

  // контроллеры
  cube1.updateDelta(delta);
  cube2.updateDelta(delta);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
})();
