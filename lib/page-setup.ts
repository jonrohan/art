export function setup() {
  createCanvas(windowWidth, windowHeight - 48);
  rectMode(CENTER).noFill().frameRate(30);
}

export function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 48);
}
