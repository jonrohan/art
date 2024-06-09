export class Food {
  x: number = 0;
  y: number = 0;
  size: number = 40;

  position(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(255, 0, 100);
    rect(this.x, this.y, this.size, this.size);
  }
}