# Infection simulation

Simulate what happens when a virus starts spreading among a population.

## Known Issues

* When the page isn't focused, the game loop doesn't run because requestAnimationFrame is blocked. However, the physics engine that's running on another thread keeps running and since the events that triggers collisions are triggered by the engine itself, the simulation goes on breaking the synch with the renderer. A pause functionality that stops the physics engine should fix it. You can reproduce it by switching to the window of another app and then coming back to the browser tab running the simulation. You will notice a sudden drop in the "infected" chart.
