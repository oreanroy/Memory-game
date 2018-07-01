 let cardClass = ['fa-diamond', 'fa-paper-plane', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-paper-plane', 'fa-bomb', 'fa-diamond', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bomb', 'fa-bicycle'];
    let shuffleArray = [];
    let cardOpen = [];
    let cardpos = [];
    deckArea = document.querySelector('.deck');
    let count = 0;
    let moves = 0;
    let oldCard = [];
    var countFlag = 0;
    var oldClass = "";
    var resetButton = document.querySelector('.restart');
    var movesindicator = document.querySelector('.moves');
//function to arrange the board 
function setBoard(){
    shuffleArray = shuffle(cardClass);
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
play();
};
setBoard();


function play(){
    deckArea.addEventListener('click', function(e) {
    if(e.target.className == 'card'){
        e.target.setAttribute('class', 'card show open');
        if(e.target.id!=oldCard.id)
        countFlag++;// when second card id pressed.
        classNam = e.target.childNodes[0].className;
        moves++;
        moveIncrease();
    }
    if(e.target.id!=oldCard.id && classNam === oldClass && countFlag==2){
       match(e);
    }else{
            if(e.target.id!=oldCard.id  && countFlag==2){
              open(e);
                
            }
        }
            if(e.target.id!=oldCard.id && countFlag==1){
                oldCard.push(e.target);
                oldClass = e.target.childNodes[0].className;
            }
    });
};

//function if two cards do not match
function open(e){
    setTimeout(function() { e.target.setAttribute('class', 'card'); oldCard[0].setAttribute('class', 'card');
    countFlag=0; 
    oldCard =   [];
    oldClass =  "";}, 400);

}
// function to check if two functions match
function match(e){
    e.target.setAttribute('class', 'card  match open');
        oldCard[0].setAttribute('class', 'card  match open');
        cardOpen.push(oldClass); 
        countFlag=0; 
        oldCard = [];
        oldClass = "";
        TestComplete(cardOpen);
}
//reset button event listener

resetButton.addEventListener('click', function(){
    reset();
});


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
// function to test if the game is complete
function TestComplete(open){
if(open.length==8){
    alert(`you have won the game in ${moves} moves`);
}else
return null;
};
//function to increse the moves pointer
function moveIncrease(){
    movesindicator.innerHTML=`${moves}`;
};

//function to reset
function reset(){
     cardOpen = [];
     cardpos = [];
     count = 0;
     moves = 0;
     oldCard = [];
     countFlag = 0;
     oldClass = "";
    deckArea.innerHTML = "";
    setBoard();

}
