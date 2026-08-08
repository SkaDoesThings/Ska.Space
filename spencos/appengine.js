// =-=-=-= ( App Engine ) =-=-=-= 

var flipflop = 0;

function appFunction(name, type) {

  // Check if app is currently loaded, if it is proceed with regular functions
  if(document.getElementById(name)) {
    var appName = document.getElementById(name);
    var taskbarName = document.getElementById((name + "Icon"));
    switch(type){
      case "toggle":
        if(appName.classList.contains('opened')) {
          appName.classList.remove('opened');
          taskbarName.classList.remove('active');
          appName.style.animation = "minimize 0.4s ease 1 normal forwards";
          break;
        }
        else{
          appName.classList.add('opened');
          taskbarName.classList.add('active');
          appName.style.animation = "popup 0.4s ease 1 normal forwards";
          break;
        }
        
      case "close":
        appName.classList.remove('opened');
        taskbarName.classList.remove('active');
        taskbarName.style.display = "none";
        appName.style.animation = "popout 0.4s ease 1 normal forwards";
        var appMenu = document.getElementById("taskbar");
        appMenu.removeChild(taskbarName);
        // Fully remove the loaded app from the website
        setTimeout(function() {
            appName.innerHTML = "";
            appName.remove();
        }, 400);
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
          appName.style.height = "calc(100% - 48px)";
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
    // App window not loaded, call function to create and insert a new one
    else {
      openApp(name);
    }
  }

// Create a new app window according to the name given
function openApp(name) {
  var appName = name;
  var taskbarName = (name + "Icon");

  // Create a taskbar icon for the app
  if(document.getElementById(taskbarName) == null){
    var appMenu = document.getElementById("taskbar");
    var newLink = document.createElement("a");

    newLink.setAttribute("id", name + "Icon");
    newLink.setAttribute("class", "active");
    newLink.setAttribute("onclick", "appFunction('" + name + "', 'toggle')");
    newLink.innerHTML = ("<img src='spencos/media/apps/" + name + "Icon.webp'>" + appName);
    newLink.draggable = "true"; 
    appMenu.appendChild(newLink);
    
    document.getElementById(taskbarName).classList.add('active');
    document.getElementById(taskbarName).style.display = "inline-flex";
  }

  // Create a window for the app
  if (document.getElementById(name) == null) {
    var appView = document.getElementById("apps");
    var newApp = document.createElement("div");

    newApp.setAttribute("id", name);
    newApp.setAttribute("class", "app opened");
    newApp.draggable = "true"; 

    // Create window title bar for app
    newApp.innerHTML = (`
      <div class="appHeader" id="` + name + `Header">
          <ul>
              <img src='spencos/media/apps/` + name + `Icon.webp'>
              <span>` + appName + `</span>
              <li class="typeClose" onclick="appFunction('`+ name + `', 'close')">x</li>
              <li class="typeSize" onclick="appFunction('`+ name + `', 'maximize')">+</li>
              <li onclick="appFunction('`+ name + `', 'toggle')">-</li>
          </ul>
      </div>
    `);

    // Launch and display the app window
    appView.appendChild(newApp);
    newApp.style.display = "flex";
    newApp.style.animation = "popup 0.4s ease 1 normal forwards";

    // Allow window heirarchy changing
    newApp.addEventListener('click', function() {
      windowToTop(name);
    });

    // Force the window to appear on top
    windowToTop(name);

    // Make app window draggable
    dragElement(name);

    // Load the app content
    loadAppContent(name);
  }
  
}

// Load app content from external html file
async function loadAppContent(name) {
  var appElement = document.getElementById(name);
  var file_path = ("spencos/apps/" + name + ".html")

  if (file_path) {
    const response = await fetch(file_path);
    if (response.ok) {
      const content = await response.text();
      appElement.innerHTML += content;
    }
    else {
      appElement.innerHTML += "Error loading app content..";
    }
  }
  else {
    appElement.innerHTML += "Error finding app location..";
  }

  /* Remove loading indicator (if app includes one)
    const loadingElement = appElement.querySelector('.appLoading');
    if (loadingElement) {
    loadingElement.remove();
  }*/
}


// =-=-=-= ( Window Dragging ) =-=-=-= 

function windowToTop(source) {
  let apps = document.querySelectorAll('.app');
  let source_app = document.getElementById(source);

  // Move every app down the heirarchy
  apps.forEach(function(app) {
    if (app.style.zIndex = 10) {
      app.style.zIndex = 9;
    }      
  })
  
  // Move the app that called the function to the front
  source_app.style.zIndex = 10;
}

function dragElement(name) {
    var appElement = document.getElementById(name);
    var headerElement = document.getElementById(appElement.id + "Header");
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    console.log(headerElement);

    if (headerElement) {
        // if present, the header is where you move the DIV from:
        headerElement.onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        appElement.onmousedown = dragMouseDown;
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
        appElement.style.top = (appElement.offsetTop - pos2) + "px";
        appElement.style.left = (appElement.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


// =-=-=-= ( App UI Functionality ) =-=-=-= 

function pageView(appName, selection){
    selected = (appName + selection)

    // Obtain current buttons using id of app name and then the corresponding class
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
