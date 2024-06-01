export class Food {
  x: number = 0;
  y: number = 0;
  size: number = 20;

  position(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  show() {
    translate(this.size / 2, this.size / 2);
    fill(255, 0, 100);
    rect(this.x, this.y, this.size, this.size);
  }
}