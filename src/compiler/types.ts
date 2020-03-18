import { Container } from "pixi.js";
import { Body } from "matter-js";

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IGame {
  currentScene: IScene;
  scenes: Map<string, IScene>;
  loadResources: Function;
  update(deltaTime: number): void;
}

export interface IScene {
  x: number;
  y: number;
  container: Container;
  gameObjects: Array<IGameObject>;
  addChild(gameObject: IGameObject): void;
  update(deltaTime: number): void;
}

export interface IGameObject {
  id: string;
  x: number;
  y: number;
  gameObjects: Array<IGameObject>;
  rigidBody?: Body;
  container?: Container;
  // this container is used only for debug purposes
  debugContainer: Container;
  addChild(gameObject: IGameObject): void;
  update(deltaTime: number): void;
}

export interface Point {
  x: number;
  y: number;
}
