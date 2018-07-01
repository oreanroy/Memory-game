/*
 * Create a list that holds all of your cards
 */
 const gameCard =["fa fa-diamond", 
                 "fa fa-paper-plane-o",  
                 "fa fa-anchor",
                 "fa fa-bolt",
                 "fa fa-cube", 
                 "fa fa-leaf", 
                 "fa fa-bicycle", 
                 "fa fa-bomb", 
                 ];
// Let double the array 
const gameCards = gameCard.concat(gameCard);
const gameCardsContainer = document.getElementById("deck");
let flippedCards = [];
let matchedCards = [];

//shuffle the cards
shuffle(gameCards);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}

// start the game for the first time
gameInit();
 /*
 **************************************************************
 ***************************************************************
 */
// intialize the game

function gameInit() {

    //let loop through created cards

for(let i = 0; i < gameCards.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = "<i class='"+ gameCards[i] + "'></i>";
       gameCardsContainer.appendChild(card);

       // Add ClickEvent to each card

       clickCard(card);
        
    }
}

/*
 **************************************************************
 ***************************************************************
 */
//FUNCTION CLIKCARD 
 
let firstClicked = true;
function clickCard(card) {

     //add card eventlistener

        card.addEventListener("click", function(){


            if (firstClicked) {
                //Start the timer
                startTimer();
                // Change the the first click value
                firstClicked = false;
            }

                let current_card = this;
                let previous_card = flippedCards[0];

            //we have opend existing card
            if(flippedCards.length === 1){

                card.classList.add("open", "show", "disable");
                flippedCards.push(this);

                //compare the 2 opened cards and see matched

                // compare cards

                compareCards(current_card, previous_card);

            } else {
                //don't have any opened card
                 current_card.classList.add("open", "show", "disable");
                 flippedCards.push(this);
            }
 
        });

}

/*
 **************************************************************
 ***************************************************************
 */
// FUNCTION COMPARE CARDS

function compareCards(current_card, previous_card){
//matching cards
    // call the gameover function

                   if(current_card.innerHTML === previous_card.innerHTML) { 

                    current_card.classList.add("match");
                    previous_card.classList.add("match");

                    matchedCards.push(current_card, previous_card);

                    flippedCards = [];

                    

                } else {

                    // setTimeout
                    setTimeout(function() {

                    // not permiiting two clicks on the same card by disabling(disable)... from Sam webinar
                    current_card.classList.remove("open", "show", "disable");
                    previous_card.classList.remove("open", "show", "disable");

                    }, 700);

                    flippedCards = [];
               
                }

                //Add new move

            incrementMoves();
          gameIsOver();
}


/*
 **************************************************************
 ***************************************************************
 */
// The GameOVER FUNCTION

// check if the game is over

function gameIsOver() {
    if(matchedCards.length === gameCards.length) {
    openModal();
    displayMovesModal();
    displayTimeModal();
    displayScoreModal();
    stopTimer();
    
    }
};

/*
 **************************************************************
 ***************************************************************
 */

//INCREMENT MOVES

const movesInc = document.querySelector(".moves");
let moves = 0;
movesInc.innerHTML = 0;
function incrementMoves() {
    moves++;
    movesInc.innerHTML = moves;
    updateRate();
}
 
/*
 **************************************************************
 Rating
 ***************************************************************
 */
const starsContainer = document.querySelector(".stars");
// referenced from udacity student Sam
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function updateRate() {

    switch(moves) {
        case 14:
        starsContainer.innerHTML = star + star;
        break;
        case 35: 
        starsContainer.innerHTML = star;
        break;
    }
}

/*
 **************************************************************
 ***************************************************************
 */
// timer
const timerCounter = document.querySelector(".timer");
let count, sumSeconds = 0;

// Set the default value to the timer's container
timerCounter.innerHTML = sumSeconds + 's';

 function startTimer() {
    count = setInterval(function() {
        // Increase the totalSeconds by 1
       sumSeconds++;
        // Update the HTML Container with the new time
        timerCounter.innerHTML = sumSeconds + 's';
    }, 1000);
}

// Stop Timer function

function stopTimer() {
    clearInterval(count);
}

 
/*
 **************************************************************
 ***************************************************************
 */

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function(){
    // reset all cards
    gameCardsContainer.innerHTML = "";
    gameInit();
     reset();
 });


 /* ***************************************************************
 */


// The modal element
let modal = document.getElementById('gameModal');
// Get open modal button
//let modalBtn = document.getElementById('modalBtn');

// Get close button
let closeBtn = document.getElementsByClassName('closeBtn')[0];
//function for click
//modalBtn.addEventListener('click', openModal);

// get the moves
let displayMoves = document.querySelector(".displayMoves");

// get the time
 let displayTime = document.querySelector(".displayTime");


// get the  score-stars
let displayScore = document.querySelector(".displayScore");

closeBtn.addEventListener('click', closeModal);
// Get display the plag again button
let playBtn = document.querySelector('.playAgain');
playBtn.addEventListener('click', replay);


let cancelBtn = document.querySelector('.cancel');
cancelBtn.addEventListener('click', closeModal);
// Function to open modal

function openModal(){
    modal.style.display = 'block';
}

// Function to open modal

function closeModal(){
    modal.style.display = 'none';
}
// function play again---relay
function replay(){
   gameCardsContainer.innerHTML = "";
    reset();
    gameInit();
   closeModal(); 
}

//function to get the moves

function displayMovesModal(){
    displayMoves.innerText =`Moves: ${moves}`;
}

//function to get the moves

function displayTimeModal(){
    displayTime.innerText =`Time: ${sumSeconds} s`;
}

//function to display the score-stars

function displayScoreModal(){
   let stars= document.querySelectorAll('.stars li');
    starsScore = 0;
    for (let star of stars) {
        if(star.style.display !== 'none'){
            starsScore++;
        }
    }
    displayScore.innerHTML = `Score: ${starsScore}`;
    console.log(starsScore);
    return starsScore;
}
 

// Function to close modal if outside clicked
window.addEventListener('click', outsideClick);

function outsideClick(e){
    modal.style.display ='none';
    if(e.target == modal){
        modal.style.display ='none';
      }

    }
//reset function

function reset() {
    // Empty the `matchedCards` array
    matchedCards = [];
    // Reset moves
    moves = 0;
    movesInc.innerHTML = moves;
    // Reset the rate
    starsContainer.innerHTML = star + star + star;
    stopTimer();
    firstClicked = true;
    sumSeconds = 0;
    timerCounter.innerHTML = sumSeconds + "s";
}

