// import("../functions/inputError.js");

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