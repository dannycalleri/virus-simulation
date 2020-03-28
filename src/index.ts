import VirusSimulation from './VirusSimulation';

import SpriteSheet from '../images/spritesheet.png';
import {createHistogram} from './histogram';

createHistogram(document.body);
const game = new VirusSimulation(800, 400, document.body);
const resources = new Map<string, string>();
resources.set('spriteSheet', SpriteSheet);

game.loadResources(resources)
  .then(() => {
    game.startLoop();
  });
