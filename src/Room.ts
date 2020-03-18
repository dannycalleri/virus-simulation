import {
  Graphics,
  Sprite,
} from "pixi.js";
import {world, engine} from "./Physics";
import GameObject from "./GameObject";
import { Bodies } from "matter-js";

class Room extends GameObject {
  private width: number = 0;
  private height: number = 0;
  private isColliding: boolean = false;
  private _isSuitable: boolean = false;

  public constructor(x: number, y: number, width: number, height: number, isSuitable: boolean = false) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this._isSuitable = isSuitable;

    const color: number = isSuitable ? 0xFFFFFF : 0xFF3300;

    let rectGraphic = new Graphics();
    rectGraphic.lineStyle(4, color, 1);
    rectGraphic.beginFill(0x0, 0);
    rectGraphic.drawRect(0, 0, width, height);
    rectGraphic.endFill();

    const texture = rectGraphic.generateCanvasTexture();
    const sprite = new Sprite(texture);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    this.container.addChild(sprite);

    const body = Bodies.rectangle(x, y, width, height, {
      inertia: Infinity,
    });
    this.rigidBody = body;
    world.add(engine.world, body);
  }

  public get isSuitable(): boolean { return this._isSuitable; }

  public update(deltaTime: number): void {
    super.update(deltaTime);
  }
}

export default Room;
