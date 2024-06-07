const Components = (function () {
  const chooseNames = document.getElementById('playerNames');
  const chooseMark = document.getElementById('playerMark');
  const board = document.getElementById('game');
  const gameBoard = document.getElementById('gameBoard');
  const slots = document.querySelectorAll('.slot');
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');

  let p1Mark = "";
  const p1Name = document.getElementById('firstPlayerName');
  const p2Name = document.getElementById('secondPlayerName');
  const p1DisplayName = document.getElementById('playerOneName');
  const p2DisplayName = document.getElementById('playerTwoName');
  const p1DisplayScore = document.getElementById('playerOneScore');
  const p2DisplayScore = document.getElementById('playerTwoScore');
  const markX = document.querySelector('[data-mark="X"]');
  const markO = document.querySelector('[data-mark="O"]');
  const errorMessageNames = document.getElementById('errorMessageNames');
  const errorMessageMarks = document.getElementById('errorMessageMarks');
  
  markX.addEventListener('click', function () {
    p1Mark = this.dataset.mark;
    markO.classList.remove('selected');
    this.classList.add('selected');
  })
  markO.addEventListener('click', function () {
    p1Mark = this.dataset.mark;
    markX.classList.remove('selected');
    this.classList.add('selected');
  })  

  const displayMenuNames = (display = "flex") => {    
    chooseNames.style.display = display;
  }

  const displayMenuMark = (display = "flex") => {
    chooseMark.style.display = display;
  }

  const displayBoard = (display = "block", mark) => {    
    board.style.display = display;
    gameBoard.classList.add(mark);
  }

  const displayPlayerNames = (p1, p2) => {
    p1DisplayName.textContent = p1;
    p2DisplayName.textContent = p2;    
  }

  const displayModal = (show = true) => {
    if (show) {
      modal.showModal();
    } else
      modal.close();
  }

  const displayErrorNames = (display = "block") => {    
    errorMessageNames.style.display = display;    
    
    setTimeout(() => {
      errorMessageNames.classList.add('vanish');
      errorMessageNames.style.display = "none";
    }, 2000);
    errorMessageNames.classList.remove('vanish');
  }

  const displayErrorMarks = (display = "block") => {    
    errorMessageMarks.style.display = display;
    
    setTimeout(() => {
      errorMessageMarks.classList.add('vanish');
      errorMessageMarks.style.display = "none";
    }, 2000);
    errorMessageMarks.classList.remove('vanish');
  }

  const getP1Name = () => {
    return p1Name.value
  }

  const getP2Name = () => {
    return p2Name.value
  }

  const getMark = () => {    
    return p1Mark;
  }

  const getGameBoard = () => {
    return gameBoard;
  }

  const getSlots = () => {    
    return slots;
  }

  const setModalMessage = (message) => {
    modalMessage.textContent = message;
  }

  const setPlayersScore = (winner) => {
    if (winner.getName() === p1DisplayName.textContent)
      p1DisplayScore.textContent = winner.getVictories();
    else
      p2DisplayScore.textContent = winner.getVictories();
  }

  return {
    displayMenuNames,
    displayMenuMark,
    displayBoard,
    displayPlayerNames,
    displayErrorNames,    
    displayErrorMarks,
    displayModal,
    getP1Name,
    getP2Name,
    getMark,
    getGameBoard,
    getSlots,
    setModalMessage,
    setPlayersScore
  };
})();

const GameBoard = (function () {
  let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
  
  let winnerSlots = [
    //horizontal
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    //diagonal
    [1, 5, 9],
    [3, 5, 7],
    //vertical
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
  ];

  const selectPosition = (position, mark) => {
    switch (position) {
      case "1":        
        board[0][0] = mark;
        winnerSlots[0][0] = mark;
        winnerSlots[3][0] = mark;
        winnerSlots[5][0] = mark;
        break;
      
      case "2":        
        board[0][1] = mark;
        winnerSlots[0][1] = mark;
        winnerSlots[6][0] = mark;        
        break;
      
      case "3":        
        board[0][2] = mark;
        winnerSlots[0][2] = mark;
        winnerSlots[4][0] = mark;
        winnerSlots[7][0] = mark;
        break;
      
      case "4":        
        board[1][0] = mark;
        winnerSlots[1][0] = mark;
        winnerSlots[5][1] = mark;
        break;
      
      case "5":        
        board[1][1] = mark;
        winnerSlots[1][1] = mark;
        winnerSlots[3][1] = mark;
        winnerSlots[4][1] = mark;
        winnerSlots[6][1] = mark;
        break;
      
      case "6":        
        board[1][2] = mark;
        winnerSlots[1][2] = mark;
        winnerSlots[7][1] = mark;
        break;
      
      case "7":        
        board[2][0] = mark;
        winnerSlots[2][0] = mark;
        winnerSlots[4][2] = mark;
        winnerSlots[5][2] = mark;
        break;
      
      case "8":        
        board[2][1] = mark;
        winnerSlots[2][1] = mark;
        winnerSlots[6][2] = mark;
        break;
            
      default:        
        board[2][2] = mark;
        winnerSlots[2][2] = mark;
        winnerSlots[3][2] = mark;
        winnerSlots[7][2] = mark;
        break;
    }
  };

  const winner = (mark) => {    
    let winningPlayer = winnerSlots.some(slots => slots.every(slot => slot === mark));
    return winningPlayer;
  }

  const tie = () => {
    let isTie = board.every(row => row.every(slot => typeof slot !== 'number'));
    return isTie;
  }

  const resetBoard = () => {
    winnerSlots = [
      //horizontal
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      //diagonal
      [1, 5, 9],
      [3, 5, 7],
      //vertical
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ];
    board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const boardSlots = Components.getSlots();
    boardSlots.forEach(slot => {
      slot.classList.value = "slot";
      slot.removeAttribute('disabled');
    })
  }

  return { selectPosition, winner, tie, resetBoard };
})();

const GameFlow = (function () {
  let nameP1;
  let nameP2;
  let markP1;
  let markP2;
  let turn;
  const board = Components.getGameBoard();
  const slots = Components.getSlots();
    
  const setPlayerNames = () => {
    nameP1 = Components.getP1Name();
    nameP2 = Components.getP2Name();
    
    if (!nameP1 || !nameP2) {      
      Components.displayErrorNames();
      return;
    }
    
    Components.displayMenuNames("none");
    Components.displayMenuMark();
    Components.displayPlayerNames(nameP1, nameP2);    
  }

  const setPlayerMarks = () => {
    markP1 = Components.getMark();
    markP2 = markP1 === "X" ? "O" : "X";
    turn = markP1;

    if (markP1) {
      Components.displayMenuMark("none");
      Components.displayBoard(undefined, turn);
      startGame();
      return;
    }

    Components.displayErrorMarks();
  }

  const startGame = () => {
    const player1 = player(nameP1, markP1);
    const player2 = player(nameP2, markP2);    
        
    slots.forEach(slot => {
      slot.addEventListener('click', function() {
        GameBoard.selectPosition(this.dataset.position, turn);
        this.classList.replace('slot', turn);
        this.setAttribute('disabled', "");

        if (GameBoard.winner(turn)) {
          let winner = turn === player1.getMark() ? player1 : player2;
          winner.setVictories();
          Components.setModalMessage(`The winner is ${winner.getName()}`);
          Components.displayModal();
          Components.setPlayersScore(winner);
          GameBoard.resetBoard();
        } else if (GameBoard.tie()) {
          Components.setModalMessage("TIE!");
          Components.displayModal();
          GameBoard.resetBoard();
        }

        swapTurns(turn);
      })


    })
  }

  const swapTurns = (lastTurn) => {    
    turn = turn === "X" ? "O" : "X";
    board.classList.replace(lastTurn, turn);
  }

  return { setPlayerNames, setPlayerMarks };
})();

function player(name = `Player ${Math.floor(Math.random()*100)}`, mark) {
  let playerName = name;
  let playerMark = mark;
  let victories = 0;

  const getName = () => {
    return playerName;
  }

  const getMark = () => {
    return playerMark;
  }

  const getVictories = () => {
    return victories;
  }

  const setVictories = () => {
    victories++;
  }

  return { getName, getMark, getVictories, setVictories };
}