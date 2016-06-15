/* globals console,document,window,cordova */

// current menu array is global var
var currentMenuArray;
var currentMenu;
// define main menu
//var menuArray = ["Settings_bold_dummy","Generic","Text","Audio","Vocabulary","Practice","Cancel_dimgray_cancel"];
var menuArray = ["Settings_bold_dummy","Reading","Practice","Cancel_dimgray_cancel"];
// define sub or different menu
var menuHash = {};
  //menuHash["Generic"] = "Generic_bold_dummy,Messages,Program,Back_dimgray_main";
  //  menuHash["Messages"] = "Messages_bold_dummy,Show message when adding to my words?__option_messageWord_On/Off,";
  //  menuHash["Messages"] = menuHash["Messages"] + "Show message when you toggle text or audio format?__option_messageToggle_On/Off,Back_dimgray_main";
  //  menuHash["Program"] = "Program_bold_dummy,Let App guide story order and word practice?__option_programState_On/Off,";
  //  menuHash["Program"] = menuHash["Program"] + "Word practice is based on frequency in:__option_programFreq_Story/Group/Level/Total/Corpus,";
  //  menuHash["Program"] = menuHash["Program"] + "Correct test only counts within schedule (plus margin):__option_programCorrect_On/Off,";
  //  menuHash["Program"] = menuHash["Program"] + "Delete word automatically if enough tests:__option_programCorrect_On/Off,";
  //  menuHash["Program"] = menuHash["Program"] + "Back_dimgray_main";
  menuHash["Reading"] = "Reading_bold_dummy,";
  //menuHash["Text"] = menuHash["Text"] + "Default__option_textFormat_Interlinear=int/Pop-up Int.=pnt/Pop-up=pop,";
  menuHash["Reading"] = menuHash["Reading"] + "Font Type__option_fontType_Arial/Times New Roman,";
  menuHash["Reading"] = menuHash["Reading"] + "Font Size__option_fontSize_15pt/18pt/21pt/24pt/36pt,";
  menuHash["Reading"] = menuHash["Reading"] + "Page follows audio__option_audioScroll_Off/Page,";
  menuHash["Reading"] = menuHash["Reading"] + "Back_dimgray_main";
  //menuHash["Audio"] = "Audio_bold_dummy,";
  //menuHash["Audio"] = menuHash["Audio"] + "Default__option_audioFormat_Manual=man/Automatic per page=aut/Play all=all,";
  //menuHash["Audio"] = menuHash["Audio"] + "Page follows audio__option_audioScroll_Off/Page,";
  //menuHash["Audio"] = menuHash["Audio"] + "Audio Speed__option_audioSpeed_Normal/Slow,"; // add this option later
  //menuHash["Audio"] = menuHash["Audio"] + "Back_dimgray_main";
  //menuHash["Vocabulary"] = "Vocabulary_bold_dummy,";
  //menuHash["Vocabulary"] = menuHash["Vocabulary"] + "Mark My Words__option_wordsMark_On/Off,";
  //menuHash["Vocabulary"] = menuHash["Vocabulary"] + "Show My Words__option_wordsShow_On/Off,";
  //menuHash["Vocabulary"] = menuHash["Vocabulary"] + "Mark Low Freq__option_wordsLow_On/Off,"; // add this option later (need better/more freqs)
  //menuHash["Vocabulary"] = menuHash["Vocabulary"] + "Back_dimgray_main";
  menuHash["Practice"] = "Practice_bold_dummy,";
  //menuHash["Practice"] = menuHash["Practice"] + "Reminder At Test Ready Words__option_testRemind_0/10/25/50/100,";
  menuHash["Practice"] = menuHash["Practice"] + "Schedule Repetition__option_testSched_Off=0/Daily=86400/Two Days=172800/Weekly=604800,";
  menuHash["Practice"] = menuHash["Practice"] + "Schedule Margin__option_testMargin_None =0/5%=0.05/10%=0.10/25%=0.25/50%=0.50,";
  menuHash["Practice"] = menuHash["Practice"] + "Auto Open Card__option_testAutopen_On/Off,";
  menuHash["Practice"] = menuHash["Practice"] + "Back_dimgray_main";



// menu functions
function showMenu(menu) {
  currentMenu = menu;
  if (menu !== "main") {
    currentMenuArray = menuHash[menu].split(',');
  } else {
    currentMenuArray = menuArray;
  }
  //document.getElementById("log_d").innerHTML = "Menu is " + menu + "<br>";
  var itemnumber;
  var divisionPercentage;
  var textpostPercentage;
  var positionPercentage;
  document.getElementById("menu").style.display='block';
  document.getElementById("glass").style.display='block';
  // go through given menu item array and visibilize menu items
  for (itemnumber = 0; itemnumber < currentMenuArray.length; itemnumber++) {
    divisionPercentage = itemnumber * 100/currentMenuArray.length;
    divisionEndPerc = (itemnumber + 1) * 100/currentMenuArray.length;
    positionPercentage = divisionPercentage + "%";
    positionEndPerc = divisionEndPerc + "%";
    textdivPercentage = ((itemnumber * (100 / currentMenuArray.length)) + ( ((itemnumber + 1) * 100/currentMenuArray.length) - (itemnumber * (100 / currentMenuArray.length)) ) / 20 );
    textposPercentage = textdivPercentage + "%";
    menuItemParts = currentMenuArray[itemnumber].split('_');
    if (menuItemParts[1] === "bold") {
      document.getElementById("menu_itemtext" + itemnumber).style.fontWeight='bold';
    }
    if (menuItemParts[1] === "dimgray") {
      document.getElementById("menu_itemtext" + itemnumber).style.color='dimgray';
    }
    document.getElementById("menu_item" + itemnumber).style.top=positionPercentage;
    document.getElementById("menu_item" + itemnumber).style.display='block';
    document.getElementById("menu_itemtext" + itemnumber).style.display='block';
    document.getElementById("menu_itemtext" + itemnumber).innerHTML=menuItemParts[0];
    //document.getElementById("menu_itemtext" + itemnumber).innerHTML=textposPercentage;
    document.getElementById("menu_itemtext" + itemnumber).style.top=textposPercentage;
    if (menuItemParts[2] === "option") {
      // Show message when adding to my words?__option_messageWord_On/Off,Show message when you toggle text or audio format?__option_messageToggle_On/Off
      // add options to menu item between round brackets (<options>) and fill the next line with current option
      var menuOptions = menuItemParts[4].split('/');
      var optionnumber = 0;
      var optionsDisplay = "";
      var optionCurrent = optionHash[menuItemParts[3]];
      for (optionnumber=0;optionnumber < menuOptions.length; optionnumber++) {
        var optionItems = menuOptions[optionnumber].split('=');
        // find current option
        if ( optionItems[1] !== null && optionItems[1] !== undefined && optionItems[1] !== "" && optionHash[menuItemParts[3]] === optionItems[1] ) {
          // this is a translated option
          optionCurrent = optionItems[0];
        }
        // and build all option display
        if (optionnumber === 0) {
          optionsDisplay = optionsDisplay + optionItems[0];
        } else {
          optionsDisplay = optionsDisplay + "/" + optionItems[0];
        }
      }
      document.getElementById("menu_itemtext" + itemnumber).innerHTML=document.getElementById("menu_itemtext" + itemnumber).innerHTML + "<br><span class='menuchoice'>(" + optionsDisplay + ")</span><br><span class='menuchosen'><b>" + optionCurrent + "</b></span>";
    }
  }
}
function actionItem(itemnumber) {
  var menuItemParts = currentMenuArray[itemnumber].split('_');
  var itemnumber = 0;
  //document.getElementById("log_d").innerHTML = "Chosen item is " + menuItemParts[2] + "<br>";
  if (menuItemParts[2] === "cancel") {
    // erase menu
    document.getElementById("menu").style.display='none';
    document.getElementById("glass").style.display='none';
    // go through given menu item array and invisibilize and defaultize menu items again
    for (itemnumber = 0; itemnumber < currentMenuArray.length; itemnumber++) {
      //document.getElementById("log_e").innerHTML = "deleting menu item " + itemnumber;
      document.getElementById("menu_item" + itemnumber).style.display='none';
      document.getElementById("menu_itemtext" + itemnumber).style.fontWeight='normal';
      document.getElementById("menu_itemtext" + itemnumber).style.color='black';
      document.getElementById("menu_itemtext" + itemnumber).style.display='none';
    }
  }
  if (menuItemParts[2] === "main") {
    // erase menu
    document.getElementById("menu").style.display='none';
    document.getElementById("glass").style.display='none';
    // go through given menu item array and invisibilize and defaultize menu items again
    for (itemnumber = 0; itemnumber < currentMenuArray.length; itemnumber++) {
      //document.getElementById("log_e").innerHTML = "going back, deleting menu item " + itemnumber;
      document.getElementById("menu_item" + itemnumber).style.display='none';
      document.getElementById("menu_itemtext" + itemnumber).style.fontWeight='normal';
      document.getElementById("menu_itemtext" + itemnumber).style.color='black';
      document.getElementById("menu_itemtext" + itemnumber).style.display='none';
    }
    // go to main menu
    showMenu('main');
  }
  if (menuItemParts[2] === "option") {
    // Show message when adding to my words?__option_messageWord_On/Off,Show message when you toggle text or audio format?__option_messageToggle_On/Off
    // first unpack options
    var menuOptions = menuItemParts[4].split('/');
    // now do stuff with it, ehh toggle through it
    for (itemnumber=0; itemnumber < menuOptions.length; itemnumber++) {
      // find current chosen option
      var optionItems = menuOptions[itemnumber].split('=');
      if ( ( optionItems[1] !== null && optionItems[1] !== undefined && optionItems[1] !== "" && optionHash[menuItemParts[3]] === optionItems[1] ) || optionHash[menuItemParts[3]] === menuOptions[itemnumber]) {
        // this is current chosen option, toggle to next
        if (itemnumber < menuOptions.length - 1) {
          if ( optionItems[1] !== null && optionItems[1] !== undefined && optionItems[1] !== "" ) {
            optionItems = menuOptions[itemnumber+1].split('=');
            optionHash[menuItemParts[3]] = optionItems[1];
          } else {
            optionHash[menuItemParts[3]] = menuOptions[itemnumber+1];
          }
          itemnumber = 99999;
        } else {
          if ( optionItems[1] !== null && optionItems[1] !== undefined && optionItems[1] !== "" ) {
            optionItems = menuOptions[0].split('=');
            optionHash[menuItemParts[3]] = optionItems[1];
          } else {
            optionHash[menuItemParts[3]] = menuOptions[0];
          }
          itemnumber = 99999
        }
      }
    }
    if ( ( undefined !== curpint && null !== curpint && curpint !== "" && curpint !== "vocabulary" ) && ( menuItemParts[3] === "fontSize" || menuItemParts[3] === "fontType" ) ) {
      setStyle("frommenu");
    }
    if ( curpint === "vocabulary" && ( menuItemParts[3] === "testSched" || menuItemParts[3] === "testMargin" ) ) {
      listPath(myPath + "/myWords/");
    }
    window.resolveLocalFileSystemURL(myPath, function (dir) {
      dir.getFile("optionhash", { create: true }, function (file) {
        textObj = file;
        textObj.file(function (file) {
          textObj.createWriter(function (fileWriter) {
            // writing to optionhash file, dissecting optionHash into textdata
            var itemnumber = 0;
            var textdata = "";
            for (var key in optionHash) {
              textdata = textdata + key + "=" + optionHash[key] + ",";
            }
            textdata = textdata.substring(0, textdata.length - 1);
            fileWriter.write(textdata);
          }, fail);
        });
      });
    });
    showMenu(currentMenu);
  }
  if (menuItemParts[2] !== "option" && menuItemParts[2] !== "cancel" && menuItemParts[2] !== "back" && null !== menuHash[menuItemParts[0]] && undefined !== menuHash[menuItemParts[0]] && menuHash[menuItemParts[0]] !== "") {
    // erase menu
    document.getElementById("menu").style.display='none';
    document.getElementById("glass").style.display='none';
    // go through given menu item array and invisibilize and defaultize menu items again
    for (itemnumber = 0; itemnumber < currentMenuArray.length; itemnumber++) {
      //document.getElementById("log_e").innerHTML = "deleting menu item " + itemnumber;
      document.getElementById("menu_item" + itemnumber).style.display='none';
      document.getElementById("menu_itemtext" + itemnumber).style.fontWeight='normal';
      document.getElementById("menu_itemtext" + itemnumber).style.color='black';
      document.getElementById("menu_itemtext" + itemnumber).style.display='none';
    }
    // go to submenu
    showMenu(menuItemParts[0]);
  }
}