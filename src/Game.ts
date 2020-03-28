import * as PIXI from "pixi.js";
import { IGame, IScene } from "./compiler/types";
import { Engine } from "matter-js";
import { engine } from "./Physics";

export default class Game implements IGame {
  private _currentScene?: IScene;
  private app: PIXI.Application;
  scenes: Map<string, IScene> = new Map();

  constructor(width: number, height: number, element: HTMLElement) {
    this.app = new PIXI.Application({width, height});
    element.appendChild(this.app.view);
  }

  public get width() {
    return this.app.renderer.width;
  }

  public get height() {
    return this.app.renderer.height;
  }

  public get currentScene() {
    return this._currentScene!!;
  }

  public set currentScene(scene: IScene) {
    if(this._currentScene) {
      this.app.stage.removeChild(this._currentScene.container);
    }

    this.app.stage.addChild(scene.container);
    this._currentScene = scene;
  }

  public startLoop() {
    const fixedTimeStep:number = 1.0 / 60.0; // seconds
    const maxSubSteps: number = 3;
    const update: Function = this.update.bind(this);
    let lastTime: number = 0;

    (function loop(time: number) {
      requestAnimationFrame(loop);
      let deltaTime: number = 0;
      if(lastTime !== undefined){
        deltaTime = (time - lastTime) / 1000;
        Engine.update(engine, 1000 / 60);
      }
      
      update(deltaTime);
      lastTime = time;
    })(0);
  }

  public loadResources(resources: Map<string, string>) {
    const resourceArray = [...resources].map(row => ({
      name: row[0],
      url: row[1],
    }));
    return new Promise((res, rej) => {
      PIXI.loader
        .add(resourceArray)
        .on("progress", this.loadProgressHandler)
        .load((loader: any, resources: any) => {
          res({
            loader, 
            resources,
          });
        });
    });
  }

  public update(deltaTime: number) {
    this._currentScene!!.update(deltaTime);
  }

  private loadProgressHandler (loader: any, resource: any) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%");
  }
}
