var d=document,$app=d.querySelector(".app"),animationRunning=!1,Players={$countContainer:d.querySelector(".js-container-step-1"),$countForm:d.querySelector(".js-valid-players-number"),$totalPlayers:d.querySelector(".js-total-players"),$byTeamPlayers:d.querySelector(".js-byteam-players"),$namesMainContainer:d.querySelector(".js-container-step-2"),$namesForm:d.querySelector(".js-new-players-form"),$namesContainer:d.querySelector(".js-new-players-container"),$teamsMainContainer:d.querySelector(".js-container-step-3"),$teamsContainer:d.querySelector(".js-teams-container"),generateInputs:function(){for(var e=0;e<Players.total;e++){var a=d.createElement("input");a.classList.add("js-new-player"),a.placeholder="Player #"+(e+1),this.$namesContainer.appendChild(a)}},checkInput:function(e){var a=e.value,n=!isNaN(a),r=0===a.length,t=!n||r;return t},sortTeams:function(){for(var e=Players.names,a=e.length,n=this.$byTeamPlayers.value,r=0;r<e.length;r++)e=shuffleArray(e);for(var t=0;a>t;t++){var s=d.createElement("span"),l=t%n===0,i=t%n===n-1,o=t===a-1;if(s.innerHTML=e[t],l){var u=d.createElement("h2"),c=Math.round((t+2)/n);u.innerHTML="Team #"+c,this.$teamsContainer.appendChild(u)}i||o||(s.innerHTML+=", "),this.$teamsContainer.appendChild(s)}}},shuffleArray=function(e){for(var a,n,r=e.length;r;a=parseInt(Math.random()*r),n=e[--r],e[r]=e[a],e[a]=n);return e};Players.$countForm.onsubmit=function(e){if(e.preventDefault(),!animationRunning){var a=Players,n=a.$totalPlayers,r=a.$byTeamPlayers,t=0;$app.className="app",[n,r].forEach(function(e){var n=a.checkInput(e);e.classList.toggle("error",n),n&&t++}),Number(r.value)>=Number(n.value)?(n.classList.add("error"),r.classList.add("error"),t++):a.total=n.value,t>0?$app.className+=" wobble animated":(a.$countContainer.classList.add("hidden"),a.$namesMainContainer.classList.remove("hidden"),a.generateInputs())}},Players.$namesForm.onsubmit=function(e){if(e.preventDefault(),!animationRunning){var a=Players,n=this.querySelectorAll("input");Players.names=[],[].forEach.call(n,function(e){var a=0===e.value.length;e.classList.toggle("error",a),a||Players.names.push(e.value)}),Players.names.length==Players.total?(a.$namesMainContainer.classList.add("hidden"),a.$teamsMainContainer.classList.remove("hidden"),a.sortTeams()):$app.className+=" wobble animated"}},$app.addEventListener("webkitAnimationEnd",function(){$app.className="app",animationRunning=!1});