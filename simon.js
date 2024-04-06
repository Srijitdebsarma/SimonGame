let h3 = document.querySelector("h3");
let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"]; //button er class names
let level = 0;
let highestScore=0;
let isStarted = false;
let round=0;
document.addEventListener("keypress", function () {
  //press any key on keyboard to start the game
  if (isStarted === false) {
    console.log("game starts");
    isStarted = true;
  }
  levelup(); //enetering first level
});

function levelup() {    //game click the buttons
  userSeq=[];//levelup hole userSeq first theke start hba
  level++;
  //level show krbo
  h3.innerText = `Level ${level}`;
  let randomIndex = Math.floor(Math.random() * 3); //0-3 any random value will be generated
  let randomColor = btns[randomIndex]; //assume red color er button ta elo
  let randomBtn = document.querySelector(`.${randomColor}`); //".randomColor"---eta akta string hya jba tai `.${randomColor}`=>.red to make it thee class name
  //button er class take as an argument nba just
  buttonFlash(randomBtn);
  gameSeq.push(randomColor);
  //console.log(gameSeq);
}

function buttonFlash(btn) {
  //for flashing the buttons jai button take flash korate hba seta
  //as an argument pthiya dbo
  btn.classList.add("flash"); //flash add to make bg color white
  setTimeout(function () {
    btn.classList.remove("flash"); //flash take 1 sec por remove
  }, 250);
}

function buttonPress(event) {   //userPressedIt
  //if user press any button
  //console.dir(event.srcElement.outerText); => to get the button value
  //this will also store the buttons when it is clicked
  let btn = this; //jai button take click korechi seta this a esa gcha
  buttonFlash(btn);
  let userColor=btn.getAttribute("id"); //userColor e oi button er color id ta pya jchhi
  userSeq.push(userColor);
  //we need to track the clicks for user array
  //console.log(userSeq);
  checkAns(userSeq.length-1);   //1 ta element ache
}

let allButtons = document.querySelectorAll(".button"); //for selecting the class=> .class
for (btn of allButtons) {
  //adding eventlistner to all the buttons
  btn.addEventListener("click", buttonPress);
}

function checkAns(index){
    //it will check our sequance
    if(gameSeq[index]===userSeq[index]){
        //proti ta click er stha gameSeq er sei element ta and userSeq er sei element ta same ache ki na check krchi
        if(gameSeq.length==userSeq.length){
            //user put the all seq
            setTimeout(levelup,1000);   //levelup korachi
        }  
    }
    else{
        //if vul key pressed hy
        let currentScore = level - 1;
        if (currentScore > highestScore) {
            highestScore = currentScore;

            // Update the displayed highest score only if the current score is higher
            let highestElement = document.querySelector("#highestScore");
            if (highestElement) {  //if highestelement exists it will update it's  value, else creates a newone
                highestElement.innerHTML = `Highest Score was : <b>${highestScore}</b>`;
            } else {
                let highest=document.createElement("h3");
                highest.id = "highestScore";
                highest.innerHTML = `Highest Score was : <b>${highestScore}</b>`;
                document.querySelector("body").append(highest);
            }
        }

        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="rgb(240, 220, 193)";  
        },200)
        h3.innerHTML=`Game Over! Your score is : <b>${level-1}</b> <br> Press any key to restart`;

        reset();    //reset the game from start
        
    }
}

function reset(){
    gameSeq=[];
    userSeq=[];
    level=0;
    isStarted=false;
}
