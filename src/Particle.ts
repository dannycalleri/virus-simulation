import {
  Graphics,
  Sprite,
} from "pixi.js";
import {world, engine, registerEntity} from "./Physics";
import {IGameObject} from './compiler/types';
import GameObject from "./GameObject";
import {
  Bodies,
  Body,
} from "matter-js";
import configuration from "./configuration";

class Particle extends GameObject {
  private isInfected: boolean = false;
  private hasBeenInfected: boolean = false;
  private basicSprite: PIXI.Sprite;
  private infectedSprite: PIXI.Sprite;
  private recoveredSprite: PIXI.Sprite;
  private infectedTime: number = 0;

  public constructor(x: number, y: number, radius: number, infected: boolean = false) {
    super();
    this.x = x;
    this.y = y;

    let rectGraphic = new Graphics();
    rectGraphic.lineStyle(4, configuration.colors.healthy, 1);
    rectGraphic.beginFill(configuration.colors.healthy, 1);
    rectGraphic.drawCircle(0, 0, radius);
    rectGraphic.endFill();

    const texture = rectGraphic.generateCanvasTexture();
    this.basicSprite = new Sprite(texture);
    this.basicSprite.anchor.x = 0.5;
    this.basicSprite.anchor.y = 0.5;
    this.container.addChild(this.basicSprite);

    // create also the infected sprite, but do not set it
    let infectedCircle = new Graphics();
    infectedCircle.lineStyle(4, configuration.colors.infected, 1);
    infectedCircle.beginFill(configuration.colors.infected, 1);
    infectedCircle.drawCircle(0, 0, radius);
    infectedCircle.endFill();

    const infectedTexture = infectedCircle.generateCanvasTexture();
    this.infectedSprite = new Sprite(infectedTexture);
    this.infectedSprite.anchor.x = 0.5;
    this.infectedSprite.anchor.y = 0.5;

    // create also the infected sprite, but do not set it
    let recoveredCircle = new Graphics();
    recoveredCircle.lineStyle(4, configuration.colors.recovered, 1);
    recoveredCircle.beginFill(configuration.colors.recovered, 1);
    recoveredCircle.drawCircle(0, 0, radius);
    recoveredCircle.endFill();

    const recoveredTexture = recoveredCircle.generateCanvasTexture();
    this.recoveredSprite = new Sprite(recoveredTexture);
    this.recoveredSprite.anchor.x = 0.5;
    this.recoveredSprite.anchor.y = 0.5;

    const body = Bodies.circle(x, y, radius, {
      density: 0.0005,
      frictionAir: 0.06,
      restitution: 0.3,
      friction: 0.01,
    });
    this.rigidBody = body;
    registerEntity(body, this);
    world.add(engine.world, body);
    this.infected = infected;
  }

  public get hasParticlesBeenInfected() { return this.hasBeenInfected; }
  public get infected() { return this.isInfected; }
  public set infected(isInfected: boolean) {
    if(!this.infected && this.hasBeenInfected) {
      return;
    }

    if (isInfected) {
      this.container.removeChild(this.basicSprite);
      this.container.addChild(this.infectedSprite);
      this.hasBeenInfected = true;
    } else if(this.hasBeenInfected) {
      this.container.removeChild(this.infectedSprite);
      this.container.addChild(this.recoveredSprite);
    }

    this.isInfected = isInfected;
  }

  public excite() {
    const forceMagnitude = 0.0015 * this.rigidBody!.mass;
    Body.applyForce(this.rigidBody!, this.rigidBody!.position, {
      x: (forceMagnitude + Math.random() * forceMagnitude) * (Math.random() < 0.5 ? 1 : -1),
      y: (forceMagnitude + Math.random() * forceMagnitude) * (Math.random() < 0.5 ? 1 : -1),
    });
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);
    this.excite();

    if(this.isInfected) {
      this.infectedTime += deltaTime;
      if (this.infectedTime > 5.0) {
        this.infected = false;
        this.infectedTime = 0;
      }
    }
  }

  public onCollision(gameObject: IGameObject) {
    if (gameObject instanceof Particle) {
      if(this.infected || gameObject.infected) {
        this.infected = true;
        gameObject.infected = true;
      }
    }
  }
}

export default Particle;
