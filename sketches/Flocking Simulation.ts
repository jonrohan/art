import { createRange, addFormControl, basicResize, basicSetup } from "../lib/utils/page-setup.js";
import { Flock } from "../lib/Flock.js";

let flock: Flock

const flocks: Flock[] = []
const score = document.createElement('div')
score.textContent = '0'
// GLOBAL VARS & TYPES
const flocksControl = createRange(1, 1, 10, 1)
const boidsControl = createRange(1000, 50, 1000, 25)
const perceptionRadius = createRange(50, 10, 200, 10, 'perception-radius')

flocksControl.addEventListener('change', rebuild)
boidsControl.addEventListener('change', rebuild)

const randomColor = document.createElement('input') as HTMLInputElement
randomColor.type = 'checkbox'
randomColor.checked = true
randomColor.addEventListener('change', rebuild)

const shapesControl = document.createElement('select')
shapesControl.addEventListener('change', rebuild)
shapesControl.multiple = true
shapesControl.className = 'form-multiselect block w-full mt-1 rounded-md shadow-sm border-gray-300 bg-white text-black'
shapesControl.innerHTML = `
  <option value="triangle">Triangle</option>
  <option value="circle">Circle</option>
  <option value="square">Square</option>
  <option value="pacman">Pacman</option>
  <option value="star">Star</option>
  <option value="line">Line</option>
`

function setup() {
  basicSetup()
  colorMode(HSL)
  addFormControl('Score', score)
  addFormControl('Flocks', flocksControl)
  addFormControl('Boids', boidsControl)
  addFormControl('Random Colors', randomColor)
  addFormControl('Shapes', shapesControl)
  addFormControl('Perception Radius', perceptionRadius)
  console.log(boidsControl.valueAsNumber)
  rebuild()
}

function rebuild() {
  flocks.splice(0, flocks.length)
  for (let i = 0; i < flocksControl.valueAsNumber; i++) {
    flocks.push(new Flock(
      boidsControl.valueAsNumber,
      randomColor.checked ? color(random(360), 100, 50) : undefined,
      shapesControl.selectedOptions[i % shapesControl.selectedOptions.length]?.value
    ))
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
    }
  }
  score.textContent = total.toString()
}