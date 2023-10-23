export function initAnimations() {
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
	document.querySelector(".hand-container").style.display = "none";
}


export function animateAndRemoveTopDeckCard() {
    const deckContainer = document.querySelector(".deck-container");
    const topCardElement = deckContainer.lastChild;
    if (topCardElement) {
        topCardElement.style.animation = "slideAway 2s forwards";
        setTimeout(() => topCardElement.remove(), 1000);
    }
}