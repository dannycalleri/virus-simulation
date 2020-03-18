import { Graphics, Sprite, } from "pixi.js";
import { world, engine } from "./Physics";
import GameObject from "./GameObject";
import { Bodies } from "matter-js";
class Room extends GameObject {
    constructor(x, y, width, height, isSuitable = false) {
        super();
        this.width = 0;
        this.height = 0;
        this.isColliding = false;
        this._isSuitable = false;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this._isSuitable = isSuitable;
        const color = isSuitable ? 0xFFFFFF : 0xFF3300;
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
    get isSuitable() { return this._isSuitable; }
    update(deltaTime) {
        super.update(deltaTime);
    }
}
export default Room;
//# sourceMappingURL=Room.js.map