import { IGameObject, Point } from "./compiler/types";
import { Container, Graphics } from "pixi.js";
import { Body } from "matter-js";
import uuidv1 from "uuid/v1";

export default class GameObject implements IGameObject {
  private _x: number = 0;
  private _y: number = 0;
  private _id: string;

  public gameObjects: IGameObject[] = [];
  public container: Container;
  public debugContainer: Container;
  public rigidBody?: Body;

  public constructor() {
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

  public get id(): string { return this._id; }

  public get x(): number { return this._x; }

  public set x(x: number) {
    this._x = x;
    this.container.x = x;
    if(this.rigidBody) {
      this.rigidBody.position.x = x;
    }
  }

  public get y(): number { return this._y; }

  public set y(y: number) {
    this._y = y;
    this.container.y = y;
    if(this.rigidBody) {
      this.rigidBody.position.y = y;
    }
  }

  public get pivot(): Point {
    return {
      x: this.container.pivot.x,
      y: this.container.pivot.y,
    };
  }

  public set pivot(p: Point) {
    this.container.pivot.x = p.x;
    this.container.pivot.y = p.y;
  }

  public addChild(gameObject: IGameObject): void {
    this.gameObjects.push(gameObject);

    if(this.container) {
      // eslint-disable-next-line
      this.container.addChild(gameObject.container!!);
    }
  }

  public update(deltaTime: number): void {
    if(this.rigidBody) {
      this.x = this.rigidBody.position.x;
      this.y = this.rigidBody.position.y;
    }

    this.gameObjects.forEach((g: IGameObject) => {
      g.update(deltaTime);
    });
  }
}