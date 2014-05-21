// import("../functions/validAndGetPlayersNames.js");
// import("../functions/sortTeams.js");

var goToStep3 = function(){
  var playersArray = validAndGetPlayersNames();

  if(playersArray){
    toggleContainers(container_second, container_third);
    sortTeam(playersArray);
  }
};