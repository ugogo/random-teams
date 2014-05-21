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

// import("functions/shuffleArray.js");
// import("functions/toggleContainers.js");

// import("functions/goToStep2.js");
// import("functions/goToStep3.js");

BV_playersRepartiton
  .addEventListener("click", goToStep2);

BV_playersNames
  .addEventListener("click", goToStep3);
