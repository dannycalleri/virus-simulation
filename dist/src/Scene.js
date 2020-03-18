import { Container } from "pixi.js";
export default class Scene {
    constructor() {
        this._x = 0;
        this._y = 0;
        this.gameObjects = [];
        this.container = new Container();
    }
    get x() { return this._x; }
    get y() { return this._y; }
    set x(x) {
        this._x = x;
        this.container.x = x;
    }
    set y(y) {
        this._y = y;
        this.container.y = y;
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
        this.container.addChild(gameObject.container);
    }
    update(deltaTime) {
        this.gameObjects.forEach((g) => {
            g.update(deltaTime);
        });
    }
}
//# sourceMappingURL=Scene.js.map