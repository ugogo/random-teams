var d = document
  
  // containers
  , container_first  = d.getElementById("js-container_step_1")
  , container_second = d.getElementById("js-container_step_2")
  , container_third  = d.getElementById("js-container_step_3")
  
  // BtnValid
  , BV_playersRepartiton = d.getElementById("js-valid_step1")
  , BV_playersNames      = d.getElementById("js-valid_step2")

  // inputs
  , I_PbyTeam = d.getElementById("js-total_byteam")
  , I_totalP  = d.getElementById("js-total_players")
;

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

var shuffleArray = function(array) {  
  for (i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i+1))
      , temp = array[i]
    ;

    array[i] = array[j];
    array[j] = temp;
  }
  
  return array;
};
var toggleContainers = function(c1, c2){
  c1.classList.add("hidden");
  c2.classList.remove("hidden");
};

var inputError = function(input){
  var val        = input.value
    , isTooShort = val.length < 1
    , isNumber   = !isNaN(val)
  ;

  return !isTooShort && isNumber;
};

var validPlayerRepartition = function() {
  var noError = false
    , total
    , byTeam
  ;

  I_totalP
    .classList
      .toggle("error", !inputError(I_totalP))
      ;

  I_PbyTeam
    .classList
      .toggle("error", !inputError(I_PbyTeam))
      ;

  byTeam = Math.floor(I_PbyTeam.value);
  total  = Math.floor(I_totalP.value);

  noError = !I_totalP.classList.contains("error") && !I_PbyTeam.classList.contains("error") && ((byTeam/total)<1);

  if(!noError){
    I_PbyTeam.classList.add("error");
    I_totalP.classList.add("error");
  }

  return noError;
};
var generateInputs = function() {
  var container = d.getElementById("js-new_players")
    , size = I_totalP.value
  ;

  for (i=0; i<size; i++) {
    var input = d.createElement("input");

    input.classList.add("js-new_player");
    input.placeholder = "Player " + (i+1);
    container.appendChild(input);
  }
};

var goToStep2 = function(){
  var noError = validPlayerRepartition();

  if(noError){
    toggleContainers(container_first, container_second);
    generateInputs();
  }
};
var validAndGetPlayersNames = function(){
  var playersArray = []
    , inputs  = d.querySelectorAll("input.js-new_player")
    , size    = inputs.length
    , noError = false
  ;

  for (i=0; i<size; i++) {
    var current = inputs[i]
      , value   = current.value
      , isEmpty = value.length < 1
    ;

    current.classList.toggle("error", isEmpty);

    noError = !isEmpty;

    if (!isEmpty)
      playersArray.push(value);
  }

  return noError ? playersArray : false;
};
// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

var shuffleArray = function(array) {  
  for (i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i+1))
      , temp = array[i]
    ;

    array[i] = array[j];
    array[j] = temp;
  }
  
  return array;
};

var sortTeam = function(array){

  array = shuffleArray(array);

  var container     = d.getElementById("js-teams_container")
    , playersByTeam = I_PbyTeam.value
    , size = array.length+1
  ;

  for (i=0; i<size; i++){
    var player    = d.createElement("span")
      , current   = array[i-1]
      , isNewTeam = i % playersByTeam
      , isEndTeam = (i/playersByTeam) % 1
      ;

    if (isNewTeam === 1) {
      var h2 = d.createElement("h2");
      h2.innerHTML = "Team " + Math.round((i + 1)/playersByTeam);
      container.appendChild(h2);
    }

    if(i>0){
      if (isEndTeam === 0 || i === size-1 ){
        player.classList.add("last-item");
        player.innerHTML = current;
      }
      else {
        player.innerHTML = current + ",";
      }
      container.appendChild(player);
    }
  }
};

var goToStep3 = function(){
  var playersArray = validAndGetPlayersNames();

  if(playersArray){
    toggleContainers(container_second, container_third);
    sortTeam(playersArray);
  }
};

BV_playersRepartiton
  .addEventListener("click", goToStep2);

BV_playersNames
  .addEventListener("click", goToStep3);
