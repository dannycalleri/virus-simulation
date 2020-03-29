import Particle from '../Particle';
import {
  Circle 
} from "../compiler/types";

function generateParticlesOneInfected(numberOfParticles: number): Particle[] {
  const circles: Circle[] = new Array(numberOfParticles).fill(0).map((_, i) => {
    return {
      x: Math.floor(Math.random() * 300) * (Math.random() < 0.5 ? 1 : -1),
      y: Math.floor(Math.random() * 150) * (Math.random() < 0.5 ? 1 : -1),
      radius: 5,
    };
  });

  const infected: number = Math.floor(Math.random() * circles.length);
  return circles.map((circle, index) => {
    if(index === infected) {
      return new Particle(0, 0, circle.radius, true);
    }
    return new Particle(circle.x, circle.y, circle.radius);
  });
}

export {
  generateParticlesOneInfected,
};
