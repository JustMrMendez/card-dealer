import { deck } from "./deck.js";
import { createSpanElement } from "./ui.js";
import { spreadCards } from "./ui.js";

export function getRandomCards(deck, num) {
	const randomCards = [];
	const tempDeck = [...deck];
	for (let i = 0; i < num; i++) {
		const randomIndex = Math.floor(Math.random() * tempDeck.length);
		randomCards.push(tempDeck[randomIndex]);
		tempDeck.splice(randomIndex, 1);
	}
	return randomCards;
}

export function generateDeck() {
	const deckContainer = document.querySelector(".deck-container");

	for (let card of deck) {
		const [suit, rank, _] = card;
		const card_container = document.createElement("div");
		card_container.classList.add("deck-card");

		const center = createSpanElement("center", suit);
		const topLeft = createSpanElement("top-left", rank);
		const bottomRight = createSpanElement("bottom-right", rank);
		card_container.appendChild(center);
		card_container.appendChild(topLeft);
		card_container.appendChild(bottomRight);

		card_container.style.transform = `rotate(${Math.floor(
			Math.random() * 5
		)}deg)`;
		card_container.classList.add("flipped");
		deckContainer.appendChild(card_container);
	}
	deckContainer[deckContainer.length - 1].addEventListener(
		"mouseover",
		(e) => {
			e.target.style.transform = "rotate(50deg)";
		}
	);
	// remove transform from last card
}

export function startGame() {
	const menu = document.querySelector(".menu");
	menu.style.animation = "fadeOut 1s forwards";
	menu.style.display = "none";

	const game = document.querySelector(".game");
	game.style.animation = "fadeIn 1s forwards";

	document.querySelector(".hand-container").style.display = "flex";
	document.body.style.alignItems = "end";
	const randomCards = getRandomCards(deck, 5);
	spreadCards(randomCards);

	generateDeck();
}
