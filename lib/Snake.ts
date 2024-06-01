import { Food } from "./Food";

export class Snake {
  x: number = 0;
  y: number = 0;
  xSpeed: number = 1;
  ySpeed: number = 0;
  size: number = 20;
  numberOfFoodEaten: number = 1

  update() {
    this.x = this.x + this.xSpeed * this.size;
    this.y = this.y + this.ySpeed * this.size;

    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  eat(food: Food) {
    let d = dist(this.x, this.y, food.x, food.y);
    if (d < 1) {
      this.numberOfFoodEaten++;
      return true;
    } else {
      return false;
    }
  }

  show() {
    fill(0, 255, 0);
    translate(this.size / 2, this.size / 2);
    rect(this.x, this.y, this.size, this.size);
  }

  direction(x: number, y: number) {
    this.xSpeed = x;
    this.ySpeed = y;
  }
}