import './style.css';
import { imgShuffle } from './images';

// State
const state = {
  showing: [], // stores cards that may always be visible
  matches: [], // stores clicked cards to eval if their id match
  prevClicked: null // stores clicked card to prevent matches clicking the same card
};

let images = [];

// Board init
const initBoard = () => {
  const board = document.getElementById('board');
  board.innerHTML = '';
  images = imgShuffle();
  images.forEach((img) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', img.src);
    imgEl.style.visibility = 'hidden';
    card.setAttribute('data-id', String(img.id));
    card.appendChild(imgEl);
    board.appendChild(card);
    clickHandler(card, imgEl); // append click event listener to each card
  });
};

const clickHandler = (card, imgEl) => {
  card.addEventListener('click', () => {
    if (state.prevClicked === card) return; // prevents second click is the same card
    state.prevClicked = card;
    showImg(imgEl, card.getAttribute('data-id'));
  });
};

const showImg = (imgEl, cardId) => {
  imgEl.style.visibility = 'visible';
  state.showing.push({ cardId, imgEl });
  if (state.showing.length < 2) return;
  if (state.showing[0].cardId === state.showing[1].cardId) {
    state.matches.push(state.showing);
    state.showing = [];
    if (state.matches.length === images.length / 2) {
      alert('Congratulations, you did it!');
      state.showing = []
      state.matches = []
      state.prevClicked = null
      initBoard();
    }
    return;
  }
  hideDelay();
};

const hideDelay = () => {
  setTimeout(() => {
    state.showing.forEach(({ cardId, imgEl }) => {
      if (!state.matches.map((item) => item.cardId).includes(cardId)) imgEl.style.visibility = 'hidden';
    });
    state.showing = [];
    state.prevClicked = undefined;
  }, 500);
};

// Mix button: resets the game.
const mixBtn = document.getElementById('mix-btn');
mixBtn.addEventListener('click', initBoard);

// Initialize
initBoard();
