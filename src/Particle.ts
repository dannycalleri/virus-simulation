import {
  Graphics,
  Sprite,
} from "pixi.js";
import {world, engine, registerEntity} from "./Physics";
import GameObject from "./GameObject";
import {
  Bodies,
  Body,
} from "matter-js";

class Particle extends GameObject {
  private isInfected: boolean = false;
  private basicSprite: PIXI.Sprite;
  private infectedSprite: PIXI.Sprite;

  public constructor(x: number, y: number, radius: number, infected: boolean = false) {
    super();
    this.x = x;
    this.y = y;
    this.isInfected = infected;

    const color: number = infected ? 0xFF0000 : 0xFFFFFF;

    let rectGraphic = new Graphics();
    rectGraphic.lineStyle(4, color, 1);
    rectGraphic.beginFill(0x0, 0);
    rectGraphic.drawCircle(0, 0, radius);
    rectGraphic.endFill();

    const texture = rectGraphic.generateCanvasTexture();
    this.basicSprite = new Sprite(texture);
    this.basicSprite.anchor.x = 0.5;
    this.basicSprite.anchor.y = 0.5;
    this.container.addChild(this.basicSprite);

    // create also the infected sprite, but do not set it
    let infectedCircle = new Graphics();
    infectedCircle.lineStyle(4, 0xFF0000, 1);
    infectedCircle.beginFill(0x0, 0);
    infectedCircle.drawCircle(0, 0, radius);
    infectedCircle.endFill();

    const infectedTexture = infectedCircle.generateCanvasTexture();
    this.infectedSprite = new Sprite(infectedTexture);
    this.infectedSprite.anchor.x = 0.5;
    this.infectedSprite.anchor.y = 0.5;

    const body = Bodies.circle(x, y, radius, {
      density: 0.0005,
      frictionAir: 0.06,
      restitution: 0.3,
      friction: 0.01,
    });
    this.rigidBody = body;
    registerEntity(body, this);
    world.add(engine.world, body);
  }

  public get infected() { return this.isInfected; }
  public set infected(isInfected: boolean) {
    if (isInfected) {
      this.container.removeChild(this.basicSprite);
      this.container.addChild(this.infectedSprite);
    } else {
      this.container.removeChild(this.infectedSprite);
      this.container.addChild(this.basicSprite);
    }

    this.isInfected = isInfected;
  }

  public excite() {
    const forceMagnitude = 0.001 * this.rigidBody!.mass;
    Body.applyForce(this.rigidBody!, this.rigidBody!.position, {
      x: (forceMagnitude + Math.random() * forceMagnitude) * (Math.random() < 0.5 ? 1 : -1),
      y: (forceMagnitude + Math.random() * forceMagnitude) * (Math.random() < 0.5 ? 1 : -1),
    });
  }

  public setVelocity(x: number, y: number) {
    Body.applyForce(
      this.rigidBody!, 
      {x: this.x, y: this.y}, 
      {x, y}
    );
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);
    this.excite();
  }
}

export default Particle;
