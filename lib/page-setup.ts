export function basicSetup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER).noFill().frameRate(30);
}

export function basicResize() {
  resizeCanvas(windowWidth, windowHeight);
}
