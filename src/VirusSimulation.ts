import Game from './Game';
import Scene from './Scene';
import Particle from './Particle';
import Wall from './Wall';
import { Circle } from './compiler/types';
import { generateParticlesOneInfected } from './generation/particles';

export default class DungeonCrawler extends Game {
  private particle?: Particle;
  private particle2?: Particle;

  public constructor() {
    super();
    this.particle = undefined;
    this.particle2 = undefined;
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

    const particles: Particle[] = generateParticlesOneInfected(100);
    particles.forEach((particle: Particle) => {
      scene.addChild(particle);
    });

    // const id = setInterval(() => {
    //   particles.forEach(particle => {
    //     particle.excite();
    //   });
    // }, 200);
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);
  }
}