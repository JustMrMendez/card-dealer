import { deck, shuffleDeck } from "./deck.js";
import { createSpanElement } from "./ui.js";
import { spreadCards } from "./ui.js";
import { animateAndRemoveTopDeckCard } from "./animations.js";

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
}

export function startGame() {
	document.body.style.justifyContent = "space-between";
	const menu = document.querySelector(".menu");
	menu.style.animation = "fadeOut 1s forwards";
	menu.style.display = "none";

	const game = document.querySelector(".game");
	game.style.animation = "fadeIn 1s forwards";

	document.querySelector(".game").classList.add("game-active");
	document.querySelector(".hand-container").style.display = "flex";
	const randomCards = getRandomCards(deck, 0);
	spreadCards(randomCards);
	const emptyCard = document.createElement("button");
	emptyCard.classList.add("empty-card");
	emptyCard.innerText = "🃏";
	emptyCard.addEventListener("click", drawCard);
	shuffleDeck(deck);
	generateDeck();
	document.querySelector(".deck-counter").innerText = deck.length.toString();
	document.querySelector(".hand-container").appendChild(emptyCard);
	console.log(deck[0]);
}

let hand = [];
let handValue = 0;
export function drawCard() {
	const deckCounter = document.querySelector(".deck-counter");

	if (deck.length > 0) {
		animateAndRemoveTopDeckCard();
		const topCard = deck.shift();
		// if the hand total value is more than 21, game over
		if (hand.reduce((a, b) => a + b[2], 0) + topCard[2] > 21) {
			alert("Game Over");
			// reset the game
			location.reload();
			return;
		}

		hand.push(topCard);
		handValue += topCard[2];
		document.querySelector(
			".hand-value"
		).innerText = `You have: ${handValue.toString()}`;
		const handContainer = document.querySelector(".hand-container");

		// Clear only card elements
		handContainer.querySelectorAll(".card").forEach((el) => el.remove());

		spreadCards(hand);

		deckCounter.innerText = deck.length.toString();
		console.log(deck[0]);
	}
}
