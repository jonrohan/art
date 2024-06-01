import { basicResize, basicSetup } from "../lib/page-setup";
import { Snake } from "../lib/Snake.js";
import { Food } from "../lib/Food.js";

const snake = new Snake()
const food = new Food()



function setup() {
  basicSetup()
  frameRate(5 * snake.numberOfFoodEaten)
  food.position(random(width), random(height))
}

function windowResized() {
  basicResize()
}

function pickLocation() {
  let cols = floor(width / snake.size)
  let rows = floor(height / snake.size)
  food.x = floor(random(cols)) * snake.size
  food.y = floor(random(rows)) * snake.size
}

function draw() {
  background(0)
  snake.update()
  snake.show()
  if (snake.eat(food)) {
    pickLocation()
  }
  food.show()
}

function keyPressed() {
  console.log(keyCode, "hi")
  if (keyCode === UP_ARROW) {
    snake.direction(0, -1)
  } else if (keyCode === DOWN_ARROW) {
    snake.direction(0, 1)
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction(1, 0)
  } else if (keyCode === LEFT_ARROW) {
    snake.direction(-1, 0)
  }
}
