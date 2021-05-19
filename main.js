// modules: 
const Gameboard = (() => {
    let gameboardArray = [];

    function getGameboardArray() {
        return gameboardArray;
    }

    function addToGameboardArray(symbol, position) {
        gameboardArray[position] = symbol;
    }

    return {
        getGameboardArray,
        addToGameboardArray
}
})(); 

const GameController = (() => {
const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        Gameboard.addToGameboardArray("X", box.getAttribute("data"));
        DisplayController.addToScreen("X", box);
    });
});
})();

const DisplayController = (() => {
    
    function addToScreen(symbol, box) {
        box.textContent = symbol;
    }

    return {
        addToScreen
    }
})();


// objects:
const Player = () => {

    return {

    }
};



