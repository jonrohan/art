import { basicResize, basicSetup } from "../lib/utils/page-setup.js";
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
    canvas {
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
  if (width - 5 >= mouseX && mouseX >= 5 && height - 5 >= mouseY && mouseY >= 5) {
    console.log(mouseY, height)
    translate(mouseX, mouseY)
  } else {
    translate(width / 2, height / 2)
  }
  for (const star of stars) {
    star.update()
    star.show()
  }
}
