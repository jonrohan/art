import { addFormControl, basicResize, basicSetup } from "../lib/utils/page-setup.js";
import { Flock } from "../lib/Flock.js";

let flock: Flock

const flocks: Flock[] = []
const score = document.createElement('div')
score.textContent = '0'
// GLOBAL VARS & TYPES
const flocksControl = document.createElement('input');
flocksControl.type = 'range'
flocksControl.value = '5'
flocksControl.min = '1'
flocksControl.max = '10'
flocksControl.addEventListener('change', rebuild)

const boidsControl = document.createElement('input');
boidsControl.type = 'range'
boidsControl.value = '100'
boidsControl.min = '50'
boidsControl.max = '500'
boidsControl.addEventListener('change', rebuild)

// const highScore = document.createElement('div')
// highScore.textContent = '0'

function setup() {
  basicSetup()
  colorMode(HSL)
  addFormControl('Score', score)
  addFormControl('Flocks', flocksControl)
  addFormControl('Boids', boidsControl)
  rebuild()
}

function rebuild() {
  flocks.splice(0, flocks.length)
  const shapes = ['triangle', 'circle', 'square', 'pacman', 'star', 'line']
  for (let i = 0; i < parseInt(flocksControl.value); i++) {
    // flocks.push(new Flock(500, color(random(360), 100, 50), shapes[i % shapes.length])
    flocks.push(new Flock(parseInt(boidsControl.value)))
  }
}

function windowResized() {
  basicResize()
}

function draw() {
  background(0)
  for (let flock of flocks) {
    flock.fly()
  }
}

function mouseClicked() {
  let total = parseInt(score.textContent).toString()
  for (let flock of flocks) {
    for (let boid of flock.nearbyBoids(createVector(mouseX, mouseY))) {
      flock.kill(boid)
      total++
    }
  }
  score.textContent = total.toString()
}