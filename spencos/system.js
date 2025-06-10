// Change localstorage settings on page load

if (!localStorage.getItem('data-theme')) {
  localStorage.setItem("desktop-theme", "dark");
}

function changeTheme(theme) {  
  document.documentElement.setAttribute("desktop-theme", theme);
  localStorage.setItem("desktop-theme", theme);
  console.log("I give you " + theme);
}

const data = ['theme', 'setting-debug-outlines', 'setting-acc-reduced-motion', 'setting-style-nightlight','setting-style-splashscreen']

data.forEach(setting => {
  let state = localStorage.getItem('desktop-' + setting);
  document.documentElement.setAttribute("desktop-" + setting, state);
});

function changeSetting(setting) {  
  let currentState = localStorage.getItem('desktop-' + setting);
  let newState;
  
  if (currentState == "true"){
    newState = "false";
  }
  else{
    newState = "true";
  }
  document.documentElement.setAttribute("desktop-" + setting, newState);
  localStorage.setItem("desktop-" + setting, newState);
  console.log("Set desktop-" + setting + " to " + newState);
}


const checkbox = document.getElementById("switchTheme");

checkbox.addEventListener('change', ()=> {
    let theme = localStorage.getItem('desktop-theme');
    if (theme ==='light'){
        changeTheme('dark')
    }else{
        changeTheme('light')
    }
});



//Window Controls
dragElement(document.getElementById("About Ska"));
dragElement(document.getElementById("Ska"));
dragElement(document.getElementById("Settings"));
dragElement(document.getElementById("Ska.Space"));
dragElement(document.getElementById("Cloud"));
dragElement(document.getElementById("SpiderWeb"));
dragElement(document.getElementById("Cyan"));
dragElement(document.getElementById("Posts"));
dragElement(document.getElementById("Media"));

let apps = document.querySelectorAll('.app');
apps.forEach(function(app) {
  app.addEventListener('click', function() {
    windowToTop(app);
  });
});

function windowToTop(app) {
  apps.forEach(function(app) {
    if (app.style.zIndex = 10){
      app.style.zIndex = 9;
    }      
  })
  app.style.zIndex = 10;
}

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
      if(UIStateStart = 1){
        uiFunction("Start");
      }
      if(UIStateNotify = 1){
        uiFunction("Notify");
      }
      if(UIStateCCenter = 1){
        uiFunction("CCenter");
      }
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

function shutdown() {
  document.getElementById("shutdown").style.display = "block";

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1800);
}

var UIStateStart = 0;
var UIStateNotify = 0;
var UIStateCCenter = 0;
var desktopStateAudio = 0;

function uiFunction(name) {
  switch(name){
    case "Start":
      switch(UIStateStart){
        case 0:
          document.getElementById("start").style.animation = "slideUp 0.25s ease 1 normal forwards";
          document.getElementById("start").style.display = "block";
          UIStateStart = 1;
          break;
        case 1:
          document.getElementById("start").style.animation = "slideOut 0.25s ease 1 normal forwards";
          UIStateStart = 0;
          break;
      }
    break;

    case "Notify":
      switchUI("Notify");
      break;

    case "Peek":{
      apps.forEach(function(app) {
        var taskbarName = (app + "Icon");
        if(document.getElementById(taskbarName) == null){
          
        }
      });      
    }

    case "CCenter": {
      switchUI("CCenter");
      break;
    }

    case "Audio": {
      var audioToggle = document.getElementById('audioToggle').src;
      var audioIcon = document.getElementById('audioIcon').src;
      switch(desktopStateAudio) {
        case 0:
          document.getElementById("ccenter").style.animation = "slideUp 0.25s ease 1 normal forwards";
          document.getElementById("ccenter").style.display = "block";
          document.getElementById('audioIcon').src = 'spencos/images/icons/soundOn.png';
          document.getElementById('audioToggle').src = 'spencos/images/icons/soundOn.png';
          desktopStateAudio = 1
          break;
        case 1:
          document.getElementById('audioIcon').src = 'spencos/images/icons/soundOff.png';
          document.getElementById('audioToggle').src = 'spencos/images/icons/soundOff.png';
          desktopStateAudio = 0;
          break;
      }
      break;
    }
  }
}

function switchUI(type){
  switch(type){
    case "Notify": {
      switch(UIStateNotify){
        case 0:
          document.getElementById("notify").style.animation = "slideRightToLeftIn 0.25s ease 1 normal forwards";
          document.getElementById("notify").style.display = "block";
          UIStateNotify = 1;
          if(UIStateCCenter = 1){
            switchUI("CCenter");
          }
          break;
        case 1:
          document.getElementById("notify").style.animation = "slideRightToLeftOut 0.25s ease 1 normal forwards";
          UIStateNotify = 0;
          break;
      }
      break;
    }

    case "CCenter": {
      switch(UIStateCCenter){
        case 0:
          document.getElementById("ccenter").style.animation = "slideUp 0.25s ease 1 normal forwards";
          document.getElementById("ccenter").style.display = "block";
          UIStateCCenter = 1;
          if(UIStateNotify = 1){
            switchUI("Notify");
          }
          break;
        case 1:
          document.getElementById("ccenter").style.animation = "slideOut 0.25s ease 1 normal forwards";
          UIStateCCenter = 0;
          break;
      }
      break;
    }
  }
}

var flipflop = 0;

// App engine
function appFunction(name, type) {
  var appName = document.getElementById(name);
  var taskbarName = (name + "Icon");
    switch(type){
      case "toggle":
        if(appName.classList.contains('opened')) {
          appName.classList.remove('opened')
          document.getElementById(taskbarName).classList.remove('active')
          appName.style.animation = "minimize 0.4s ease 1 normal forwards";
          break;
        }
        else{
          openApp(name);
          break;
        }
        
      case "close":
        appName.classList.remove('opened')
        document.getElementById(taskbarName).classList.remove('active')
        document.getElementById(taskbarName).style.display = "none";
        appName.style.animation = "popout 0.4s ease 1 normal forwards";
        var menu = document.getElementById("taskbar");
        menu.removeChild(document.getElementById(taskbarName));
        setTimeout(function(){appName.style.display = "none";}, 400);
        break;

      case "maximize":
        if(appName.classList.contains('resized')){
          appName.classList.remove('resized')
          appName.style.width = "50%";
          appName.style.height = "50%";
          appName.style.top = "calc(25%)";
          appName.style.left = "calc(25%)";
          appName.style.borderRadius = "10px";
          flipflop = 0;
          break;
        }
        else {
          appName.classList.add('resized')
          appName.style.width = "100%";
          appName.style.height = "calc(100% - 75px)";
          appName.style.top = "calc(0%)";
          appName.style.left = "calc(0%)";
          appName.style.borderRadius = "0px";
          flipflop = 1;
          break;
        }
      case "open":
        if(!appName.classList.contains('opened')) {
          openApp(name)
        }
        else{
          windowToTop(appName);
        }
        break;
      }
    }

// Specific app engine functions
function openApp(name) {
  var appName = document.getElementById(name);
  var taskbarName = (name + "Icon");

  if(document.getElementById(taskbarName) == null){
    var menu = document.getElementById("taskbar");
    var newlink = document.createElement("a");
    newlink.setAttribute("id", name + "Icon");
    newlink.setAttribute("class", "active");
    newlink.setAttribute("onclick", "appFunction('" + name + "', 'toggle')");
    newlink.innerHTML = ("<img src='spencos/images/apps/" + name + "Icon.webp'>" + name) 
    menu.appendChild(newlink);

  }
  appName.classList.add('opened')
  document.getElementById(taskbarName).classList.add('active');
  appName.style.display = "block";
  document.getElementById(taskbarName).style.display = "inline-flex";
  appName.style.animation = "popup 0.4s ease 1 normal forwards";
  windowToTop(appName);
}

//Wallpaper
$(switchBackground);
var oFReader = new FileReader(),
    rFilter = /^(?:image\/bmp|image\/webp|image\/|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

oFReader.onload = function(oFREvent) {
    localStorage.setItem('wallpaper', oFREvent.target.result);
    switchBackground();
};

function switchBackground() {
  var backgroundImage = localStorage.getItem('wallpaper');
  if (backgroundImage) {
    $('body').css('background-image', 'url(' + backgroundImage + ')');    
    $('#wallpaperPreview').css('background-image', 'url(' + backgroundImage + ')');    
    closeList();
  } 
}

function loadImageFile(testEl) {
  if (! testEl.files.length) { return; }
  var oFile = testEl.files[0];
  if (!rFilter.test(oFile.type)) { alert("You must select a valid image file!"); return; }
  oFReader.readAsDataURL(oFile);
}

function clearBackground() {
    localStorage.removeItem('wallpaper')
    window.location.reload()
}

//Microsoft Copilot made this code, couldn't find anything on the internet

const container = document.getElementById('container'); 
const selection = document.getElementById('selection'); 

let startX, startY, endX, endY; 
container.addEventListener('mousedown', (e) =>  { 
  startX = e.clientX; 
  startY = e.clientY; 
  selection.style.left = `${startX}px`; 
  selection.style.top = `${startY}px`; 
  selection.style.width = `0px`; 
  selection.style.height = `0px`; 
  selection.style.display = 'block'; 
  container.addEventListener('mousemove', onMouseMove); 
}); 

container.addEventListener('mouseup', () => { 
  container.removeEventListener('mousemove', onMouseMove); 
  selection.style.display = 'none'; 
}); 
  
function onMouseMove(e) { 
  let currentX = e.clientX; 
  let currentY = e.clientY; 
  let width = Math.abs(currentX - startX); 
  let height = Math.abs(currentY - startY); 
  
  selection.style.width = `${width}px`; 
  selection.style.height = `${height}px`; 
  
  if (currentX < startX) { selection.style.left = `${currentX}px`; } 
  if (currentY < startY) { selection.style.top = `${currentY}px`; }
}


const targetDivs = document.querySelectorAll('.app');

const observer = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const element = entry.target;
    const width = entry.contentRect.width;

    if (width < 500 && !element.classList.contains("mobile")) {
      element.classList.add('mobile')
    } else if (width > 500 && element.classList.contains("mobile")) {
      element.classList.remove('mobile')
    }

    if (width <= 800 && !element.classList.contains("mobileIfWebapp")) {
      element.classList.add('mobileIfWebapp')
    } else if (width > 800 && element.classList.contains("mobileIfWebapp")) {
      element.classList.remove('mobileIfWebapp')
    }
  }
});

targetDivs.forEach((div) => observer.observe(div))

// Back to my code

function pageView(appName, selection){
  selected = (appName + selection)

  const buttonList = document.querySelector('#' + appName + ' .menuButtons');
  const buttons = buttonList.querySelectorAll('button');

  buttons.forEach(button => {
    button.style.backgroundColor = "transparent";
    });

  const pagesList = document.querySelector('#' + appName + ' .pageView');
  const pages = pagesList.querySelectorAll('.page');
  
  pages.forEach(page => {
    page.style.display = "none";
  });

  document.getElementById(selected).style.display = "block";
  document.getElementById(selected + "Button").style.backgroundColor = "var(--element-hover)";
}

// Image viewer

const imgs = document.querySelectorAll('.viewable');
const imageViewer = document.querySelector('#imageViewer');
const imageBackdrop = document.querySelector('#imageBackdrop');
const imageDisplay = document.querySelector('#imageDisplay');

imgs.forEach(img => {
  img.addEventListener('click', function() {
    appFunction('Media', 'open');
    imageDisplay.style.backgroundImage = 'url(' + img.src + ')';
    imageBackdrop.style.backgroundImage = 'url(' + img.src + ')';
  });
});

function backgroundViewer(given){
    appFunction('Media', 'open');
    imageDisplay.style.backgroundImage = 'url(' + given + ')';
    imageBackdrop.style.backgroundImage = 'url(' + given + ')';
}