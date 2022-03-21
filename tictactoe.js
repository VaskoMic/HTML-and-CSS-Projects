let activePlayer = 'X'; //Track turn
let selectedSquares = []; //Array to store number of moves to determine win condition

//function to place X or O in square
function placeXorO(squareNumber) { //Condition ensures square hasnt been selected previously
//Uses .some() to check each element of array to see if it has been selected already
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber); //Retrieves html element id that was clicked

        if (activePlayer === 'X') { //Checks whose turn it is
            select.style.backgroundImage = 'url("x.png")'; //If active player is X, X is placed
        }
        else { //Can only be X or O so if not X is O
            select.style.backgroundImage = 'url("o.png")'; // If activeplayer is O, place O.png
        }
        //Concatenate squareNumber and activePlayer and adds to array
        selectedSquares.push(squareNumber + activePlayer);
        //Call function to check win condition
        checkWinConditions();
        //Change active player
        if (activePlayer === 'X') {
            activePlayer = 'O'; //If its X change to O
        }
        else { //If anything but X change to X
            activePlayer = 'X';
        }
        audio('./Media/place.mp3'); //plays place sound

        if (activePlayer === 'O') { //Check if computer's turn
            disableClick(); //Disables clicking while computer picks
            setTimeout(function () { computersTurn(); }, 1000); //Waits 1 second to place image and enable click
        }
        return true; //Needs to return true for computerTurn() to work
    }

    function computersTurn() { //Computer picks a random square
        let success = false; //Need boolean for while loop
        let pickASquare; //Stores random num 0-8
        while (!success) { //Condition lets while loop keep trying if square has been selected previously
            pickASquare = String(Math.floor(Math.random() * 9)); //Picks random num 0-8
            if (placeXorO(pickASquare)) { //If true square hasnt been selected
                placeXorO(pickASquare); //Calls the function
                success = true; //Changes boolean, ends while loop
            };
        }
    }
}

//Function parses selectedSquares array to find win conditions, drawWinLine draws a line if condition is met
function checkWinConditions() {
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100); } //X 0,1,2 win
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304); } //X 3,4,5 win
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508); } //X 6,7,8 win
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558); } //X 0,3,6 win
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558); } //X 1,4,7 win
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558); } //X 2,5,8 win
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90); } //X 6,4,2 win
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520); } //X 0,4,8 win
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100); } //O 0,1,2 win
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304); } //O 3,4,5 win
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); } //O 6,7,8 win
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558); } //O 0,3,6 win
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558); } //O 1,4,7 win
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558); } //O 2,5,8 win
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); } //O 6,4,2 win
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); } //O 0,4,8 win
    
    else if (selectedSquares.length >= 9) { //Checks for tie if none of above hit and 9 are picked
        audio('./Media/tie.mp3'); //Plays tie sound
        setTimeout(function () { resetGame(); }, 1000); //Delay before resetGame is called
    }
    function arrayIncludes(squareA, squareB, squareC) { //Check if array has 3 strings to check win conditions
        const a = selectedSquares.includes(squareA); //Looks for 3 in a row
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        if (a === true && b === true && c === true) { return true;} //If all 3 vars are in array true returns and else if execute drawWinLine
    }
}

function disableClick() { //Makes game temporarily unclickable
    body.style.pointerEvents = 'none'; //Makes body unclickable
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000); //Clickable again after 1 second
}

function audio(audioURL) { //Takes string param of the path set for sounds
    let audio = new Audio(audioURL); //Make new audio object and pass it the path as param
    audio.play(); //Play method plays audio sound
}

function drawWinLine(coordX1, coordY1, coordX2, coordY2) { //Draw win lines with canvas
    const canvas = document.getElementById('win-lines'); //line accesses the canvas element
    const c = canvas.getContext('2d'); //accesses methods and properties in canvas
    let x1 = coordX1, //Indicates where the start of a lines x axis is
        y1 = coordY1, //Start of lines y axis
        x2 = coordX2, //End of lines x axis
        y2 = coordY2, //End of lines y axis
        x = x1, //Stores temp x axis data as we update animation
        y = y1; //Stores temp y data as above


    function animateLineDrawing() { //Function interacts with canvas
        const animationLoop = requestAnimationFrame(animateLineDrawing); //creates loop for when game ends it restarts
        c.clearRect(0, 0, 608, 608); //Clears content from last loop
        c.beginPath(); // starts new path
        c.moveTo(x1, y1); //moves us to starting point for new line
        c.lineTo(x, y); // indicates line end point
        c.lineWidth = 10; //Set width
        c.strokeStyle = 'rgba(70,255,33,.8)'; //sets colour of line
        c.stroke(); //Draws everything specified above
        if (x1 <= x2 && y1 <= y2) { //condition checks if we're reached the endpoint
            if (x < x2) { x += 10; } //Condition adds 10 to previous end x point
            if (y < y2) { y += 10; } //Condition adds 10 to previous end y point
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); } //Condition cancels our animation loop if reach the end points
        }
        //Condition required for 6,4,2 win condition
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }

    function clear() { //Clears canvas after win line drawn
        const animationLoop = requestAnimationFrame(clear); //Start animation loop
        c.clearRect(0, 0, 608, 608); //Clears canvas
        cancelAnimationFrame(animationLoop); //stops animation loop
    }

    

disableClick(); //Function to disable clicking while win sound plays
audio('./Media/winGame.mp3'); //line plays the win sound
animateLineDrawing(); //calls main animation loop
setTimeout(function () { clear(); resetGame(); }, 1000); //Waits 1 second then clears canvas, resets game, allows clicking

}

function resetGame() { //Resets game in tie or win
    for (let i = 0; i < 9; i++) { //For loop iterates through each square element
        let square = document.getElementById(String(i)); //Var gets the element of i
        square.style.backgroundImage = ''; //Removes elements backgrounds
    }
    selectedSquares = []; //Resets array so its empty and we can restart
}


