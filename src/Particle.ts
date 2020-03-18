import {
  Graphics,
  Sprite,
} from "pixi.js";
import {world, engine} from "./Physics";
import GameObject from "./GameObject";
import {
  Bodies,
  Body,
} from "matter-js";

class Particle extends GameObject {
  private isColliding: boolean = false;

  public constructor(x: number, y: number, radius: number) {
    super();
    this.x = x;
    this.y = y;

    const color: number = 0xFFFFFF;

    let rectGraphic = new Graphics();
    rectGraphic.lineStyle(4, color, 1);
    rectGraphic.beginFill(0x0, 0);
    rectGraphic.drawCircle(0, 0, radius);
    rectGraphic.endFill();

    const texture = rectGraphic.generateCanvasTexture();
    const sprite = new Sprite(texture);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    this.container.addChild(sprite);

    const body = Bodies.circle(x, y, radius, {
      density: 0.0005,
      frictionAir: 0.06,
      restitution: 0.3,
      friction: 0.01,
    });
    this.rigidBody = body;
    world.add(engine.world, body);
  }

  public excite() {
    const forceMagnitude = 0.005 * this.rigidBody!.mass;
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
  }
}

export default Particle;
