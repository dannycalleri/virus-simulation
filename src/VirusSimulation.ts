import Game from './Game';
import Scene from './Scene';
import Particle from './Particle';
import Wall from './Wall';
import { generateParticlesOneInfected } from './generation/particles';

export default class VirusSimulation extends Game {
  private element: HTMLElement;
  private time: number = 0.0;
  private numberOfParticles:number;
  private numberOfInfectedCurrentFrame:number = 0.0;

  public constructor(width: number, height: number, element: HTMLElement, numberOfParticles: number = 100) {
    super(width, height, element);
    this.numberOfParticles = numberOfParticles;
    this.element = element;
    this.setup();
  }

  private async setup(): Promise<void> {
    const scene = new Scene();
    this.currentScene = scene;

    scene.pivot = {
      x: -this.width / 2,
      y: -this.height / 2,
    };

    const walls: Wall[] = [
      // top
      new Wall(0, -400/2+40/2, 800, 40),
      // bottom
      new Wall(0, 400/2-40/2, 800, 40),
      // left
      new Wall(-800/2+40/2, 0, 40, 400),
      // right
      new Wall(800/2-40/2, 0, 40, 400),
    ];
    walls.forEach(wall => {
      scene.addChild(wall);
    });

    const particles: Particle[] = generateParticlesOneInfected(this.numberOfParticles);
    particles.forEach((particle: Particle) => {
      scene.addChild(particle);
    });
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);

    this.time += deltaTime;
    if (this.time > 1.0) {
      this.time = 0;
      const numberOfInfected = this.currentScene.gameObjects
        .filter(g => g instanceof Particle && g.infected).length;
      const event = new CustomEvent('histogramEvent', { detail: (numberOfInfected - this.numberOfInfectedCurrentFrame) });
      this.element.dispatchEvent(event);
      this.numberOfInfectedCurrentFrame = numberOfInfected;
    }
  }
}