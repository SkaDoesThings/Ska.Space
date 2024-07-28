//Clock

window.addEventListener("load", () => {
  clock();
  function clock() {
    const today = new Date();

    // get time components
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    //add '0' to hour, minute & second when they are less 10
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;

    //make clock a 12-hour time clock
    const hourTime = hour > 12 ? hour - 12 : hour;

    // if (hour === 0) {
    //   hour = 12;
    // }
    //assigning 'am' or 'pm' to indicate time of the day
    const ampm = hour < 12 ? "AM" : "PM";

    // get date components
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getDate();

    //declaring a list of all months in  a year
    const monthList = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ];

    //get current date and time
    const date = monthList[month] + "/" + day + "/" + year;
    const time = hourTime + ":" + minute + ":" + second + ampm;

    //combine current date and time
    const dateTime = time + " <br> " + date;

    //print current date and time to the DOM
    document.getElementById("date-time").innerHTML = dateTime;
    setTimeout(clock, 1000);
  }
});


//Window Controls

// Make the DIV element draggable:
dragElement(document.getElementById("appSettings"));
dragElement(document.getElementById("appSeal"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}




//Main Desktop

function clickDesktop() {
  switch(event.which) {
    case 1:
      document.getElementById("start").style.animation = "slideOut 0.4s ease 1 normal forwards";
      document.getElementById("notify").style.animation = "slideRightToLeftOut 0.4s ease 1 normal forwards";
      break;
    case 2:
      $('#desktop').html('Middle Mouse button pressed.');
      break;
    case 3:
      $('#desktop').html('Right Mouse button pressed.');
      break;
    default:
      $('#desktop').html('You have a strange Mouse!');
  }
}

function clickTaskbar() {
  
}

function uiFunction(name, type) {
  switch(name){
    case "Start":
      switch(type){
        case "open":
          document.getElementById("start").style.animation = "slideUp 0.4s ease 1 normal forwards";
          document.getElementById("start").style.display = "block";
          break;
      }
    break;

    case "Notify":
      switch(type){
        case "open":
          document.getElementById("notify").style.animation = "slideRightToLeftIn 0.4s ease 1 normal forwards";
          document.getElementById("notify").style.display = "block";
          break;
      }
    break;
  }
}

var flipflop = 0;

function appFunction(name, type) {
  switch(name){
    case "Settings": 
      switch(type){
        case "open":
          document.getElementById("appSettings").style.animation = "popup 0.4s ease 1 normal forwards";
          document.getElementById("appSettings").style.display = "block";
          break;

        case "minimize":
          document.getElementById("appSettings").style.animation = "minimize 0.4s ease 1 normal forwards";
          break;
      }
      
    break;
    
    case "Seal": 
      switch(type){
        case "open":
          document.getElementById("appSeal").style.animation = "popup 0.4s ease 1 normal forwards";
          document.getElementById("appSeal").style.display = "block";
          break;
        case "minimize":
          document.getElementById("appSeal").style.animation = "minimize 0.4s ease 1 normal forwards";
          break;
        case "maximize":
          if(flipflop == 0){
              document.getElementById("appSeal").style.width = "100%"
              document.getElementById("appSeal").style.height = "calc(100% - 75px)"
              document.getElementById("appSeal").style.top = "calc(0%)"
              document.getElementById("appSeal").style.left = "calc(0%)"
              flipflop = 1;
              break;
          }
          else {
              document.getElementById("appSeal").style.width = "50%"
              document.getElementById("appSeal").style.height = "50%"
              document.getElementById("appSeal").style.top = "calc(25%)"
              document.getElementById("appSeal").style.left = "calc(25%)"
              flipflop = 0;
              break;
          }
          break;
          case "close":
          document.getElementById("appSeal").style.animation = "popout 0.4s ease 1 normal forwards";
          break;
      }
    break;
  }
}




