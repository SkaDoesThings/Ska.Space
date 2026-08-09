// =-=-=-= ( Dynamic App List ) =-=-=-=

const app_list = [
  // Native apps
  { name: 'Settings', id: `Settings`, icon: `spencos/media/apps/SettingsIcon.webp`, path: '/apps/Settings.html', onclick: `appFunction('Settings', 'toggle')`},
  { name: 'Cyan', id: 'Cyan',  icon: `spencos/media/apps/CyanIcon.webp`, path: '/apps/Cyan.html', onclick: `appFunction('Cyan', 'toggle')`},
  { name: 'SpiderWeb', id: 'SpiderWeb', icon: `spencos/media/apps/SpiderWebIcon.webp`, path: '/apps/SpiderWeb.html', onclick: `appFunction('SpiderWeb', 'toggle')`},
  { name: 'Photos', id: 'Photos', icon: `spencos/media/apps/PhotosIcon.webp`, path: '/apps/Photos.html', onclick: `appFunction('Photos', 'toggle')`},

  // Web apps
  { name: 'Ska.Space', id: 'Ska.Space', icon: `spencos/media/apps/Ska.SpaceIcon.webp`, path: '/apps/Ska.Space.html', onclick: `appFunction('Ska.Space', 'toggle')`},
  { name: 'Posts', id: 'Posts', icon: `spencos/media/apps/PostsIcon.webp`, path: '/apps/Posts.html', onclick: `appFunction('Posts', 'toggle')`},
  { name: 'Cloud', id: 'Cloud', icon: `spencos/media/apps/CloudIcon.webp`, path: '/apps/Cloud.html', onclick: `appFunction('Cloud', 'toggle')`},

  // Misc apps
  { name: 'Ska', id: 'Ska', icon: `spencos/media/apps/SkaIcon.webp`, path: '/apps/Ska.html', onclick: `appFunction('Ska', 'toggle')`}
];

var startList = document.getElementById('startIcons');

app_list.forEach(app => {
  var newApp = document.createElement("li");
  newApp.setAttribute("onclick", app.onclick)
  newApp.innerHTML = ("<img src='" + app.icon + "'>" + app.name);
  startList.appendChild(newApp);
});


// =-=-=-= ( Setting & State Retrieval ) =-=-=-=

const settings = ['theme', 'audio', 'debug_outlines', 'reduced_motion', 'nightlight','no_splashscreen',
              'taskbar_no_names', 'taskbar_center', 'no_transparency', 'square_corners'
]

// Change localstorage settings on page load 
if (!localStorage.getItem('dset_theme')) {
  localStorage.setItem("dset_theme", "dark");
}

function changeTheme(theme) {  
  document.documentElement.setAttribute("dset_theme", theme);
  localStorage.setItem("dset_theme", theme);
  console.log("I give you " + theme);
}

// Immediately initialize settings on page load
settings.forEach(setting => {
  // Grab the current localstorage saved state of each setting
  let state = localStorage.getItem('dset_' + setting);
  // Update the website with the state
  document.documentElement.setAttribute("dset_" + setting, state);
  // Apply styling to the button
  const button = document.querySelector(`[data-setting="${setting}"]`);
  // If button (or slider) exists, update its visual style
  if (button) {
    button.setAttribute('data_active', state)
  }
});


// The part where settings are actually toggled
function changeSetting(setting) {
  let state = localStorage.getItem('dset_' + setting);
  if (state == "true") {
    state = "false";
  }
  else {
    state = "true";
  }

  document.documentElement.setAttribute("dset_" + setting, state);
  localStorage.setItem("dset_" + setting, state);
  console.log("Set dset_" + setting + " to " + state);

  // Return the toggle state so more code can be done on buttons
  return state;
}

// Global button/slider click listener
// Note: 'dset' stands for desktop setting
document.addEventListener('click', (e) => {
  const button = e.target.closest('.sliderButton');
  if (!button) return;

  const setting = button.dataset.setting;
  
  state = changeSetting(setting)
  button.setAttribute('data_active', state);
})

const checkbox = document.getElementById("switchTheme");

/*checkbox.addEventListener('change', ()=> {
    let theme = localStorage.getItem('dset_theme');
    if (theme ==='light'){
        changeTheme('dark')
    }else{
        changeTheme('light')
    }
});*/

// =-=-=-= ( Taskbar Clock ) =-=-=-= 

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

// =-=-=-= ( Main Desktop ) =-=-=-= 

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
      console.log("Left mouse button pressed");
      break;
    case 2:
      console.log("Middle mouse button pressed");
      break;
    case 3:
      console.log("Right mouse button pressed");
      break;
    default:
      console.log("You have a strange mouse!");
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

// TODO: Taskbar drag and drop

// =-=-=-= ( Destkop Wallpaper ) =-=-=-= 

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

// =-=-=-= ( Image Viewer ) =-=-=-= 

const imgs = document.querySelectorAll('.viewable');

document.addEventListener('click', (event) => {
  const img = event.target.closest('.viewable');
  if (img) {
    backgroundViewer(img.src);
  }
});

async function backgroundViewer(given) {
  await appFunction('Photos', 'open');

  const photoViewers = document.querySelectorAll('.photoViewer');
    requestAnimationFrame(() => {
    photoViewers.forEach(photoViewer => {
      const imageBackdrop = photoViewer.querySelector('.imageBackdrop');
      const imageDisplay = photoViewer.querySelector('.imageDisplay');

      if (imageBackdrop) {
        imageBackdrop.style.backgroundImage = 'url(' + given + ')';
      }
      if (imageDisplay) {
        imageDisplay.style.backgroundImage = 'url(' + given + ')';
      }
    });
  });
}

// =-=-=-= ( Selection Box ) =-=-=-= 

// Microsoft Copilot made this code, couldn't find anything on the internet
// _/----------------------------\_
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
// -\___________________________/-
// Back to my code

// =-=-=-= ( Popup System ) =-=-=-= 

/*Contains default blank values*/
var session_popup_count = 0;
function popup(source, title, input, type) {
  view = document.getElementById('popups'); 

  //console.log(source + title + input + type);
  
  var popup = document.createElement("div");
  popup.setAttribute("id", 'Popup' + session_popup_count);
  popup.setAttribute("class", 'popup');
  
  popup.innerHTML = (`
    <div class="appHeader" id="` + popup.id + `Header">
      <ul>
          <img src='spencos/media/icons/` + type + `.webp'>
          <span>` + title + `</span>
          <li class="typeClose" onclick="appFunction('Popup` + session_popup_count + `', 'close')">x</li>
      </ul>
    </div>
    <div class="appBody">
    ` + input + `
    </div>
  `);

  view.appendChild(popup);

  // Make popup window draggable
  dragElement(popup.id);

  // Allow window heirarchy changing
  popup.addEventListener('click', function() {
    windowToTop(popup.id);
  });

  // Move popup to top of desktop (broken)
  windowToTop(popup.id);

  // Increase iteration to avoid multi-window conflicts
  session_popup_count++;
}