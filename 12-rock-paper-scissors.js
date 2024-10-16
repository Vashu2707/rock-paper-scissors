let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

// if (!score) {
// 	score = {
// 		wins: 0,
// 		losses: 0,
// 		ties: 0
// 	};
// }

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if(!isAutoPlaying) {
    intervalId = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000)
    isAutoPlaying = true;
  }else {
    clearInterval(intervalId)
    isAutoPlaying = false;
  }
};

function playGame(playerMove) {
  let computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You Lose.';
    }
    else if (computerMove === 'Paper') {
      result = 'You Win.';
    }
    else if (computerMove === 'Scissors') {
      result = 'Tie.';
    }
    
  }  else if (playerMove === 'Paper') {
      if (computerMove === 'Rock') {
        result = 'You Win.';
      }
      else if (computerMove === 'Paper') {
        result = 'Tie.';
      }
      else if (computerMove === 'Scissors') {
        result = 'You Lose.';
      }

  } else if(playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie.';
    }
    else if (computerMove === 'Paper') {
      result = 'You Lose.';
    }
    else if (computerMove === 'Scissors') {
      result = 'You Win.';
    }
  }

  if (result=== 'You Win.') {
    score.wins += 1;
  }
  else if (result === 'You Lose.') {
    score.losses += 1;
  }
  else if (result === 'Tie.') {
   score.ties += 1;
  };

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `<span class="player-text">You</span>
  <img class="move-icon" type=png src="Images/${playerMove}-emoji.png">
  <img class="move-icon" type=png src="Images/${computerMove}-emoji.png">			
  <span class="player-text">Computer</span>`;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins:${score.wins},Losses:${score.losses},Tie:${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber>=0 && randomNumber<1/3) {
    computerMove = 'Rock';
  }
  else if (randomNumber>= 1/3 && randomNumber<2/3) {
    computerMove = 'Paper';
  }
  else if(randomNumber>= 2/3 && randomNumber<1) {
    computerMove = 'Scissors';
  }
  return computerMove;
}