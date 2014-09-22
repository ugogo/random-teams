(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// hide url bar
setTimeout(function() {
  window.scrollTo(0, 1);
}, 1000);

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy91Z28vUmVwb3MvcmFuZG9tLXRlYW1zL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL3NyYy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBoaWRlIHVybCBiYXJcbnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gIHdpbmRvdy5zY3JvbGxUbygwLCAxKTtcbn0sIDEwMDApO1xuXG52YXIgZCA9IGRvY3VtZW50O1xudmFyICRhcHAgPSBkLnF1ZXJ5U2VsZWN0b3IoJy5hcHAnKTtcbnZhciBhbmltYXRpb25SdW5uaW5nID0gZmFsc2U7XG52YXIgUGxheWVycyA9IHtcbiAgLy8gc3RlcCAxXG4gICRjb3VudENvbnRhaW5lcjogZC5xdWVyeVNlbGVjdG9yKCcuanMtY29udGFpbmVyLXN0ZXAtMScpLFxuICAkY291bnRGb3JtOiBkLnF1ZXJ5U2VsZWN0b3IoJy5qcy12YWxpZC1wbGF5ZXJzLW51bWJlcicpLFxuICAkdG90YWxQbGF5ZXJzOiBkLnF1ZXJ5U2VsZWN0b3IoJy5qcy10b3RhbC1wbGF5ZXJzJyksXG4gICRieVRlYW1QbGF5ZXJzOiBkLnF1ZXJ5U2VsZWN0b3IoJy5qcy1ieXRlYW0tcGxheWVycycpLFxuXG4gIC8vIHN0ZXAgMlxuICAkbmFtZXNNYWluQ29udGFpbmVyOiBkLnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb250YWluZXItc3RlcC0yJyksXG4gICRuYW1lc0Zvcm06IGQucXVlcnlTZWxlY3RvcignLmpzLW5ldy1wbGF5ZXJzLWZvcm0nKSxcbiAgJG5hbWVzQ29udGFpbmVyOiBkLnF1ZXJ5U2VsZWN0b3IoJy5qcy1uZXctcGxheWVycy1jb250YWluZXInKSxcblxuICAvLyBzdGVwIDNcbiAgJHRlYW1zTWFpbkNvbnRhaW5lcjogZC5xdWVyeVNlbGVjdG9yKCcuanMtY29udGFpbmVyLXN0ZXAtMycpLFxuICAkdGVhbXNDb250YWluZXI6IGQucXVlcnlTZWxlY3RvcignLmpzLXRlYW1zLWNvbnRhaW5lcicpLFxuXG4gIGdlbmVyYXRlSW5wdXRzOiBmdW5jdGlvbigpe1xuICAgIGZvcih2YXIgaT0wOyBpPFBsYXllcnMudG90YWw7IGkrKyl7XG4gICAgICB2YXIgaW5wdXQgPSBkLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJqcy1uZXctcGxheWVyXCIpO1xuICAgICAgaW5wdXQucGxhY2Vob2xkZXIgPSAnUGxheWVyICMnICsgKGkrMSk7XG4gICAgICB0aGlzLiRuYW1lc0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgfVxuICB9LFxuICBjaGVja0lucHV0OiBmdW5jdGlvbigkaW5wdXQpe1xuICAgIHZhciB2YWwgPSAkaW5wdXQudmFsdWU7XG4gICAgdmFyIGlzTnVtYmVyID0gIWlzTmFOKHZhbCk7XG4gICAgdmFyIGlzVG9vU2hvcnQgPSB2YWwubGVuZ3RoID09PSAwO1xuICAgIHZhciBoYXNFcnJvciA9ICghaXNOdW1iZXIgfHwgaXNUb29TaG9ydCk7XG5cbiAgICByZXR1cm4gaGFzRXJyb3I7XG4gIH0sXG4gIHNvcnRUZWFtczogZnVuY3Rpb24oKXtcbiAgICB2YXIgcGxheWVycyA9IFBsYXllcnMubmFtZXM7XG4gICAgdmFyIHBsYXllcnNMZW5ndGggPSBwbGF5ZXJzLmxlbmd0aDtcbiAgICB2YXIgcGxheWVyc0J5VGVhbSA9IHRoaXMuJGJ5VGVhbVBsYXllcnMudmFsdWU7XG5cbiAgICAvLyBtb25zdGVyIHNodWZmbGVcbiAgICBmb3IodmFyIGk9MDsgaTxwbGF5ZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgIHBsYXllcnMgPSBzaHVmZmxlQXJyYXkocGxheWVycyk7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQgZGEgbWFjaGluZVxuICAgIGZvcih2YXIgaj0wOyBqPHBsYXllcnNMZW5ndGg7IGorKyl7XG4gICAgICB2YXIgJG5ld1BsYXllciA9IGQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdmFyIGlzTmV3VGVhbSA9IChqICUgcGxheWVyc0J5VGVhbSkgPT09IDA7XG4gICAgICB2YXIgaXNFbmRUZWFtID0gKGogJSBwbGF5ZXJzQnlUZWFtKSA9PT0gKHBsYXllcnNCeVRlYW0gLSAxKTtcbiAgICAgIHZhciBpc0xhc3QgPSBqID09PSAocGxheWVyc0xlbmd0aCAtIDEpO1xuICAgICAgLy8gdmFyIGlzRW5kVGVhbSA9IChpL3BsYXllcnNCeVRlYW0pICUgMTtcbiAgICAgIC8vIHZhciBjdXJyZW50UGxheWVyID0gcGxheWVyc1tpLTFdO1xuXG4gICAgICAkbmV3UGxheWVyLmlubmVySFRNTCA9IHBsYXllcnNbal07XG5cbiAgICAgIGlmKGlzTmV3VGVhbSl7XG4gICAgICAgIHZhciAkaDIgPSBkLmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIHZhciBpbmRleCA9IE1hdGgucm91bmQoKGogKyAyKS9wbGF5ZXJzQnlUZWFtKTtcbiAgICAgICAgJGgyLmlubmVySFRNTCA9ICdUZWFtICMnK2luZGV4O1xuICAgICAgICB0aGlzLiR0ZWFtc0NvbnRhaW5lci5hcHBlbmRDaGlsZCgkaDIpO1xuICAgICAgfVxuICAgICAgaWYoIWlzRW5kVGVhbSAmJiAhaXNMYXN0KXtcbiAgICAgICAgJG5ld1BsYXllci5pbm5lckhUTUwgKz0gJywgJztcbiAgICAgIH1cbiAgICAgICAgdGhpcy4kdGVhbXNDb250YWluZXIuYXBwZW5kQ2hpbGQoJG5ld1BsYXllcik7XG4gICAgfVxuICB9XG59O1xuXG52YXIgc2h1ZmZsZUFycmF5ID0gZnVuY3Rpb24oYXJyYXkpe1xuICBmb3IodmFyIGosIHgsIGkgPSBhcnJheS5sZW5ndGg7IGk7IGogPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogaSksIHggPSBhcnJheVstLWldLCBhcnJheVtpXSA9IGFycmF5W2pdLCBhcnJheVtqXSA9IHgpO1xuICByZXR1cm4gYXJyYXk7XG59O1xuXG5QbGF5ZXJzLiRjb3VudEZvcm0ub25zdWJtaXQgPSBmdW5jdGlvbihldnQpe1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgaWYoYW5pbWF0aW9uUnVubmluZykgcmV0dXJuO1xuXG4gIHZhciBfdGhpcyA9IFBsYXllcnM7XG4gIHZhciAkdG90YWxQbGF5ZXJzID0gX3RoaXMuJHRvdGFsUGxheWVycztcbiAgdmFyICRieVRlYW1QbGF5ZXJzID0gX3RoaXMuJGJ5VGVhbVBsYXllcnM7XG4gIHZhciB0b3RhbEVycm9ycyA9IDA7XG5cbiAgLy8gcmVzZXQgYXBwIGNsYXNzZXNcbiAgJGFwcC5jbGFzc05hbWUgPSAnYXBwJztcblxuICAvLyBkaXNwbGF5IGVycm9yIGZvciBlYWNoIGlucHV0XG4gIFskdG90YWxQbGF5ZXJzLCAkYnlUZWFtUGxheWVyc10uZm9yRWFjaChmdW5jdGlvbihlbCl7XG4gICAgdmFyIGhhc0Vycm9yID0gX3RoaXMuY2hlY2tJbnB1dChlbCk7XG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZSgnZXJyb3InLCBoYXNFcnJvcik7XG4gICAgaWYoaGFzRXJyb3IpXG4gICAgICB0b3RhbEVycm9ycysrO1xuICB9KTtcblxuICAvLyBjaGVjayBpZiBwbGF5ZXJzIGJ5IHRlYW0gYXJlIG5vdCBzdXBlcmlvciBhdCB0b3RhbCBwbGF5ZXJzXG4gIC8vIGlmIG5vdCwgc3RvcmUgdGhlIHRvdGFsIHBsYXllcnMgdmFsdWVcbiAgaWYoTnVtYmVyKCRieVRlYW1QbGF5ZXJzLnZhbHVlKSA+PSBOdW1iZXIoJHRvdGFsUGxheWVycy52YWx1ZSkpe1xuICAgICR0b3RhbFBsYXllcnMuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICAkYnlUZWFtUGxheWVycy5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xuICAgIHRvdGFsRXJyb3JzKys7XG4gIH1cbiAgZWxzZSB7XG4gICAgX3RoaXMudG90YWwgPSAkdG90YWxQbGF5ZXJzLnZhbHVlO1xuICB9XG5cbiAgLy8gaWYgbWFueSBlcnJvcnMsIHdvYmJsZSAkYXBwXG4gIC8vIGlmIG5vdCwgZ2VuZXJhdGUgaW5wdXRzIGZvciBuZXh0IHN0ZXBcbiAgaWYodG90YWxFcnJvcnMgPiAwKVxuICAgICRhcHAuY2xhc3NOYW1lICs9ICcgd29iYmxlIGFuaW1hdGVkJztcbiAgZWxzZXtcbiAgICBfdGhpcy4kY291bnRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgX3RoaXMuJG5hbWVzTWFpbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBfdGhpcy5nZW5lcmF0ZUlucHV0cygpO1xuICB9XG59O1xuXG5QbGF5ZXJzLiRuYW1lc0Zvcm0ub25zdWJtaXQgPSBmdW5jdGlvbihldnQpe1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgaWYoYW5pbWF0aW9uUnVubmluZykgcmV0dXJuO1xuXG4gIHZhciBfdGhpcyA9IFBsYXllcnM7XG4gIHZhciAkaW5wdXRzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xuICBQbGF5ZXJzLm5hbWVzID0gW107XG5cbiAgLy8gY2hlY2sgZXJyb3JzXG4gIFtdLmZvckVhY2guY2FsbCgkaW5wdXRzLCBmdW5jdGlvbihlbCl7XG4gICAgdmFyIGlzRW1wdHkgPSBlbC52YWx1ZS5sZW5ndGggPT09IDA7XG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZSgnZXJyb3InLCBpc0VtcHR5KTtcbiAgICBpZighaXNFbXB0eSlcbiAgICAgIFBsYXllcnMubmFtZXMucHVzaChlbC52YWx1ZSk7XG4gIH0pO1xuXG4gIC8vIGlmIG5vIGVycm9ycywgY29udGludWVcbiAgaWYoUGxheWVycy5uYW1lcy5sZW5ndGggPT0gUGxheWVycy50b3RhbCl7XG4gICAgX3RoaXMuJG5hbWVzTWFpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBfdGhpcy4kdGVhbXNNYWluQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIF90aGlzLnNvcnRUZWFtcygpO1xuICB9XG4gIGVsc2Uge1xuICAgICRhcHAuY2xhc3NOYW1lICs9ICcgd29iYmxlIGFuaW1hdGVkJztcbiAgfVxufTtcblxuJGFwcC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRBbmltYXRpb25FbmQnLCBmdW5jdGlvbigpe1xuICAkYXBwLmNsYXNzTmFtZSA9ICdhcHAnO1xuICBhbmltYXRpb25SdW5uaW5nID0gZmFsc2U7XG59KTtcbiJdfQ==
