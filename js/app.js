var d=document,container_first=d.getElementById("js-container_step_1"),container_second=d.getElementById("js-container_step_2"),container_third=d.getElementById("js-container_step_3"),BV_playersRepartiton=d.getElementById("js-valid_step1"),BV_playersNames=d.getElementById("js-valid_step2"),I_PbyTeam=d.getElementById("js-total_byteam"),I_totalP=d.getElementById("js-total_players"),shuffleArray=function(e){for(i=e.length-1;i>0;i--){var t=Math.floor(Math.random()*(i+1)),a=e[i];e[i]=e[t],e[t]=a}return e},toggleContainers=function(e,t){e.classList.add("hidden"),t.classList.remove("hidden")},inputError=function(e){var t=e.value,a=t.length<1,r=!isNaN(t);return!a&&r},validPlayerRepartition=function(){var e,t,a=!1;return I_totalP.classList.toggle("error",!inputError(I_totalP)),I_PbyTeam.classList.toggle("error",!inputError(I_PbyTeam)),t=Math.floor(I_PbyTeam.value),e=Math.floor(I_totalP.value),a=!I_totalP.classList.contains("error")&&!I_PbyTeam.classList.contains("error")&&1>t/e,a||(I_PbyTeam.classList.add("error"),I_totalP.classList.add("error")),a},generateInputs=function(){var e=d.getElementById("js-new_players"),t=I_totalP.value;for(i=0;t>i;i++){var a=d.createElement("input");a.classList.add("js-new_player"),a.placeholder="Player "+(i+1),e.appendChild(a)}},goToStep2=function(){var e=validPlayerRepartition();e&&(toggleContainers(container_first,container_second),generateInputs())},validAndGetPlayersNames=function(){var e=[],t=d.querySelectorAll("input.js-new_player"),a=t.length,r=!1;for(i=0;a>i;i++){var n=t[i],o=n.value,l=o.length<1;n.classList.toggle("error",l),r=!l,l||e.push(o)}return r?e:!1},shuffleArray=function(e){for(i=e.length-1;i>0;i--){var t=Math.floor(Math.random()*(i+1)),a=e[i];e[i]=e[t],e[t]=a}return e},sortTeam=function(e){e=shuffleArray(e);var t=d.getElementById("js-teams_container"),a=I_PbyTeam.value,r=e.length+1;for(i=0;r>i;i++){var n=d.createElement("span"),o=e[i-1],l=i%a,s=i/a%1;if(1===l){var c=d.createElement("h2");c.innerHTML="Team "+Math.round((i+1)/a),t.appendChild(c)}i>0&&(0===s||i===r-1?(n.classList.add("last-item"),n.innerHTML=o):n.innerHTML=o+",",t.appendChild(n))}},goToStep3=function(){var e=validAndGetPlayersNames();e&&(toggleContainers(container_second,container_third),sortTeam(e))};BV_playersRepartiton.addEventListener("click",goToStep2),BV_playersNames.addEventListener("click",goToStep3);