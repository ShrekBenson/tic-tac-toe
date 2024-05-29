gameBoard = (function () {
  const board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]    
  ];

  const winnerSlots = [
    //horizontal
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [3, 2, 1],
    [6, 5, 4],
    [9, 8, 7],
    //diagonal
    [1, 5, 9],
    [3, 5, 7],
    [9, 5, 1],
    [7, 5, 3],
    //vertical
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 2]
  ];

  const selectPosition = (position, mark) => {
    switch (position) {
      case "1":
        board[0][0] = mark;
        break;
      
      case "2":
        board[0][1] = mark;
        break;
      
      case "3":
        board[0][2] = mark;
        break;
      
      case "4":
        board[1][0] = mark;
        break;
      
      case "5":
        board[1][1] = mark;
        break;
      
      case "6":
        board[1][2] = mark;
        break;
      
      case "7":
        board[2][0] = mark;
        break;
      
      case "8":
        board[2][1] = mark;
        break;
            
      default:
        board[2][2] = mark;
        break;
    }
  };

  const boardStatus = (player1, player2) => {
    console.log(`   ${player1.getName()}: ${player1.getMark()}`, " vs ", `${player2.getName()}: ${player2.getMark()}`);
    board.forEach(row => {
      console.log("\t\t", row.join(" | "));
    })    
    console.log("\n");
  }

  const winner = (playerSlots) => {
    let winningPlayer = winnerSlots.some((slots) => {
      return slots.every((slot, index) => playerSlots[index] === slot);
    });

    return winningPlayer;
  }

  return { selectPosition, boardStatus, winner };
})();

game = (function () {
  const validMarks = /[xXoO]/;
  
  const startGame = () => {    
    let firstPlayerName = prompt("What's your name player 1?");
    let secondPlayerName = prompt("What's your name player 2?");
    let firstPlayerMark = prompt('Which is your mark Player 1?\nX : O').toUpperCase();
    let secondPlayerMark = firstPlayerMark === "X" ? "O" : "X";

    while (!firstPlayerMark.match(validMarks)) {
      firstPlayerMark = prompt('Which is your mark Player 1?\nX : O').toUpperCase();
      secondPlayerMark = firstPlayerMark === "X" ? "O" : "X";
    }    

    let player1 = player(firstPlayerName, firstPlayerMark);
    let player2 = player(secondPlayerName, secondPlayerMark);
    gameBoard.boardStatus(player1, player2);

    player1.setMyTurn();
    while (true){            
      if (player1.getMyTurn()) {        
        swapTurns(player1, player2);
        gameBoard.boardStatus(player1, player2);

        if(gameBoard.winner(player1.getSelectedSlots()))
          return console.log(`The winner is ${player1.getName()}: ${player1.getMark()}`);
      }
      else {        
        swapTurns(player2, player1);
        gameBoard.boardStatus(player1, player2);

        if(gameBoard.winner(player2.getSelectedSlots()))
          return console.log(`The winner is ${player2.getName()}: ${player2.getMark()}`);
      }
    }
  }

  const swapTurns = (firstPlayer, secondPlayer) => {
    let validPositions = /[1-9]/;

    let position = prompt(`${firstPlayer.getName()} turn\nWich square do you gonna mark (1-9)?`);
    while (!position.match(validPositions)) {
      position = prompt(`${firstPlayer.getName()} turn\nPlease, select any digit from 1-9`);
    }
    firstPlayer.setSelectedSlots(Number(position));

    gameBoard.selectPosition(position, firstPlayer.getMark());    
    firstPlayer.setMyTurn();    
    secondPlayer.setMyTurn();
  }  

  return { startGame };
})();

function player(name, mark) {
  let playerName = name;
  let playerMark = mark;
  let selectedSlots = [];
  let myTurn = false;

  const getName = () => {
    return playerName;
  }

  const getMark = () => {
    return playerMark;
  }

  const setMyTurn = () => {
    myTurn = !myTurn;
  }

  const getMyTurn = () => {
    return myTurn;
  }

  const setSelectedSlots = slot => {
    selectedSlots.push(slot);
  }

  const getSelectedSlots = () => {
    return selectedSlots;
  }

  return { getName, getMark, setMyTurn, getMyTurn, setSelectedSlots, getSelectedSlots };
}

game.startGame();