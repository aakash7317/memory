const cards = ['🍎', '🍌', '🍇', '🍓', '🍎', '🍌', '🍇', '🍓'];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  const shuffled = shuffle(cards);

  shuffled.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.innerText = this.dataset.symbol;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;

    if (matchedPairs === cards.length / 2) {
      document.getElementById('message').innerText = "🎉 You Win!";
    }

    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.innerText = '';
      secondCard.innerText = '';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

createBoard();
