import VirusSimulation from './VirusSimulation';

import SpriteSheet from '../images/spritesheet.png';
import {createHistogram} from './histogram';

createHistogram(document.body, document.querySelector("#first .histogram") as HTMLElement);
const game = new VirusSimulation(
  600,
  300,
  document.querySelector("#first .simulation") as HTMLElement,
  document.body
);
const resources = new Map<string, string>();
resources.set('spriteSheet', SpriteSheet);

game.loadResources(resources)
  .then(() => {
    game.startLoop();
  });
