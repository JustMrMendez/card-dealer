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

export function buildDeck(suits, ranks) {
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

export function getSuitSymbol(suit) {
	const symbols = {
		hearts: "♥️",
		diamonds: "♦️",
		clubs: "♣️",
		spades: "♠️",
	};
	return symbols[suit] || "";
}

export function getRankSymbol(rank) {
	const symbols = {
		ace: "A",
		jack: "J",
		queen: "Q",
		king: "K",
	};
	return symbols[rank] || rank;
}

export function shuffleDeck(deck) {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

export const deck = buildDeck(suits, ranks);