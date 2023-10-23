import * as deckModule from "./js/deck.js";
import * as uiModule from "./js/ui.js";
import * as animationsModule from "./js/animations.js";
import * as gameModule from "./js/game.js";

// Initialize the game
animationsModule.initAnimations();
// gameModule.startGame();

document.querySelector(".menu button").addEventListener("click", () => {
	gameModule.startGame();
});
