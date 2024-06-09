import { Food } from "./Food";

export class Snake {
  size: number = 40;
  x: number = this.size * 2;
  y: number = this.size * 2;
  xSpeed: number = 1;
  ySpeed: number = 0;
  total: number = 0
  tail: any[] = []

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1]
    }
    this.tail[this.total - 1] = createVector(this.x, this.y)
    this.x = this.x + this.xSpeed * this.size;
    this.y = this.y + this.ySpeed * this.size;

    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  eat(food: Food) {
    let d = dist(this.x, this.y, food.x, food.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  detect(): boolean {

    // Check if snake hits wall
    if (this.x + this.xSpeed < 0 || this.x >= width - this.size || this.y + this.ySpeed < 0 || this.y >= height - this.size) {
      return true
    }

    // Check if snake hits itself
    for (var i = 0; i < this.tail.length; i++) {
      const pos = this.tail[i]
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        return true
      }
    }
    return false
  }

  show() {
    fill(0, 255, 0);
    translate(this.size / 2, this.size / 2);
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, this.size, this.size);
    }
    rect(this.x, this.y, this.size, this.size);
  }

  direction(x: number, y: number) {
    if (this.total > 0) {
      const lastPosition = this.tail[this.tail.length - 1]
      if (lastPosition.x === this.x + x * this.size && lastPosition.y === this.y + y * this.size) {
        return
      }
    }
    this.xSpeed = x;
    this.ySpeed = y;
  }
}