export function spreadCards(cards) {
	const totalCards = cards.length;
	const maxRotation = 5;
	let cardWidth = 200; // default card width in pixels
	if (totalCards >= 6) {
		cardWidth = 1400 / totalCards; // dynamically adjust card width
	}
	for (let i = 0; i < totalCards; i++) {
		const rotation = maxRotation * (i - (totalCards - 1) / 2);
		let stackMargin = -30 * Math.abs(i - (totalCards - 1) / 2);
		if (i === totalCards - 1) stackMargin = 0;
		const animate = i === totalCards - 1;
		displayCard(cards[i], rotation, stackMargin, cardWidth, animate);
	}
}

export function displayCard(card, rotationDegree, stackMargin, width, animate) {
	let [suit, rank, _] = card;
	const card_container = document.createElement("div");
	card_container.classList.add("card");

	card_container.style.transform = `rotate(${rotationDegree}deg) translateY(25%)`; // set the rotation
	card_container.style.marginRight = `${stackMargin}px`;
	card_container.style.width = `${width}px`; // set the width
	card_container.style.height = `${width * 1.25}px`; // set the height
	if (animate) {
		card_container.style.transform = `translateY(200px) translateX(200px)`;
		setTimeout(() => {
			card_container.style.transition = "transform 0.5s ease-in-out";
			card_container.style.transform = `rotate(${rotationDegree}deg) translateY(25%)`;
		}, 0);
	}
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

export function createSpanElement(spanClass, text) {
	const span = document.createElement("span");
	span.classList.add(spanClass);
	span.innerText = text;
	return span;
}
