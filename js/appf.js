let cardClass = ['fa-diamond', 'fa-paper-plane', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-paper-plane', 'fa-bomb', 'fa-diamond', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bomb', 'fa-bicycle'];
let shuffleArray = shuffle(cardClass);
let cardOpen = [];
let cardpos = [];
deckArea = document.querySelector('.deck');
let count = 0;
let moves = 0;
let oldCard = [];
var countFlag = 0;
var oldClass = "";

 //shuffle array
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

// add cards to deck
function addCard(){
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
    };
};