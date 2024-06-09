import { basicResize, basicSetup } from "../lib/page-setup";
import { Snake } from "../lib/Snake";
import { Star } from "../lib/Star.js";

const stars: Star[] = new Array(800)

function setup() {
  basicSetup()
  for (let i = 0; i < stars.length; i++) {
    stars[i] = new Star()
  }
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      cursor: url('/sketches/rocket.png'), auto;
    }
  `
  document.head.appendChild(style)

}

function windowResized() {
  basicResize()
}

function draw() {
  background(0)
  translate(mouseX, mouseY)
  for (let i = 0; i < stars.length; i++) {
    stars[i].update()
    stars[i].show()
  }
}
