
export class Star {
  x: number = random(-width, width);
  y: number = random(-height, height);
  z: number = random(width);

  pz: number = this.z;

  update() {
    this.z = this.z - 40
    if (this.z < 1) {
      this.z = width

      this.x = random(-width, width)
      this.y = random(-height, height)
      this.pz = this.z
    }
  }

  show() {
    fill(255);
    noStroke();

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    const r = map(this.z, 0, width, 16, 0);
    ellipse(sx, sy, r, r);

    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z

    stroke(255);
    line(px, py, sx, sy)
  }
}