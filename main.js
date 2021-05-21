// modules: 
const Gameboard = (() => {
    let _gameboardArray = [];
    
    function getGameboardArray() {
        return _gameboardArray;
    }

    function addToGameboardArray(symbol, position) {
        _gameboardArray[position] = symbol;
    }

    function resetGameBoardArray() {
        _gameboardArray = [];
    }

    return {
        getGameboardArray,
        addToGameboardArray,
        resetGameBoardArray
}
})(); 

const GameController = (() => {
let currentTurn;

document.querySelector("#startGame").addEventListener("click", playGame);
function playGame() {
    // hide start button and show reset button instead
    DisplayController.hideElement(document.querySelector("#startGame")); 
    const resetGameButton = document.querySelector("#resetGame")
    DisplayController.showElement(resetGameButton);
    resetGameButton.addEventListener("click", resetGame);
    
    const playerOne = Player("X", "Player One");
    const playerTwo = Player("O", "Player Two");
    let currentPlayer;
    let gameIsOver;
    currentTurn = 1;
    currentPlayer = playerOne;

    document.querySelectorAll(".box").forEach((box) => {
        box.addEventListener("click", () => {
            if(Gameboard.getGameboardArray()[box.getAttribute("data")] !== undefined || gameIsOver) { // don't allow players to choose fields already taken or when game's over
                return;
            } 
            Gameboard.addToGameboardArray(currentPlayer.getSymbol(), box.getAttribute("data"));
            DisplayController.refreshGameboard();
            
            if(checkForWinner(currentPlayer)) { // check for winner after every click on a field
                DisplayController.addToScreen(`${currentPlayer.getName()} wins!`, document.querySelector("#results"));
                gameIsOver = true;
                return;
            }

            if(currentPlayer === playerOne) {
                currentPlayer = playerTwo;
            } else {
                currentPlayer = playerOne;
            }
            
            if(currentTurn === 9) { // if turn is 9 and no winner has been declared the game ends in a tie
                DisplayController.addToScreen("It's a tie!", document.querySelector("#results"));
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

function resetGame() {
    /*DisplayController.hideElement(document.querySelector("#resetGame")); 
    DisplayController.showElement(document.querySelector("#startGame"));*/
    DisplayController.addToScreen("", document.querySelector("#results"))
    Gameboard.resetGameBoardArray();
    DisplayController.refreshGameboard();
    currentTurn = 1;
    gameIsOver = false;
    playGame();
}
})();

const DisplayController = (() => {  
    function addToScreen(content, domElement) {
        domElement.textContent = content;
    }

    function hideElement(domElement) {
        domElement.style.display = "none";
    }

    function showElement(domElement) {
        domElement.style.display = "block"
    }

    function refreshGameboard() {
        document.querySelectorAll(".box").forEach((box) => {
        addToScreen(Gameboard.getGameboardArray()[box.getAttribute("data")], box) // display the corresponding symbol of the gameboard array in each box
    });
}

    return {
        addToScreen,
        hideElement,
        showElement,
        refreshGameboard
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



