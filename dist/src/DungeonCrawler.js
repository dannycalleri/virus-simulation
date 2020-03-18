var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Game from './Game';
import Scene from './Scene';
import Particle from './Particle';
import Wall from './Wall';
export default class DungeonCrawler extends Game {
    constructor() {
        super();
        this.particle = undefined;
        this.particle2 = undefined;
        this.setup();
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const scene = new Scene();
            this.currentScene = scene;
            scene.pivot = {
                x: -this.width / 2,
                y: -this.height / 2,
            };
            const walls = [
                // top
                new Wall(0, -400 / 2 + 80 / 2, 800, 80),
                // bottom
                new Wall(0, 400 / 2 - 80 / 2, 800, 80),
                // left
                new Wall(-800 / 2 + 80 / 2, 0, 80, 400),
                // right
                new Wall(800 / 2 - 80 / 2, 0, 80, 400),
            ];
            walls.forEach(wall => {
                scene.addChild(wall);
            });
            const particles = [];
            const rectangles = new Array(50).fill(0).map((_, i) => {
                return {
                    x: Math.floor(Math.random() * 300) * (Math.random() < 0.5 ? 1 : -1),
                    y: Math.floor(Math.random() * 150) * (Math.random() < 0.5 ? 1 : -1),
                    width: 15,
                    height: 30,
                };
            });
            rectangles.forEach((rect) => {
                const particle = new Particle(rect.x, rect.y, rect.width, rect.height);
                particles.push(particle);
                scene.addChild(particle);
            });
            const id = setInterval(() => {
                particles.forEach(particle => {
                    particle.excite();
                });
            }, 1000);
        });
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}
//# sourceMappingURL=DungeonCrawler.js.map