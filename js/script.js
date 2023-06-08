let playerScore = 0;
let computerScore = 0;
let needsReset = false;

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  needsReset = false;

  const fightResultTitleEl = document.getElementById('fight-result-title');
  const fightResultSubtitle = document.getElementById('fight-result-subtitle');
  const userHandEl = document.getElementById('user-hand');
  const computerHandEl = document.getElementById('computer-hand');
  let playerScoreEl = document.getElementById('player-score');
  let computerScoreEl = document.getElementById('computer-score');

  fightResultTitleEl.innerText = 'Choose your weapon';
  fightResultSubtitle.innerText = 'First to score 5 points wins the game';
  userHandEl.innerText = '?';
  computerHandEl.innerText = '?';
  playerScoreEl.innerText = playerScore;
  computerScoreEl.innerText = computerScore;
}

function announceWinner(winner) {
  const dialogEl = document.querySelector('dialog');
  const btnPlayAgain = document.getElementById('btn-play-again');
  const btnNoThanks = document.getElementById('btn-no-thanks');
  dialogEl.showModal();
  const dialogResultEl = document.querySelector('#dialog-result');
  if (winner === 'player') {
    dialogResultEl.innerText = 'You won!';
  } else {
    dialogResultEl.innerText = 'You lost!';
  }

  btnPlayAgain.addEventListener('click', () => {
    resetGame();
    dialogEl.close();
  });
  btnNoThanks.addEventListener('click', () => dialogEl.close());
}

function checkEndGame() {
  let winner;

  if (playerScore === 5) {
    winner = 'player';
    needsReset = true;
    announceWinner(winner);
  } else if (computerScore === 5) {
    winner = 'computer';
    needsReset = true;
    announceWinner(winner);
  }
}

function addToDOM(result, resultExplanation, playerHand, computerHand) {
  const fightResultTitleEl = document.getElementById('fight-result-title');
  const fightResultSubtitle = document.getElementById('fight-result-subtitle');
  const userHandEl = document.getElementById('user-hand');
  const computerHandEl = document.getElementById('computer-hand');
  let playerScoreEl = document.getElementById('player-score');
  let computerScoreEl = document.getElementById('computer-score');
  let playerHandHTML;
  let computerHandHTML;
  const rockHTML = `<i class="fa-regular fa-hand-back-fist"></i>`;
  const paperHTML = `<i class="fa-regular fa-hand"></i>`;
  const scissorsHTML = `<i class="fa-regular fa-hand-scissors"></i>`;

  fightResultTitleEl.innerText = result;
  fightResultSubtitle.innerText = resultExplanation;

  if (playerHand === 'rock') {
    playerHandHTML = rockHTML;
  }
  if (playerHand === 'paper') {
    playerHandHTML = paperHTML;
  }
  if (playerHand === 'scissors') {
    playerHandHTML = scissorsHTML;
  }

  if (computerHand === 'rock') {
    computerHandHTML = rockHTML;
  }
  if (computerHand === 'paper') {
    computerHandHTML = paperHTML;
  }
  if (computerHand === 'scissors') {
    computerHandHTML = scissorsHTML;
  }

  userHandEl.innerHTML = playerHandHTML;
  computerHandEl.innerHTML = computerHandHTML;
  playerScoreEl.innerText = playerScore;
  computerScoreEl.innerText = computerScore;
}

function randomHand() {
  const hands = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return hands[randomIndex];
}

function playRound(e) {
  console.log(needsReset);
  if (needsReset === true) {
    announceWinner();
  } else {
    if (e.target.tagName === 'BUTTON') {
      const computerHand = randomHand();

      const playerHand = e.target.dataset.hand;

      let result;
      let resultExplanation;

      if (
        (playerHand === 'rock' && computerHand === 'rock') ||
        (playerHand === 'paper' && computerHand === 'paper') ||
        (playerHand === 'scissors' && computerHand === 'scissors')
      ) {
        result = `It's a tie!`;
        resultExplanation = `${
          playerHand[0].toUpperCase() + playerHand.substring(1)
        } ties with ${computerHand}`;
        addToDOM(result, resultExplanation, playerHand, computerHand);
        checkEndGame();
      } else if (
        (playerHand === 'rock' && computerHand === 'scissors') ||
        (playerHand === 'paper' && computerHand === 'rock') ||
        (playerHand === 'scissors' && computerHand === 'paper')
      ) {
        result = `Player wins!`;
        playerScore++;
        resultExplanation = `${
          playerHand[0].toUpperCase() + playerHand.substring(1)
        } beats ${computerHand}`;
        addToDOM(result, resultExplanation, playerHand, computerHand);
        checkEndGame();
      } else {
        result = `Computer wins!`;
        computerScore++;
        resultExplanation = `${
          computerHand[0].toUpperCase() + computerHand.substring(1)
        } beats ${playerHand}`;
        addToDOM(result, resultExplanation, playerHand, computerHand);
        checkEndGame();
      }
    }
  }
}

function init() {
  const buttonsContainer = document.getElementById('buttonsContainer');

  buttonsContainer.addEventListener('click', playRound);
}

document.addEventListener('DOMContentLoaded', init);
