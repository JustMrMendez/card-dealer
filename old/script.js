const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = [
	"ace",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"jack",
	"queen",
	"king",
];
const deck = buildDeck(suits, ranks);

function buildDeck(suits, ranks) {
	const deck = [];
	for (let suit of suits) {
		for (let rank of ranks) {
			let value = isNaN(parseInt(rank))
				? rank === "ace"
					? 1
					: 10
				: parseInt(rank);
			deck.push([getSuitSymbol(suit), getRankSymbol(rank), value]);
		}
	}
	return deck;
}

function getSuitSymbol(suit) {
	const symbols = {
		hearts: "♥️",
		diamonds: "♦️",
		clubs: "♣️",
		spades: "♠️",
	};
	return symbols[suit] || "";
}

function getRankSymbol(rank) {
	const symbols = {
		ace: "A",
		jack: "J",
		queen: "Q",
		king: "K",
	};
	return symbols[rank] || rank;
}

window.onload = () => {
	// animate the menu in after 1 second
	setTimeout(() => {
		document.querySelector(".menu").style.animation = "fadeIn 1s forwards";
	}, 0);

	const menuButtons = document.querySelectorAll(".menu button");
	const delayStep = 0.2; // in seconds
	const marginLeftStep = 60; // in percentage

	menuButtons.forEach((button, index) => {
		const delay = delayStep * index;
		const marginLeft = -marginLeftStep * (index + 1);

		button.style.animationDelay = `${delay}s`;
		button.style.marginLeft = `${marginLeft}%`;
	});
	document.querySelector(".menu").style.marginLeft =
		15 + menuButtons.length * 4.5 + "rem";

	// game logic
	console.log("No cards left in the deck!");
	document.querySelector(".hand-container").style.display = "none";
};

function getRandomCards(deck, num) {
	const randomCards = [];
	const tempDeck = [...deck];
	for (let i = 0; i < num; i++) {
		const randomIndex = Math.floor(Math.random() * tempDeck.length);
		randomCards.push(tempDeck[randomIndex]);
		tempDeck.splice(randomIndex, 1);
	}
	return randomCards;
}

function spreadCards(cards) {
	const totalCards = cards.length;
	const maxRotation = 5;
	let cardWidth = 200; // default card width in pixels
	if (totalCards >= 6) {
		cardWidth = 1700 / totalCards; // dynamically adjust card width
	}
	for (let i = 0; i < totalCards; i++) {
		const rotation = maxRotation * (i - (totalCards - 1) / 2);
		let stackMargin = -30 * Math.abs(i - (totalCards - 1) / 2);
		if (i === totalCards - 1) stackMargin = 0;
		displayRandomCard(cards[i], rotation, stackMargin, cardWidth);
	}
}

function displayRandomCard(card, rotationDegree, stackMargin, width) {
	let [suit, rank, _] = card;
	const card_container = document.createElement("div");
	card_container.classList.add("card");

	card_container.style.transform = `rotate(${rotationDegree}deg) translateY(25%)`; // set the rotation
	card_container.style.marginRight = `${stackMargin}px`;
	card_container.style.width = `${width}px`; // set the width
	card_container.style.height = `${width * 1.25}px`; // set the height

	document.querySelector(".hand-container").appendChild(card_container);
	if (suit === "♥️" || suit === "♦️")
		card_container.classList.add("red-card");

	const center = createSpanElement("center", suit);
	const topLeft = createSpanElement("top-left", rank);
	const bottomRight = createSpanElement("bottom-right", rank);
	card_container.appendChild(center);
	card_container.appendChild(topLeft);
	card_container.appendChild(bottomRight);
}

function createSpanElement(spanClass, text) {
	const span = document.createElement("span");
	span.classList.add(spanClass);
	span.innerText = text;
	return span;
}

// start game on button click
function startGame() {
	const menu = document.querySelector(".menu");
	menu.style.animation = "fadeOut 1s forwards";
    menu.style.display = "none";

	const game = document.querySelector(".game");
	game.style.animation = "fadeIn 1s forwards";
    
    document.querySelector(".hand-container").style.display = "flex";
	document.body.style.alignItems = "end"
    const randomCards = getRandomCards(deck, 5);
	spreadCards(randomCards);

    generateDeck();
}

// render the full deck
function generateDeck() {
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

        deckContainer.appendChild(card_container);
    }
}