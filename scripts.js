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
    // alert("This square is taken, thief")
    squareResult = "This square is taken, BACK OFF."
  }
  else if (whosTurn === 1){
    currentSquare.innerHTML = "X";
    whosTurn = 2;
  }else{
    currentSquare.innerHTML = "O";
    whosTurn = 1;
  }
  var messageElement = document.getElementById("message");
  messageElement.innerHTML = squareResult;
};