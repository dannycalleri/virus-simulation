import {
  IBodyDefinition,
  World,
  Engine,
  Events,
  IWorldDefinition
} from "matter-js";
import { IGameObject } from "./compiler/types";
import Particle from "./Particle";

const entityByBodyId: Map<number, IGameObject> = new Map();
function registerEntity(body: IBodyDefinition, entity: IGameObject) {
  entityByBodyId.set(body.id!!, entity);
};

const engine = Engine.create();
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

Events.on(engine, "collisionStart", (event) => {
  const pairs = event.pairs;
  pairs.forEach(pair => {
    const entityA = entityByBodyId.get(pair.bodyA.id);
    const entityB = entityByBodyId.get(pair.bodyB.id);
    if(entityA !== undefined && entityB !== undefined) {
      entityA.onCollision(entityB);
    }
  });
});

export {
  World as world,
  engine,
  registerEntity,
};
