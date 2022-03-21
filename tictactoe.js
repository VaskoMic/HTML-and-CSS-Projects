//This variable keeps track of who`s turn it is.
let activePlayer = 'X';
//This array stores an array of moves. We use this to determine win conditions.
let selectedSquares = [];

//This function is for placing an x or o in a square.
function placeXOrO(squareNumber) {
    //This condition ensures a square hasn`t be selected already.
    // The .some() metod is used to check each element of selectedSquare array to
    // see if it contains the square umber clicked on.
   if (!selectedSquares.some(element => element.includes(squareNumber)))
     //This variable retrieves the html element id that was clicked
         select = document.getElementById(squareNumber);
    //This condition checks who`s turn it is.
    if (activePlayer === 'X') {
        // If activePlayer is equal to "X", the x.png is placed in HTML
        select.style.backgroundImage = 'url("x.png")' ;
    //Active player may only be "X" or "O" so, if not "X" it must be "O"
    } else {
        //If ActivePlayer is equal to "O", the o.png is placed in HTML
        select.style.backgroundImage = 'url("o.png")';
    }
    //squareNumber and activePlayer are concatenated together and added to array.
    selectedSquares.push(squareNumber + activePlayer);
    //This condition is for changing the active player.
    if (activePlayer === 'X') {
        //If active player is "X" change it to "O".
        activePlayer = 'O';
    //If  active player is anthing other than "X".
    } else {
        //Change the activePlayer to "X"
        activeplayer = 'X';
    }
    //This function plays placement sound.
    audio('./media/place.mp3');
    //This condition checks to see if it is computers turn.
    if(activePlayer === 'O') {
        //This function disable clicking for computer choice.
        disableClick();
        //This function waits 1 second before placing the image
        // and enabling click.
        setTimeout(function () {computersTurn(); },1000);
 }
    //Returning true is needed for our computersTurn() function
    return true;
}

//This function results in a random square being selected.
function computersTurn() {
    //This boolean is needed for our while loop.
    let success = false;
    //This variable stores a random number 0-8
    let pickASquare;
    //This condition allows our while loop to keep
    //trying if a square is selected already.
    while(!success){
        //A random number between 0 and 8 is selected
        pickASquare = String(Math.floor(Math.random()*9));
        //If the random number evaluates returns true, the square hasn`t selected yet.
        if (placeXOrO(pickASquare)){
            //This line calls the function.
            placeXOrO(pickASquare);
            //This changes our boolen and ends the loop.
            success = true;
        };
    }
}



//This function parses the selectedSquares array to serach for win conditions.
//drawWinLine function is called to draw line if condition is met.
function checkWinConditions() {
    // x 0,1,2 condtion.
    if      (arrayIncludes('0x','1x','2x')) {drawWinLine (50,100,558,100) ;}
    // x 3,4,5 conditon.
    else if (arrayIncludes('3x','4x','5x')) {drawWinLine (50,304,558,304) ;}
    // x 6,7,8 condition.
    else if (arrayIncludes('6x','7x','8x')) {drawWinLine (50,508,558,508) ;}
    // x 0,3,6 condition.
    else if (arrayIncludes('0x','3x','6x')) {drawWinLine (100,50,100,558) ;}
    // x 1,4,7 condition.
    else if (arrayIncludes('1x','4x','7x')) {drawWinLine (304,50,304,558) ;}
    // x 2,5,8 condition.
    else if (arrayIncludes('2x','5x','8x')) {drawWinLine (508,50,508,558) ;}
    // x 6,4,2 condition.
    else if (arrayIncludes('6x','4x','2x')) {drawWinLine (100,508,510,90) ;}
    // x 0,4,8 condition.
    else if (arrayIncludes ('0x','4x','8x')) {drawWinLine(100,100,520,520) ;}
    // o 0,1,2 condition.
    else if (arrayIncludes ('0o','1o','2o')) {drawWinLine(50,100,558,304) ;}
    // o 3,4,5 condition.
    else if (arrayIncludes ('3o','4o','5o')) {drawWinLine(50, 304,558,100) ;}
    // o 6,7,8 condition.
    else if (arrayIncludes ('6o','7o','8o')) {drawWinLine(50,508,558,508) ;}
    // o 0,3,6 condition.
    else if (arrayIncludes ('0o','3o','6o')) {drawWinLine(100,50,100,558) ;}
    // o 1,4,7 condition.
    else if (arrayIncludes ('1o','4o','7o')) {drawWinLine(304,50,304,558) ;}
    // o 2,5,8 condition.
    else if (arrayIncludes ('2o','5o','8o')) {drawWinLine(508,50,508,558) ;}
    // o 6,4,2 condition.
    else if (arrayIncludes ('6o','4o','2o')) {drawWinLine(100,508,510,90) ;}
    // o 0,4,8 condition.
    else if (arrayIncludes ('0o','4o','8o')) {drawWinLine(100,100,520,520) ;}
    //This condition checks for tie.If none of the above conditions register
    //and 9 squares are selected, the code executes.
    else if  (selectedSquares.length >= 9) {
        //This function plays  the tie game sound.
        audio('./media/tie.mp3');
        //This function sets a .3 second timer before the resetGame is called.
        setTimeout (function () { resetGame () ;} , 1000) ;
    }

//This function checks if an array includes 3 strings.
//It is used to check for each win condition.
function arrayIncludes (squareA, squareB, squareC) {
    //The next 3 variables will be used to check for 3 in row.
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);
    //If the 3 variebles we pass are all included in our array true is
    //returned and our else if condition executes the drawWinLine function.
    if (a === true && b === true && c === true) {return true;}
    }

}
//This function makes our body element temporarily unclicable.
 function disableClick() {
     //This makes our body unclickable.
     body.style.pointerEvents = 'none';
     //This makes our body clickable again after 1 second.
     setTimeout (function() {body.style.pointerEvents = 'auto';}, 1000);
 }
 //This function takes a string parameter of the path you set earlier for
 //placement sound ("./media/place.mp3")
 function audio(audioURL) {
     //We create a new audio object and we pass the path as a parameter.
     let audio = new Audio (audioURL);
     //Play method plays our audio sound.
     audio.play();
 }
//This function utilizes html canvas to draw win lines.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //This line accesses our html canvas element.
    const canvas = document.getElementById('win-lines');
    //This line gives us access to methods and properties to use on canvas.
    const c = canvas.getContext('2d');
    //This line indicates where the start of lines x axis is.
    let x1 = coordX1,
        //This line indicates where the start of a lines y axis is.
        y1 = coordY1,
        //This line indicates where the end of a lines x axis is.
        x2 = coordX2,
        //This line indicates where the end of a lines x axis is.
        y2 = coordY2,
        //This variable stores temporary x axis data we update in our animation loop.
        x = x1,
        //This variable stores temporary y axis data we update in our animation loop.
        y= y1;

        //This function interacts with canvas
        function animateLineDrawing() {
            //This variable creates the loop for when the game ends it restarts.
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            //This method clears content from last loop iteration.
            c.clearRect (0, 0, 608, 608);
            //This method starts a new path
            c.beginPath();
            //This method moves us to a starting point for our line,
            c.moveTo(x1, y1);
            //This method indicates the end point in our line.
            c.lineTo(x, y);
            //This method set the width of our line.
            c.strokeStyle = 'rgba(70, 255, 33, .8)';
            //This method draws everything we laid out above.
            c.stroke ();
            //This condition checks if we 've reached the endp oint.
            if (x1 <= x2 && y1 <= y2) {
                //This condition adds 10 to the previos end x point.
                if (x < x2){ x += 10; }
                //This condition adds 10 to the previous end y point.
                if (x >= x2) {y += 10; }
                //This condition cancels our animation loop if reach the end points.
                if (x >= x2 && y >=y2) { cancelAnimationFrame(animationLoop) ;}
            }
            //This condition is similar to the one above.
            //It was necessary for the 6, 4, 2 win condition.
            if ( x1 <= x2 && y1 >= y2) {
                if ( x < x2) { x += 10 ;}
                if ( y > y2) { y -= 10 ;}
                //This condition cancels our animation loop if reach the end points.
                if ( x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop);}
            }
        
       }
       //This function clears our canvas after our win line is drawn.
       function clear() {
           //This line starts our animation loop.
           const animationLoop = requestAnimationFrame ( clear);
           //This line clears our canvas.
           c.clearRect (0, 0, 608, 608);
           //This line stops our animation loop.
           cancelAnimationFrame (animationLoop);
       }
       //This line disallows clicking while the win sound is playing
       disableClick();
       //This line plays the win sounds.
       audio ('./media/winGame.mp3');
       //This line calls our main animation loop.
       animateLineDrawing();
       //This line waits 1 second.
       //Then, clears canvas, resets game, and allows clicking again.
       setTimeout(function () { clear() ; resetGame() ;}, 1000);
}

//This function resets the game in a tie or a win.
function resetGame(){
    //This for loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        //This variable gets the html element of i.
        let square = document.getElementById(String(i));
        //This removes our elements backgroundImage.
        square.style.backgroundImage = ``;
    }
    //This resets our array so it is empty and we can start over.
    selectedSquares = [] ;
}