import { Graphics, Sprite, } from "pixi.js";
import { world, engine } from "./Physics";
import GameObject from "./GameObject";
import { Bodies, Body, } from "matter-js";
class Particle extends GameObject {
    constructor(x, y, width, height) {
        super();
        this.width = 0;
        this.height = 0;
        this.isColliding = false;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        const color = 0xFFFFFF;
        let rectGraphic = new Graphics();
        rectGraphic.lineStyle(4, color, 1);
        rectGraphic.beginFill(0x0, 0);
        rectGraphic.drawCircle(0, 0, width);
        rectGraphic.endFill();
        const texture = rectGraphic.generateCanvasTexture();
        const sprite = new Sprite(texture);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        this.container.addChild(sprite);
        const body = Bodies.circle(x, y, width, {
            density: 0.0005,
            frictionAir: 0.06,
            restitution: 0.3,
            friction: 0.01,
        });
        this.rigidBody = body;
        world.add(engine.world, body);
    }
    excite() {
        const forceMagnitude = 0.02 * this.rigidBody.mass;
        Body.applyForce(this.rigidBody, this.rigidBody.position, {
            x: (forceMagnitude + Math.random() * forceMagnitude) * (Math.random() < 0.5 ? 1 : -1),
            y: -forceMagnitude + Math.random() * -forceMagnitude
        });
    }
    setVelocity(x, y) {
        // Body.setVelocity(this.rigidBody!, {x, y});
        // this.rigidBody.appl
        Body.applyForce(this.rigidBody, { x: this.x, y: this.y }, { x, y });
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}
export default Particle;
//# sourceMappingURL=Particle.js.map