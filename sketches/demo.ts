import {PolygonHelper} from '../lib/utils/PolygonHelper.js'
import {ColorHelper} from '../lib/utils/ColorHelper.js'
import type p5 from 'p5'
import { basicSetup, basicResize } from '../lib/page-setup.js';

// GLOBAL VARS & TYPES
let numberOfShapesControl: p5.Element;

function setup() {
  basicSetup()
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

  const numberOfShapes = 5
  const colours = ColorHelper.getColorsArray(numberOfShapes);

  // CONSISTENT SPEED REGARDLESS OF FRAMERATE
  const speed = (frameCount / (numberOfShapes * 30)) * 2;

  // DRAW ALL SHAPES
  for (var i = 0; i < numberOfShapes; i++) {
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