import * as PIXI from "pixi.js";
import { Engine } from "matter-js";
import { engine } from "./Physics";
export default class Game {
    constructor() {
        this.scenes = new Map();
        this.app = new PIXI.Application({ width: 800, height: 400 });
        document.body.appendChild(this.app.view);
    }
    get width() {
        return this.app.renderer.width;
    }
    get height() {
        return this.app.renderer.height;
    }
    get currentScene() {
        return this._currentScene;
    }
    set currentScene(scene) {
        if (this._currentScene) {
            this.app.stage.removeChild(this._currentScene.container);
        }
        this.app.stage.addChild(scene.container);
        this._currentScene = scene;
    }
    startLoop() {
        const fixedTimeStep = 1.0 / 60.0; // seconds
        const maxSubSteps = 3;
        const update = this.update.bind(this);
        let lastTime = 0;
        (function loop(time) {
            requestAnimationFrame(loop);
            let deltaTime = 0;
            if (lastTime !== undefined) {
                deltaTime = (time - lastTime) / 1000;
                Engine.update(engine, 1000 / 60);
            }
            update(deltaTime);
            lastTime = time;
        })(0);
    }
    loadResources(resources) {
        const resourceArray = [...resources].map(row => ({
            name: row[0],
            url: row[1],
        }));
        return new Promise((res, rej) => {
            PIXI.loader
                .add(resourceArray)
                .on("progress", this.loadProgressHandler)
                .load((loader, resources) => {
                res({
                    loader,
                    resources,
                });
            });
        });
    }
    update(deltaTime) {
        this._currentScene.update(deltaTime);
    }
    loadProgressHandler(loader, resource) {
        console.log("loading: " + resource.url);
        console.log("progress: " + loader.progress + "%");
    }
}
//# sourceMappingURL=Game.js.map