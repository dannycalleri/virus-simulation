import Game from './Game';
import Scene from './Scene';
import Particle from './Particle';
import Wall from './Wall';
import { generateParticlesOneInfected } from './generation/particles';

export default class VirusSimulation extends Game {
  private eventBusElement: HTMLElement;
  private time: number = 0.0;
  private numberOfParticles:number;
  private numberOfInfectedCurrentFrame:number = 0.0;

  public constructor(width: number, height: number, element: HTMLElement, eventBusElement: HTMLElement, numberOfParticles: number = 200) {
    super(width, height, element);
    this.numberOfParticles = numberOfParticles;
    this.eventBusElement = eventBusElement;
    this.setup();
  }

  private async setup(): Promise<void> {
    const scene = new Scene();
    this.currentScene = scene;

    scene.pivot = {
      x: -this.width / 2,
      y: -this.height / 2,
    };

    const WALL_THICKNESS = 20;
    const walls: Wall[] = [
      // top
      new Wall(0, -this.height/2+WALL_THICKNESS/2, this.width, WALL_THICKNESS),
      // bottom
      new Wall(0, this.height/2-WALL_THICKNESS/2, this.width, WALL_THICKNESS),
      // left
      new Wall(-this.width/2+WALL_THICKNESS/2, 0, WALL_THICKNESS, this.height),
      // right
      new Wall(this.width/2-WALL_THICKNESS/2, 0, WALL_THICKNESS, this.height),
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
    if (this.time > 0.05) {
      this.time = 0;
      const numberOfInfected = this.currentScene.gameObjects
        .filter(g => g instanceof Particle && g.infected).length;
      // const event = new CustomEvent('histogramEvent', { detail: (numberOfInfected - this.numberOfInfectedCurrentFrame) });
      const event = new CustomEvent('histogramEvent', { detail: numberOfInfected });
      this.eventBusElement.dispatchEvent(event);
      this.numberOfInfectedCurrentFrame = numberOfInfected;
    }
  }
}