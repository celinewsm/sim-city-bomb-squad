console.log("javascript running");

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");

  function randomizer(){
  	return Math.round(Math.random());
  }

  var bombData;
  function setBomb(){
    bombData = {
      // 1 = bomb , 0 = safe , -1 = cut before
    blue : randomizer(),
    green: randomizer(),
    red: randomizer(),
    white: randomizer(),
    yellow: randomizer()
    }
  }
  setBomb();

  //sound variables
  var BldgExplode = document.getElementById("BldgExplode");
  var CrowdYay = document.getElementById("CrowdYay");
  var Electricity = document.getElementById("Electricity");
  var Siren = document.getElementById("Siren");
  var Success = document.getElementById("Success");

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
      Electricity.play();
    }
  }

  var intervalID = null;
  function intervalManager(flag, triggerFunction, time) {
     if(flag)
       intervalID =  setInterval(triggerFunction, time);
     else
       clearInterval(intervalID);
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
        Siren.pause();
        BldgExplode.play();
        endGame();
      }, 750);
    }
  }

  function endGame(){
    for (var i=0; i < Object.keys(bombData).length ; i++) {
      bombData[Object.keys(bombData)[i]] = -1;
    }
    intervalManager(false);
    button.classList = "showButton";
  }

  //diffused if all bombs != 0;
  function ifDiffused(){
  var allClear = [];
  for (var i = 0 ; i < Object.keys(bombData).length ; i++){
    // length of bombData -> Object.keys(bombData).length
    if (bombData[Object.keys(bombData)[i]] === 0){
      allClear.push("x");
      }
    }
    // console.log(allClear);
    //wins
  if (allClear.length === 0){
    document.getElementById("timer")
    Siren.pause();
    endGame();
    console.log("Bomb diffused");
    //change timer to green and freeze
    document.getElementById("timer").className = "greenFont";
    // play one audio after the other
    CrowdYay.addEventListener("ended", function() {
      Success.play();
    });
    CrowdYay.play();
    }
  }

  //timer
  var timeNow = 30.000;
  var countDown = function(){
    if (timeNow <= 0) {
      // timer gives negative 0, forced it to be 0, any other way?
      document.getElementById("sec").textContent = "00.000";
      endGame();
      document.getElementsByTagName("body")[0].classList="exploded";
      BldgExplode.play();
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

  intervalManager(true, countDown, 12);

  var button = document.getElementsByTagName("button")[0]
  var imgSrc;
  function reset(){
    console.log("reset button clicked");
    setBomb();
    //rest background
    document.getElementsByTagName("body")[0].classList="unexploded";
    //reset images
    for (var i = 0 ; i < 5 ; i++ ){
      document.getElementsByClassName("image")[i].src = document.getElementsByClassName("image")[i].src.split("/cut").join("/uncut");
    }
    document.getElementById("timer").className = "redFont";
    timeNow = 30.000;
    intervalManager(true, countDown, 12)
    button.classList = "hideButton";
    Siren.play();
  }
  button.addEventListener('click',reset);
});
