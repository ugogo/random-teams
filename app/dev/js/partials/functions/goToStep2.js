// import("../functions/validPlayerRepartition.js");
// import("../functions/generateInputs.js");

var goToStep2 = function(){
  var noError = validPlayerRepartition();

  if(noError){
    toggleContainers(container_first, container_second);
    generateInputs();
  }
};