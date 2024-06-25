document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cards = [...letters, ...letters];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createBoard() {
        shuffle(cards).forEach(letter => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.letter = letter;
            card.innerText = letter;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;
        this.classList.add('flipped');
        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.letter === secondCard.dataset.letter;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    createBoard();
});