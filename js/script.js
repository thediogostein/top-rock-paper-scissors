function addToDOM(result, resultExplanation, playerHand, computerHand) {
  const fightResultTitleEl = document.getElementById('fight-result-title');
  const fightResultSubtitle = document.getElementById('fight-result-subtitle');
  const userHandEl = document.getElementById('user-hand');
  const computerHandEl = document.getElementById('computer-hand');
  let playerHandHTML;
  let computerHandHTML;
  const rockHTML = `<i class="fa-regular fa-hand-back-fist"></i>`;
  const paperHTML = `<i class="fa-regular fa-hand"></i>`;
  const scissorsHTML = `<i class="fa-regular fa-hand-scissors"></i>`;

  console.log(result, playerHand, computerHand);

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
}

function randomHand() {
  const hands = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return hands[randomIndex];
}

function playRound(e) {
  if (e.target.tagName === 'BUTTON') {
    // gerar valor aleatório para máquina
    const computerHand = randomHand();

    // pegar o valor do jogador
    const playerHand = e.target.dataset.hand;

    let result;
    let resultExplanation;

    // comparar os dois valores

    // console.log(`ComputerHand: ${computerHand}\nPlayerHand: ${playerHand}`);

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
    } else if (
      (playerHand === 'rock' && computerHand === 'scissors') ||
      (playerHand === 'paper' && computerHand === 'rock') ||
      (playerHand === 'scissors' && computerHand === 'paper')
    ) {
      result = `Player wins!`;
      resultExplanation = `${
        playerHand[0].toUpperCase() + playerHand.substring(1)
      } beats ${computerHand}`;
      addToDOM(result, resultExplanation, playerHand, computerHand);
    } else {
      result = `Computer wins!`;
      resultExplanation = `${
        computerHand[0].toUpperCase() + computerHand.substring(1)
      } beats ${playerHand}`;
      addToDOM(result, resultExplanation, playerHand, computerHand);
    }
  }
}

function init() {
  const buttonsContainer = document.getElementById('buttonsContainer');
  buttonsContainer.addEventListener('click', playRound);
}

document.addEventListener('DOMContentLoaded', init);
