// console.log("sanity check");

// 1. Set up board.
// 2. User should be able to click on box and mark the square (with users mark)
// -put onclick directly on the square
// --or--
// -addevent listener
// 3. Mark based on which player is clicking
// 4. Now that we know who's turn it is put their symbol in and change who's turn it is
// 5. We need to check to see if someone won
var whosTurn = 1;
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var player1Squares = []
var player2Squares = []
computerPlayerSquares = []
var winningCombos = [
  ["A1","B1","C1"],
  ["A2","B2","C2"],
  ["A3","B3","C3"],
  ["A1","A2","A3"],
  ["B1","B2","B3"],
  ["C1","C2","C3"],
  ["C1","B2","A3"],
  ["A1","B2","C3"]
  // -----SUPER SECRET WINNING MOVE---------
  // ["C1","C3","A3","A1"]
]

var onePlayerGame = true;
var gameOverYa = false;


var squares = document.getElementsByClassName("square");
for (let i = 0; i < squares.length; i++){
  squares[i].addEventListener("click", function(event){
    markSquare(this);
  });
};


// Create a mark square function
function markSquare(currentSquare){
  var squareResult = ""
  if ((currentSquare.innerHTML === "X")||(currentSquare.innerHTML === "O")){
    squareResult = "This square is taken, BACK OFF."
  }
  else if (gameOverYa){
    squareResult = "Someone already won!"
  }
  else if (whosTurn === 1){
    currentSquare.innerHTML = "X";
    player1.style = "visibility: visible;"
    player2.style = "visibility: hidden;"
    whosTurn = 2;
    player1Squares.push(currentSquare.id);
    checkWin(player1Squares, "1");
    if (onePlayerGame){
      computerMove(computerPlayerSquares, player1Squares);
      checkWin(computerPlayerSquares, "Computer");
    };
  }else{
    // if (onePlayerGame){
    //   computerMove(computerPlayerSquares, player1Squares);
    //   checkWin(computerPlayerSquares, "Computer");
    // };
    currentSquare.innerHTML = "O";
    player2.style = "visibility: visible;"
    player1.style = "visibility: hidden;"
    whosTurn = 1;
    player2Squares.push(currentSquare.id);
    checkWin(player2Squares, "2");
  }

  var messageElement = document.getElementById("message");
  messageElement.innerHTML = squareResult;
};


function computerMove(currentPlayersSquares, opponentSquares){
  var randomTile = 0;
  // randomTile = 0;
  // find random square
  // see if that square is empty
  // if it is, send it to square
    // if it's not, keep looking
  if (gameOverYa){
    console.log("nice");
    return "candy;"
  };
  for (let i = 0; i < winningCombos.length; i++){
    // 
    var squareCount = 0;
    var enemyCount = 0;
    var neededSquare = []
    var enemySquareNeeded = []
    for (let j = 0; j < winningCombos[i].length; j++){
      var winningSquare = winningCombos[i][j];
      neededSquare.push(winningSquare);
      enemySquareNeeded.push(winningSquare);
      if(currentPlayersSquares.indexOf(winningSquare) > -1){
        squareCount++;
        neededSquare.splice(neededSquare.indexOf(winningSquare),1);
      }
      else if (opponentSquares.indexOf(winningSquare) > -1){
        enemyCount++;
        enemySquareNeeded.splice(enemySquareNeeded.indexOf(winningSquare),1);
      }
    }
    if ((squareCount === 2)&&(squares[i].innerHTML !== "X")&&(squares[i].innerHTML !== "O")){
      // markSquare(squares[neededSquare[0]]);
      squares[neededSquare[0]].innerHTML = "O";
      enemySquareNeeded.splice(0,enemySquareNeeded.length);
      whosTurn = 1;
      break;
    }
    else if ((enemyCount === 2)&&(squares[i].innerHTML !== "X")&&(squares[i].innerHTML !== "O")){
      // markSquare(squares[enemySquareNeeded[0]]);
      squares[neededSquare[0]].innerHTML = "O";
      enemySquareNeeded.splice(0,enemySquareNeeded.length);
      whosTurn = 1;
      break;
    }else{
      console.log("Nothin good");
      randomTile +=1;
    }
  }
  if (randomTile = 8){
    randomTile = 0;
    var empty = false;
    while (!empty){
      for (let i = 0; i < squares.length; i++){
        if ((squares[i].innerHTML !== "X")&&(squares[i].innerHTML !== "O")){
          // markSquare(squares[i]);
          squares[neededSquare[0]].innerHTML = "O";
          empty = true;
          enemySquareNeeded.splice(0,enemySquareNeeded.length);
          whosTurn = 1;
          break;
        }
      }
    }
  } 
  // var empty = false;
  // while (!empty){
  //   for (let i = 0; i < squares.length; i++){
  //     if ((squares[i].innerHTML !== "X")&&(squares[i].innerHTML !== "O")){
  //       markSquare(squares[i]);
  //       empty = true;
  //       enemySquareNeeded.splice(0,enemySquareNeeded.length);
  //       whosTurn = 1;
  //       break;
  //     }
  //   }
  // }
  // break;
};


function checkWin(currentPlayersSquares, whoJustWent){
  for(let i = 0; i < winningCombos.length; i++){
    var squareCount = 0;
    // Squares within the combos
    for(let j = 0; j < winningCombos[i].length; j++){
      var winningSquare = winningCombos[i][j];
      // Does the player have this square?
      if(currentPlayersSquares.indexOf(winningSquare) > -1){
        // The index is > -1 which means the player has this square
        squareCount++;
      }
    } 
    // if squareCount is 3, the user had all 3 j's in this i. Winning!
    if (squareCount === 3){
      console.log("player " + whoJustWent + " won the game!");
      gameOver(whoJustWent, winningCombos[i]);
      break;
    }
  }
};


// function checkInfiniteWin(currentPlayerSquares, boardLength, totalSquares){
//   var winningLinesNumber = (boardLength * 2 ) + 2;
//   var winningLines = []
//   for (let i = 0; i < winningLinesNumber; i++){
    
//     winningLines.push()
//   }
// }


function gameOver(whoJustWon,winningCombo){
  var messageElement = document.getElementById("message");
  var message = "Congratulations to player "+ whoJustWon +" You won with "+ winningCombo
  messageElement.innerHTML = message;
  for (let i = 0; i < winningCombo.length;i++){
    document.getElementById(winningCombo[i]).className += " winning-square";
  }
  gameOverYa = true;
};
