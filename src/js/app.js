
var d = document;
var $app = d.querySelector('.app');
var animationRunning = false;
var Players = {
  // step 1
  $countContainer: d.querySelector('.js-container-step-1'),
  $countForm: d.querySelector('.js-valid-players-number'),
  $totalPlayers: d.querySelector('.js-total-players'),
  $byTeamPlayers: d.querySelector('.js-byteam-players'),

  // step 2
  $namesMainContainer: d.querySelector('.js-container-step-2'),
  $namesForm: d.querySelector('.js-new-players-form'),
  $namesContainer: d.querySelector('.js-new-players-container'),

  // step 3
  $teamsMainContainer: d.querySelector('.js-container-step-3'),
  $teamsContainer: d.querySelector('.js-teams-container'),

  generateInputs: function(){
    for(var i=0; i<Players.total; i++){
      var input = d.createElement("input");
      input.classList.add("js-new-player");
      input.placeholder = 'Player #' + (i+1);
      this.$namesContainer.appendChild(input);
    }
  },
  checkInput: function($input){
    var val = $input.value;
    var isNumber = !isNaN(val);
    var isTooShort = val.length === 0;
    var hasError = (!isNumber || isTooShort);

    return hasError;
  },
  sortTeams: function(){
    var players = Players.names;
    var playersLength = players.length;
    var playersByTeam = this.$byTeamPlayers.value;

    // monster shuffle
    for(var i=0; i<players.length; i++){
      players = shuffleArray(players);
    }

    // start da machine
    for(var j=0; j<playersLength; j++){
      var $newPlayer = d.createElement('span');
      var isNewTeam = (j % playersByTeam) === 0;
      var isEndTeam = (j % playersByTeam) === (playersByTeam - 1);
      var isLast = j === (playersLength - 1);
      // var isEndTeam = (i/playersByTeam) % 1;
      // var currentPlayer = players[i-1];

      $newPlayer.innerHTML = players[j];

      if(isNewTeam){
        var $h2 = d.createElement('h2');
        var index = Math.round((j + 2)/playersByTeam);
        $h2.innerHTML = 'Team #'+index;
        this.$teamsContainer.appendChild($h2);
      }
      if(!isEndTeam && !isLast){
        $newPlayer.innerHTML += ', ';
      }
        this.$teamsContainer.appendChild($newPlayer);
    }
  }
};

var shuffleArray = function(array){
  for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array;
};

Players.$countForm.onsubmit = function(evt){
  evt.preventDefault();
  if(animationRunning) return;

  var _this = Players;
  var $totalPlayers = _this.$totalPlayers;
  var $byTeamPlayers = _this.$byTeamPlayers;
  var totalErrors = 0;

  // reset app classes
  $app.className = 'app';

  // display error for each input
  [$totalPlayers, $byTeamPlayers].forEach(function(el){
    var hasError = _this.checkInput(el);
    el.classList.toggle('error', hasError);
    if(hasError)
      totalErrors++;
  });

  // check if players by team are not superior at total players
  // if not, store the total players value
  if(Number($byTeamPlayers.value) >= Number($totalPlayers.value)){
    $totalPlayers.classList.add('error');
    $byTeamPlayers.classList.add('error');
    totalErrors++;
  }
  else {
    _this.total = $totalPlayers.value;
  }

  // if many errors, wobble $app
  // if not, generate inputs for next step
  if(totalErrors > 0)
    $app.className += ' wobble animated';
  else{
    _this.$countContainer.classList.add('hidden');
    _this.$namesMainContainer.classList.remove('hidden');
    _this.generateInputs();
  }
};

Players.$namesForm.onsubmit = function(evt){
  evt.preventDefault();
  if(animationRunning) return;

  var _this = Players;
  var $inputs = this.querySelectorAll('input');
  Players.names = [];

  // check errors
  [].forEach.call($inputs, function(el){
    var isEmpty = el.value.length === 0;
    el.classList.toggle('error', isEmpty);
    if(!isEmpty)
      Players.names.push(el.value);
  });

  // if no errors, continue
  if(Players.names.length == Players.total){
    _this.$namesMainContainer.classList.add('hidden');
    _this.$teamsMainContainer.classList.remove('hidden');
    _this.sortTeams();
  }
  else {
    $app.className += ' wobble animated';
  }
};

$app.addEventListener('webkitAnimationEnd', function(){
  $app.className = 'app';
  animationRunning = false;
});
