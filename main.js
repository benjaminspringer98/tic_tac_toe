// modules: 
const Gameboard = (() => {
    let _gameboardArray = [];
    
    function getGameboardArray() {
        return _gameboardArray;
    }

    function addToGameboardArray(symbol, position) {
        _gameboardArray[position] = symbol;
    }

    return {
        getGameboardArray,
        addToGameboardArray
}
})(); 

const GameController = (() => {

document.querySelector("#startGame").addEventListener("click", playGame);
function playGame() {
    const playerOne = Player("X", "Player One");
    const playerTwo = Player("O", "Player Two");
    let currentPlayer;
    let gameIsOver;
    let currentTurn = 1;
    currentPlayer = playerOne;

    document.querySelectorAll(".box").forEach((box) => {
        box.addEventListener("click", () => {
            if(Gameboard.getGameboardArray()[box.getAttribute("data")] !== undefined || gameIsOver) { // don't allow players to choose fields already taken or when game's over
                return;
            } 
            Gameboard.addToGameboardArray(currentPlayer.getSymbol(), box.getAttribute("data"));
            DisplayController.addToScreen(currentPlayer.getSymbol(), box);
            
            if(checkForWinner(currentPlayer)) { // check for winner after every click on a field
                alert(currentPlayer.getName() + "wins");
                gameIsOver = true;
                return;
            }

            if(currentPlayer === playerOne) {
                currentPlayer = playerTwo;
            } else {
                currentPlayer = playerOne;
            }
            
            if(currentTurn === 9) { // if turn is 9 and no winner has been declared the game ends in a tie
                alert("Tie!");
                gameIsOver = true;
                return;
            }
            currentTurn++;
        });     
    });        
}

// hard coded, probably not best practice:
function checkForWinner(currentPlayer) {
    let gameboard = Gameboard.getGameboardArray();
    let symbol = currentPlayer.getSymbol();
    if (gameboard[0] === symbol && gameboard[1] === symbol && gameboard[2] === symbol ||
        gameboard[3] === symbol && gameboard[4] === symbol && gameboard[5] === symbol ||
        gameboard[6] === symbol && gameboard[7] === symbol && gameboard[8] === symbol ||
        gameboard[0] === symbol && gameboard[3] === symbol && gameboard[6] === symbol ||
        gameboard[1] === symbol && gameboard[4] === symbol && gameboard[7] === symbol ||
        gameboard[2] === symbol && gameboard[5] === symbol && gameboard[8] === symbol ||
        gameboard[0] === symbol && gameboard[4] === symbol && gameboard[8] === symbol ||
        gameboard[2] === symbol && gameboard[4] === symbol && gameboard[6] === symbol) {
        return currentPlayer;
    }
}
})();

const DisplayController = (() => {  
    function addToScreen(symbol, domElement) {
        domElement.textContent = symbol;
    }

    return {
        addToScreen
    }
})();


// objects:
const Player = (symbol, name) => {
    const getSymbol = () => symbol;
    const getName = () => name;

    return {
       getSymbol, 
       getName
    }
};



