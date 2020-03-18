import VirusSimulation from './VirusSimulation';

import SpriteSheet from '../images/spritesheet.png';

const game = new VirusSimulation();
const resources = new Map<string, string>();
resources.set('spriteSheet', SpriteSheet);

game.loadResources(resources)
  .then(() => {
    game.startLoop();
  });
