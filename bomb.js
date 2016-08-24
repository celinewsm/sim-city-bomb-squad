console.log("javascript running");

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");
});


function randomizer(){
	return Math.round(Math.random());
}

var bombData;
function buildBomb(){
  bombData = {
    // 1 = bomb , 0 = safe , -1 = cut before
  blue : randomizer(),
  green: randomizer(),
  red: randomizer(),
  white: randomizer(),
  yellow: randomizer()
  }
}
buildBomb();

//change colour image + check/update object array
var wire = document.getElementsByClassName("wire");
for (var i = 0 ; i < wire.length ; i++ ){
    wire[i].addEventListener("click",imageSwitcher);
    wire[i].addEventListener("click",checkBomb);
}

function imageSwitcher(){
  var colorClicked = this.classList[1];
  if (bombData[colorClicked] !== -1){
    console.log("wire clicked: " + colorClicked);
    document.getElementsByClassName(colorClicked)[1].src = ['img/cut-',colorClicked,'-wire.png'].join("");
  }
}

function checkBomb(){
  var colorClicked = this.classList[1];
  if (bombData[colorClicked] === 0 ) {
    // safe change value to -1 and check if diffused
    bombData[colorClicked] = -1;
    ifDiffused();
  }
  else if ( bombData[colorClicked] === 1 ){
    // kaboom in 750 mili seconds
    bombData[colorClicked] = -1;
    setTimeout(function () {
      document.getElementsByTagName("body")[0].classList="exploded";
      clearInterval(countdownTimer);
      endGame();
    }, 750);
  }
}

function endGame(){
  for (var i=0; i < Object.keys(bombData)[1].length ; i++) {
    bombData[Object.keys(bombData)[i]] = -1;
  }
}

//diffused if all bombs != 0;
var diffused = false;
function ifDiffused(){
var allClear = [];
for (var i = 0 ; i < Object.keys(bombData)[1].length ; i++){
  // bombData.length -> Object.keys(bombData)[1]
  if (bombData[Object.keys(bombData)[i]] === 0){
    allClear.push("x");
    }
  }
  console.log(allClear);
  //wins
if (allClear.length === 0){
  diffused = true;
  document.getElementById("timer")
  endGame();
  console.log("Bomb diffused");
  clearInterval(countdownTimer);
  document.getElementById("timer").className = "greenFont";
  //change timer to green and freeze time
  }
}

//timer
var timeNow = 30.000;
var countDown = function(){
  if (timeNow <= 0) {
    // timer gives negative 0
    document.getElementById("sec").textContent = "00.000";
    endGame();
    document.getElementsByTagName("body")[0].classList="exploded";
    clearInterval(countdownTimer);
  }
  else if (timeNow < 10) {
    timeNow -= 0.012
    document.getElementById("sec").textContent = "0" + timeNow.toFixed(3);
  }
  else {
    timeNow -= 0.012
    document.getElementById("sec").textContent = timeNow.toFixed(3);
  }
}

var countdownTimer = setInterval(countDown,12);

var button = document.getElementsByTagName("button")
function reset(){

}

// button.addEventListener('click',reset);
