// import("../functions/shuffleArray.js");

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