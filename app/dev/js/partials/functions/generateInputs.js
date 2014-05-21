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