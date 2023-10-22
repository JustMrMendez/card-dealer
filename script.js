const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

const deck = [];

for (let suit of suits) {
    for (let rank of ranks) {
        let value = parseInt(rank);
        if (isNaN(value)) {
            if (rank === 'ace') {
                value = 1;
            } else {
                value = 10;
            }
        }
        deck.push([getSuitSymbol(suit), getRankSymbol(rank), value]);
    }
}

function getSuitSymbol(suit) {
    switch (suit) {
        case 'hearts':
            return '♥️';
        case 'diamonds':
            return '♦️';
        case 'clubs':
            return '♣️';
        case 'spades':
            return '♠️';
        default:
            return '';
    }
}

function getRankSymbol(rank) {
    switch (rank) {
        case 'ace':
            return 'A';
        case 'jack':
            return 'J';
        case 'queen':
            return 'Q';
        case 'king':
            return 'K';
        default:
            return rank;
    }
}

window.onload = () => {
    // document.getElementById('deck').innerHTML = deck;
    let [suit, rank, value ] = deck[Math.floor(Math.random() * deck.length)]
    let card = document.querySelector('.card');
    card.style.padding = '1rem';
    card.style.fontSize = '3rem';
    //  styles
    topLeft.style.position = 'absolute';
    topLeft.style.top = '10px';
    topLeft.style.left = '15px';
    bottomRight.style.position = 'absolute';
    bottomRight.style.bottom = '10px';
    bottomRight.style.right = '15px';
    if (suit === '♥️' || suit === '♦️') {
        card.style.color = 'red';
    }
    let topLeft = document.createElement('span');
    let center = document.createElement('span');
    let bottomRight = document.createElement('span');
    card.appendChild(topLeft);
    card.appendChild(center);
    card.appendChild(bottomRight);
    
}
center.innerText = suit;
bottomRight.innerText = rank;
topLeft.innerText = rank;