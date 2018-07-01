

 // Create a list that holds all of your cards
 /* Create a list that holds all of your cards
  */
 /*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */

// Shuffle function from http://stackoverflow.com/a/2450976
    let cardClass = ['fa-diamond', 'fa-paper-plane', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-paper-plane', 'fa-bomb', 'fa-diamond', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bomb', 'fa-bicycle'];
    let shuffleArray = shuffle(cardClass);
    let cardOpen = [];
    let cardpos = [];
    deckArea = document.querySelector('.deck');
    let count = 0;
    let moves = 0;
    let oldCard = "";
    var countFlag = 0;
    var oldClass = "";

    for(let i = 0;i<cardClass.length; i++){
        listItem = document.createElement('li');
        listItem.className = "card";
        let id = "card"+i;
        listItem.id = id;
        let classType = shuffleArray[i];
        icon = document.createElement('i');
        icon.className = classType;
        icon.classList.add("fa");
        listItem.appendChild(icon); 
        deckArea.appendChild(listItem);
        cardpos.push({key: shuffleArray[i],
        position: i});
    }
        deckArea.addEventListener('click', function(e) {
            if(e.target.id!=oldCard.id){countFlag++;};
            if(e.target.className == 'card')
            e.target.setAttribute('class', 'card show open');
            
            classNam = e.target.childNodes[0].className;
            
            if(classNam === oldClass && e.target.id!=oldCard.id){
             match(e);  
             
            }
            else{if(countFlag==2)
                {setTimeout(function() { e.target.setAttribute('class', 'card'); oldCard.setAttribute('class', 'card');}, 500);
                countFlag=0;
                console.log(oldCard);
                console.log(e.target);
                };};
            oldClass = e.target.childNodes[0].className;
             oldCard = e.target;
             cocountFlag=0;
        });
        moves++;
        if(cardOpen.length == 8){
            console.log('winner');2
        }
// function to check if two functions match
function match(e){
    e.target.setAttribute('class', 'card  match open');
             oldCard.setAttribute('class', 'card  match open');
             cardOpen.push(oldClass); 
             countFlag=0;
}
    
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
