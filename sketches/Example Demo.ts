import {PolygonHelper} from '../lib/utils/PolygonHelper.js'
import {ColorHelper} from '../lib/utils/ColorHelper.js'
import { basicSetup, basicResize, addFormControl } from '../lib/utils/page-setup.js';

// GLOBAL VARS & TYPES
const numberOfShapesControl: HTMLInputElement = document.createElement('input');

function setup() {
  basicSetup()
  numberOfShapesControl.type = 'range'
  numberOfShapesControl.value = '5'
  numberOfShapesControl.min = '2'
  addFormControl('Number of Shapes', numberOfShapesControl);
}

function windowResized() {
  basicResize()
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {

  // CLEAR BACKGROUND
  background(0);

  // CENTER OF SCREEN
  translate(width / 2,height / 2);

  const numberOfShapes = parseInt(numberOfShapesControl.value)
  const colours = ColorHelper.getColorsArray(numberOfShapes);

  // CONSISTENT SPEED REGARDLESS OF FRAMERATE
  const speed = (frameCount / (numberOfShapes * 30)) * 2;

  // DRAW ALL SHAPES
  for (let i = 0; i < numberOfShapes; i++) {
    push();
    const lineWidth = 8;
    const spin = speed * (numberOfShapes - i);
    const numberOfSides = 3 + i;
    const width = 40 * i;
    strokeWeight(lineWidth);
    stroke(colours[i]);
    rotate(spin);
    PolygonHelper.draw(numberOfSides, width)
    pop();
  }
}