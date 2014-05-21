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