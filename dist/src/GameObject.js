import { Container, Graphics } from "pixi.js";
import uuidv1 from "uuid/v1";
export default class GameObject {
    constructor() {
        this._x = 0;
        this._y = 0;
        this.gameObjects = [];
        this._id = uuidv1();
        this.container = new Container();
        this.debugContainer = new Container();
        let rectGraphic = new Graphics();
        rectGraphic.lineStyle(2, 0x888888, 1);
        rectGraphic.beginFill(0x0, 0);
        rectGraphic.drawRect(-1, -1, 2, 2);
        rectGraphic.endFill();
        rectGraphic.x = 0;
        rectGraphic.y = 0;
        this.debugContainer.addChild(rectGraphic);
        this.container.addChild(this.debugContainer);
    }
    get id() { return this._id; }
    get x() { return this._x; }
    set x(x) {
        this._x = x;
        this.container.x = x;
        if (this.rigidBody) {
            this.rigidBody.position.x = x;
        }
    }
    get y() { return this._y; }
    set y(y) {
        this._y = y;
        this.container.y = y;
        if (this.rigidBody) {
            this.rigidBody.position.y = y;
        }
    }
    get pivot() {
        return {
            x: this.container.pivot.x,
            y: this.container.pivot.y,
        };
    }
    set pivot(p) {
        this.container.pivot.x = p.x;
        this.container.pivot.y = p.y;
    }
    addChild(gameObject) {
        this.gameObjects.push(gameObject);
        if (this.container) {
            // eslint-disable-next-line
            this.container.addChild(gameObject.container);
        }
    }
    update(deltaTime) {
        if (this.rigidBody) {
            this.x = this.rigidBody.position.x;
            this.y = this.rigidBody.position.y;
        }
        this.gameObjects.forEach((g) => {
            g.update(deltaTime);
        });
    }
}
//# sourceMappingURL=GameObject.js.map