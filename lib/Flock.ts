import { Boid } from './Boid.js';
import type p5 from 'p5'

export class Flock {
    boids: Boid[] = [];
    alignment: p5.Vector
    color: p5.Color
    shape: string

    constructor(size: number = 100, c: p5.Color = color(255), shape: string = 'triangle') {
      this.color = c
      this.shape = shape
      for (let i = 0; i < size; i++) {
        this.boids.push(new Boid(this));
      }
    }

    nearbyBoids(position: p5.Vector): Boid[] {
      let perceptionRadius = 50;
      return this.boids.filter((other) => {
        return p5.Vector.dist(position, other.position) < perceptionRadius;
      });
    }

    kill(boid: Boid) {
      const index = this.boids.indexOf(boid)
      this.boids.splice(index, 1)
    }

    fly() {
      for (let boid of this.boids) {
        boid.align()
        boid.avoid()
        boid.update()
        boid.show()
      }
    }
}
