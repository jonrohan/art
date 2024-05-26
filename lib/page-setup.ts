// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
export function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  createCanvas(windowWidth, windowHeight - 48);
  rectMode(CENTER).noFill().frameRate(30);
  // NUMBER OF SHAPES SLIDER
  // numberOfShapesControl = createSlider(1, 30, 15, 1).position(10, 10).style("width", "100px");
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
export function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 48);
}
