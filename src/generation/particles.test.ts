import { 
  generateParticlesOneInfected,
} from "./particles";

test('generate 30 particles with one random infected', () => {
  const particles = generateParticlesOneInfected(30, 100, 50);
  expect(particles.length).toBe(30);
});
