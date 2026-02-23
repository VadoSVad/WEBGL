import * as THREE from "three";

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
const direction = new THREE.DirectionalLight(0xffffff, 0.6);
scene.add(ambient, direction);

// сетка для наглядности
const grid = new THREE.GridHelper(10, 50);
scene.add(grid);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(webgl_width, webgl_height);
renderer.setPixelRatio(window.devicePixelRatio);
webgl.appendChild(renderer.domElement);

let toggled = false;

//анимация
let animating = false;
const animationDuration = 0.6;

// нажатие на ссылку
const toggleBtn = document.getElementById("pressme");
const svgCircle = document.getElementById("svgCircle");

toggleBtn.addEventListener("click", () => {
  toggled = !toggled;
  if (toggled) svgCircle.classList.add("active");
  else svgCircle.classList.remove("active");
});

const clock = new THREE.Clock();

(function animate() {
  const delta = clock.getDelta();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
})();
