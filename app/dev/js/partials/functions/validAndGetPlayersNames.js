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