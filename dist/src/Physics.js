import { World, Engine } from "matter-js";
const engine = Engine.create();
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;
// engine.enableSleeping = true;
export { World as world, engine, };
//# sourceMappingURL=Physics.js.map