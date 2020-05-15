// initiate the numbers of squares
var numOfSquares = 9;
// create the array for the random colors
var colors = [];
// create an empty variable for the color to find
var pickedColor;
// path to all the squares classes
var squareColor = document.querySelectorAll(".square");
// path to the messages we receive if the choice is right or wrong
var message = document.querySelector("#results");
// path to the head section
var h1 = document.querySelector("#header");
// path to the play again button
var resetButton = document.querySelector("#newGame");
// path to the different difficulties
var modes = document.querySelectorAll(".mode");
// path to display the color to find
var displayColor = document.querySelector("#displayColor");

function reset(){
    // generate new colors
    colors = generateRandomColors(numOfSquares);
    // pick color
    pickedColor = randomColor();
    // display in title
    displayColor.textContent = pickedColor;
    // change the text to let player know the usage of the button
    resetButton.textContent = "New Colors";
    // empty the result message
    message.textContent = "";
    // loop through the squares to display the right amount depending on difficulty
    for (i = 0; i < squareColor.length; i++) {
        if (colors[i]) {
            // makes all the squares visible
            squareColor[i].style.display = "block";
            // changes the color of the useful squares
            squareColor[i].style.backgroundColor = colors[i];
        } else {
            // hides useless squares
            squareColor[i].style.display = "none";
        }
    }
    // change back the background color of the head section to be regular color
    h1.style.backgroundColor = "steelblue";
}

function playGame(){
    setUpModes();
    setUpSquares();
    reset();
}

function setUpModes(){
    // loop through difficulty to set up the right one
    for(i = 0; i < modes.length; i++) {
        // click event listener to choose the difficulty
        modes[i].addEventListener("click", function() {
            // manual setup to remove the selected css class
            modes[0].classList.remove("selected");
            modes[1].classList.remove("selected");
            modes[2].classList.remove("selected");
            // add the css class to the chosen difficulty
            this.classList.add("selected");
            // amount of squares visible depending on choice
            if (this.textContent === "Kouhai") {
                numOfSquares = 3;
            } else if (this.textContent === "Senpai") {
                numOfSquares = 6;
            } else {
                numOfSquares = 9;
            }
            reset();
        })
    }
}

function setUpSquares() {
    // loop through squares to add an event listener to all of the squares
    for (i = 0; i < squareColor.length; i++) {
        // click listener to squares, make disappear if not pickedColor
        squareColor[i].addEventListener("click", function(){
            // create the winner color
            var clickedColor = this.style.backgroundColor;
            // verify if the right color is chosen
            if (clickedColor !== pickedColor) {
                // change background to dark and show message if wrong choice
                this.style.backgroundColor = "#232323";
                message.textContent = "Try Again";
            } else {
                // congratulate the player for good choice
                message.textContent = "Good Choice!";
                // change all the squares background color to be the good color
                changeColors(clickedColor);
                // change the header background color to be the good one
                h1.style.backgroundColor = clickedColor;
                // change the new color button to say play again
                resetButton.textContent = "Play Again?";
            }
        })
    }
}

function changeColors(color) {
    // change the background color from the squares to be the generated colors
    for (i = 0; i < colors.length; i++) {
        squareColor[i].style.backgroundColor = color;
    }
}

function randomColor(){
    // choose a random color from the colors radomly generated
    var random = Math.floor(Math.random() * colors.length)
    return colors[random];
}

function generateRandomColors(num) {
    // make an array
    var arr = [];
    // push random rgb colors in the empty array depending on the amount of squares
    for (i = 0; i < num; i++) {
        arr.push(helpGen());
    }
    return arr;
}

function helpGen() {
    // random numbers between 0 and 255
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    // string to push in the array of generateRandomColors
    return rgb = "rgb(" + red + ", " + green + ", "+ blue +")"
}

playGame();

resetButton.addEventListener("click", function() {
    reset();
})