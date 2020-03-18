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

// function Registrable<TBase extends World>(Base: TBase) {
//   return class Timestamped extends Base {
//     private entityByBodyId: Map<number, IGameObject> = new Map();
//     registerEntity(body: IBodyDefinition, entity: IGameObject) {
//       this.entityByBodyId.set(body.id!!, entity);
//     };
//   };
// }

// const world: IWorldDefinition = function() {
//   function registerEntity(body: IBodyDefinition, entity: IGameObject) {
//     entityByBodyId.set(body.id!!, entity);
//   };

//   return {
//     registerEntity,
//     ...World,
//   };
// }();

const engine = Engine.create();
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;
// engine.enableSleeping = true;

Events.on(engine, "collisionStart", (event) => {
  const pairs = event.pairs;
  pairs.forEach(pair => {
    const entityA = entityByBodyId.get(pair.bodyA.id);
    const entityB = entityByBodyId.get(pair.bodyB.id);
    if (entityA instanceof Particle && entityB instanceof Particle) {
      if(entityA.infected || entityB.infected) {
        entityA.infected = true;
        entityB.infected = true;
      }
    }
  });
});

export {
  World as world,
  engine,
  registerEntity,
};
