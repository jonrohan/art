import type p5 from 'p5'
import { Flock } from './Flock.js'

export class Boid {
  position: p5.Vector
  velocity: p5.Vector
  acceleration: p5.Vector
  flock: Flock
  maxSpeed: number = 4
  maxForce: number = 0.2
  size: number = 15


  constructor(flock: Flock) {
    this.position = createVector(random(width), random(height))
    this.velocity = p5.Vector.random2D()
    this.velocity.setMag(random(2, 4))
    this.acceleration = createVector()
    this.flock = flock
  }

  align() {
    this.acceleration.mult(0)

    const nearbyBoids = this.flock.nearbyBoids(this.position)
    let alignment = createVector();
    let cohesion = createVector();
    let separation = createVector();
    let total = 0

    for (let other of nearbyBoids) {
      if (other !== this) {
        alignment.add(other.velocity);
        cohesion.add(other.position);

        let diff = p5.Vector.sub(this.position, other.position)
        diff.div(p5.Vector.dist(this.position, other.position))
        separation.add(diff);
        total++
      }
    }

    if (total > 0) {
      alignment.div(total)
      alignment.setMag(this.maxSpeed)
      alignment.sub(this.velocity)
      alignment.limit(this.maxForce)

      cohesion.div(total)
      cohesion.sub(this.position)
      cohesion.setMag(this.maxSpeed)
      cohesion.sub(this.velocity)
      cohesion.limit(this.maxForce)

      separation.div(total)
      separation.setMag(this.maxSpeed + 2)
      separation.sub(this.velocity)
      separation.limit(this.maxForce)
    }
    this.acceleration.add(alignment)
    this.acceleration.add(cohesion)
    this.acceleration.add(separation)
  }

  update() {
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)

    if (this.position.x > width) {
      this.position.x = 0
    } else if (this.position.x < 0) {
      this.position.x = width
    }
    if (this.position.y > height) {
      this.position.y = 0
    } else if (this.position.y < 0) {
      this.position.y = height
    }
  }

  avoid() {
    // Avoid the mouse
    let mouse = createVector(mouseX, mouseY)
    let diff = p5.Vector.sub(this.position, mouse)
    let distance = p5.Vector.dist(this.position, mouse)
    if (distance < 100) {
      diff.setMag(200)
      diff.sub(this.velocity)
      this.acceleration.add(diff)
    }
  }

  show() {
    stroke(this.flock.color)
    strokeWeight(1)
    fill(hue(this.flock.color), saturation(this.flock.color), lightness(this.flock.color), .4)
    push()
    translate(this.position.x, this.position.y)
    rotate(this.velocity.heading() + HALF_PI)
    if (this.flock.shape === 'circle') {
      ellipse(0, 0, this.size)
    } else if (this.flock.shape === 'square') {
      rectMode(CENTER)
      rect(0, 0, this.size, this.size)
    } else if (this.flock.shape === 'triangle') {
      triangle(0, 0, - (this.size / 3), this.size, (this.size / 3), this.size)
    } else if (this.flock.shape === 'pacman') {
      let biteSize = PI / 6;
      let startAngle = biteSize * sin(frameCount * 0.2) + biteSize;
      let endAngle = TWO_PI - startAngle;

      // Draw the arc.
      arc(0, 0, this.size, this.size, startAngle, endAngle, PIE);
    } else if (this.flock.shape === 'star') {
      beginShape();
      const points = 5
      for (let i = 0; i < points; i++) {
        let angle = TWO_PI / points * i;
        let x = 0 + cos(angle) * this.size / 2;
        let y = 0 + sin(angle) * this.size / 2;
        vertex(x, y);
        angle += TWO_PI / (points * 2);
        x = 0 + cos(angle) * this.size / 4;
        y = 0 + sin(angle) * this.size / 4;
        vertex(x, y);
      }
      endShape(CLOSE)
    } else if (this.flock.shape === 'line') {
      rotate(HALF_PI)
      line(0, 0, this.size, 0)
    }
    // rotate the triangle to face the direction of the velocity
    pop()
  }
}