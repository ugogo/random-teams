var inputError = function(input){
  var val        = input.value
    , isTooShort = val.length < 1
    , isNumber   = !isNaN(val)
  ;

  return !isTooShort && isNumber;
};