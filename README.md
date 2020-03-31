# Infection simulation

During the global quarantine caused by COVID-19, I was literally blown away by [this article](https://www.washingtonpost.com/graphics/2020/world/corona-simulator/) by Harry Stevens in the Washington Post.

Here I'm trying to reproduce what he did and simulate what happens when a virus starts spreading among a population.

I used some technology that I wrote for games in the past, in particular the ones coming from my [Dungeon Crawler demo](https://github.com/dannycalleri/dungeon-crawler), so it was quite easy to rebuild everything.

Hope you like it.

## Known Issues

* When the page isn't focused, the game loop doesn't run because requestAnimationFrame is blocked. However, the physics engine that's running on another thread keeps running and since the events that triggers collisions are triggered by the engine itself, the simulation goes on breaking the synch with the renderer. A pause functionality that stops the physics engine should fix it. You can reproduce it by switching to the window of another app and then coming back to the browser tab running the simulation. You will notice a sudden drop in the "infected" chart.
