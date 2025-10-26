import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.159/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.159/examples/jsm/controls/OrbitControls.js';

export function startDemo() {
  const canvasContainer = document.getElementById('game-canvas');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080010);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  canvasContainer.appendChild(renderer.domElement);

  // Luces
  const ambient = new THREE.AmbientLight(0x8888ff, 0.6);
  scene.add(ambient);

  const pointLight = new THREE.PointLight(0xff00ff, 3, 20);
  pointLight.position.set(3, 5, 2);
  scene.add(pointLight);

  // Piso
  const floorGeometry = new THREE.PlaneGeometry(30, 30, 40, 40);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x220022,
    wireframe: true,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Cubo animado
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xff33ff,
    emissive: 0x220022,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.y = 1;
  scene.add(cube);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
    pointLight.position.x = Math.sin(Date.now() * 0.002) * 4;
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
