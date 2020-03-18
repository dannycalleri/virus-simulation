import DungeonCrawler from './DungeonCrawler';
import SpriteSheet from '../images/spritesheet.png';
const game = new DungeonCrawler();
const resources = new Map();
resources.set('spriteSheet', SpriteSheet);
game.loadResources(resources)
    .then(() => {
    game.startLoop();
});
//# sourceMappingURL=index.js.map