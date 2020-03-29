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
  
  class Wall extends GameObject {
    public constructor(x: number, y: number, width: number, height: number) {
      super();
      this.x = x;
      this.y = y;
  
      let rectGraphic = new Graphics();
      rectGraphic.lineStyle(4, 0x0, 1);
      rectGraphic.beginFill(0x0, 1);
      rectGraphic.drawRect(0, 0, width, height);
      rectGraphic.endFill();
  
      const texture = rectGraphic.generateCanvasTexture();
      const sprite = new Sprite(texture);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      this.container.addChild(sprite);
  
      const body = Bodies.rectangle(x, y, width, height, {
        isStatic: true,
      });
      this.rigidBody = body;
      world.add(engine.world, body);
    }
  
    public update(deltaTime: number): void {
      super.update(deltaTime);
    }
  }
  
  export default Wall;
  