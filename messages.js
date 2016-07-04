
var defaultMsgTime = 2000;
var noTipUp = false; // this should be retrieved from preferences
var showingMsg = false;
var msgTimeout;
var counting;
var loadTimeout;
var fadeTimebit;
var fadePerc;
var fadeTime;
var msgTime;


function toggleDirect(targetPage,msgToShow,command,timeToShow) {
  var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (noTipUp === true && targetPage !== "") {
    // direct to page after timeout finishes
    clearTimeout(loadTimeout);
    loadTimeout = setTimeout(function() {
      top.location.href = targetPage;
    },timeToShow);
  } else {
    if (msgToShow !== "") {
      // set msg block
      showingMsg = true;
      document.getElementById("msg_block").innerHTML = msgToShow;
      // display total block
      if (command === "fadeOn") {
        opacityBase = 0;
        document.getElementById("msg").style.opacity='0';
        document.getElementById("msg").style.display='block';
        document.getElementById("glass").style.display='block';
        fadeTime = timeToShow / 2;   //2000 -> 1000
        fadeTimebit = fadeTime / 20;
        fadePerc = 0;
        // fade in and out
        clearTimeout(msgTimeout);
        counting = "Down";
        msgTimeout = setInterval(goFadeMsg,fadeTimebit);
      } else {
        clearTimeout(msgTimeout);
        document.getElementById("msg").style.opacity='1';
        document.getElementById("msg").style.display='block';
        if (command === "noGlass") {
          // don't show tinted glass
        } else {
          document.getElementById("glass").style.display='block';
        }
        msgTimeout = setInterval(interruptFade,timeToShow);
      }
    } else {
      // no msgToShow, so don't show, it's just a timeout plus redirect
    }
    // if targetPage is not empty, direct to page after timeout finishes
    clearTimeout(loadTimeout);
    if (targetPage !== "") {
      // Setting msg timeout
      loadTimeout = setTimeout(function() {
        top.location.href = targetPage;
        if (command === "scroll") {
          var currentYPos = window.pageYOffset;
          window.scrollTo(0, window.pageYOffset - 200);
          // now check if this actually did something
          if (currentYPos === window.pageYOffset ) {
            // nuttin happened, must be on android, pluck element id apart
            var element_parts = elem_id.split('_');
            var element_main = element_parts[0];
            var element_number = element_parts[1];
            // get lowest element id on current page
            var zootje = document.getElementById(bookmark).innerHTML;
            zootjeParts = zootje.split('\<\!\-\-');
            zootje = zootjeParts[1];
            zootjeParts = zootje.split('\-\->');
            zootje = zootjeParts[0];
            zootjeParts = zootje.split('_');
            var fontsize = optionHash["fontSize"].substring(0,2) / 1;
            var nowts = 10; // Number Of Words To Shift from top of page so word to go to is not right at the top
            if ( fontsize === 21 && w < 800 ) {
              nowts = 6;
            }
            if ( fontsize === 24 && w < 800 ) {
              nowts = 4;
            }
            if ( fontsize > 24 && w < 800 ) {
              nowts = 2;
            }
            if ( element_number > ((zootjeParts[2]/1) + nowts) ) {
              element_number = element_number - nowts;
              elem_id = element_main + "_" + element_number;
              top.location.href = "text_" + curpint + "_" + curaudio + ".htm#" + elem_id;
            } else {
              top.location.href = "text_" + curpint + "_" + curaudio + ".htm#" + bookmark;
            }
          } else {
            // Repositioning worked...
          }
        }
      },timeToShow*1.3);
    } else {
      loadTimeout = setTimeout(function() {
      	showingMsg = false;
      	if (command === "draw" && document.getElementById("wholething").style.visibility === "hidden") {
      	  console.log("Timeout for drawing, force screen draw!");
          document.getElementById("wholething").style.visibility='visible';
      	}
      },timeToShow*1.3);
    }
  }
}
function goFadeMsg() {
  if (counting === "Down") {
    if (fadePerc < 105) {
      console.log("Fading in at " + fadePerc);
      fadePerc = fadePerc + 5;
      opacityBase = fadePerc / 20;
      document.getElementById("msg").style.opacity = opacityBase;
    } else {
      // end of fade in cycle
      counting = "Up";
    }
  } else {
    if (fadePerc > 9) {
      console.log("Fading out at " + fadePerc);
      fadePerc = fadePerc - 5;
      opacityBase = fadePerc / 20;
      document.getElementById("msg").style.opacity = opacityBase;
    } else {
      // end of fade cycle
      document.getElementById("msg").style.display='none';
      document.getElementById("glass").style.display='none';
      clearTimeout(msgTimeout);
    }
  }
}
function interruptFade() {
  // end fade cycle
  document.getElementById("msg").style.display='none';
  document.getElementById("glass").style.display='none';
  clearTimeout(msgTimeout);
  noTipUp = true;
}
