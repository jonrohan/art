import { addFormControl, basicSetup } from "../lib/page-setup";
import { Snake } from "../lib/Snake.js";
import { Food } from "../lib/Food.js";

let snake: Snake
const food = new Food()
const frameRateStart = 5
const score = document.createElement('div')
score.textContent = '0'
const highScore = document.createElement('div')
highScore.textContent = '0'
const deaths = document.createElement('div')
deaths.textContent = '0'

function setup() {
  basicSetup()
  resetGame()
  addFormControl('Score', score)
  addFormControl('High Score', highScore)
  addFormControl('Deaths', deaths)
}

function resetGame() {
  snake = new Snake()
  score.textContent = '0'
  frameRate(frameRateStart)
  moveFood()
}

function moveFood() {
  let cols = floor(width / snake.size) - 2
  let rows = floor(height / snake.size) - 2
  food.x = floor(random(cols) + 1) * snake.size
  food.y = floor(random(rows) + 1) * snake.size
}

function draw() {
  background(0)
  if (snake.detect()) {
    deaths.textContent = (parseInt(deaths.textContent) + 1).toString()
    resetGame()
    return
  }
  snake.update()
  snake.show()
  if (snake.eat(food)) {
    score.textContent = snake.total.toString()
    highScore.textContent = Math.max(parseInt(highScore.textContent), snake.total).toString()
    frameRate(frameRateStart + snake.total * 0.25)
    moveFood()
  }
  food.show()
}

function keyPressed() {
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
