import { startDemo } from './demo3d.js';

document.getElementById('play-demo-btn').addEventListener('click', () => {
  document.querySelector('#game-canvas').style.display = 'block';
  document.body.style.overflow = 'hidden';
  startDemo();
});
