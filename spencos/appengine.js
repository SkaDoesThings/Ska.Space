// =-=-=-= ( App Engine ) =-=-=-= 

var flipflop = 0;

function appFunction(name, action) {

  // Check if app is currently loaded, if it is proceed with regular functions
  if(document.getElementById(name)) {

    var appElement = document.getElementById(name);
    var taskbarElement = document.getElementById((name + "Icon"));

    switch(action){
      case "toggle":
        if(appElement.classList.contains('opened')) {
          appElement.classList.remove('opened');
          taskbarElement.classList.remove('active');
          appElement.style.animation = "minimize 0.4s ease 1 normal forwards";
          break;
        }
        else{
          appElement.classList.add('opened');
          taskbarElement.classList.add('active');
          appElement.style.animation = "popup 0.4s ease 1 normal forwards";
          // Bring app to top view of desktop
          windowToTop(name);
          break;
        }
        
      case "close":
        // Begin with app closing animation
        appElement.classList.remove('opened');
        appElement.style.animation = "popout 0.4s ease 1 normal forwards";

        // Remove from taskbar if it exists (prevents error for closing popups)
        if (taskbarElement) {
          taskbarElement.classList.remove('active');
          taskbarElement.style.display = "none";
          var appMenu = document.getElementById("taskbar");
          appMenu.removeChild(taskbarElement);
        }

        // Fully remove the loaded app from the website
        setTimeout(function() {
            var appView = document.getElementById("apps");
            appElement.innerHTML = "";
            apps.removeChild(appElement);
        }, 400);

        break;

      case "maximize":
        if(appElement.classList.contains('resized')){
          appElement.classList.remove('resized')
          appElement.style.width = "50%";
          appElement.style.height = "50%";
          appElement.style.top = "calc(25%)";
          appElement.style.left = "calc(25%)";
          appElement.style.borderRadius = "10px";
          flipflop = 0;
          break;
        }
        else {
          appElement.classList.add('resized')
          appElement.style.width = "100%";
          appElement.style.height = "calc(100% - 48px)";
          appElement.style.top = "calc(0%)";
          appElement.style.left = "calc(0%)";
          appElement.style.borderRadius = "0px";
          flipflop = 1;
          break;
        }
      case "open":
        if(!appElement.classList.contains('opened')) {
          openApp(name)
        }
        else{
          windowToTop(appElement);
        }
        break;
      }
    }
    // App window not loaded, call function to create and insert a new one
    else {
      openApp(name);
    }

    // Return the final reference I suppose
    return appFunction;
  }

// Create a new app window according to the name given

var session_window_count = 0;

function openApp(request) {
  // Find name of app in app directory
  var app = app_list.find(app => app.id === request);

  // Create a window name so that each window is distinct (allows for duplicate apps)
  var window_id = ("App" + session_window_count); 
  session_window_count++;

  if (!app) {
    popup("system", "Error", "<span>App not found</span>", "error");
    console.error("App not found: ", request);
    return;
  }

  var taskbarName = (window_id + "Icon");

  // Create a taskbar icon for the app
  if(document.getElementById(taskbarName) == null){
    var appMenu = document.getElementById("taskbar");
    var newLink = document.createElement("a");

    newLink.setAttribute("id", window_id + "Icon");
    newLink.setAttribute("class", "active");
    newLink.setAttribute("onclick", "appFunction('" + window_id + "', 'toggle')");
    newLink.innerHTML = ("<img src='spencos/media/apps/" + app.name + "Icon.webp'>" + app.name);
    newLink.draggable = "true"; 
    appMenu.appendChild(newLink);
    
    document.getElementById(taskbarName).classList.add('active');
    document.getElementById(taskbarName).style.display = "inline-flex";
  }

  // Create a window for the app
  if (document.getElementById(window_id) == null) {
    var appView = document.getElementById("apps");
    var newApp = document.createElement("article");

    newApp.setAttribute("id", window_id);

    // Add classes to window, including specific app style and checking whether any exist in the document
    if (app.class) {
      newApp.setAttribute("class", "app-" + app.name + " " + app.class + " app opened");
    }
    else {
      newApp.setAttribute("class", "app-" + app.name + " app opened");
    }
    newApp.draggable = "true"; 

    // Create window title bar for app
    newApp.innerHTML = (`
      <div class="appHeader" id="` + window_id + `Header">
          <ul>
              <img src='` + app.icon + `'>
              <span>` + app.name + `</span>
              <li class="typeClose" onclick="appFunction('`+ window_id + `', 'close')">x</li>
              <li class="typeSize" onclick="appFunction('`+ window_id + `', 'maximize')">+</li>
              <li onclick="appFunction('`+ window_id + `', 'toggle')">-</li>
          </ul>
      </div>
    `);

    // Launch and display the app window
    appView.appendChild(newApp);
    newApp.style.display = "flex";
    newApp.style.animation = "popup 0.4s ease 1 normal forwards";

    // Allow window heirarchy changing
    newApp.addEventListener('click', function() {
      windowToTop(window_id);
    });

    // Force the window to appear on top
    windowToTop(window_id);

    // Make app window draggable
    dragElement(window_id);

    // Attach app components to the app instance
    newApp.addEventListener('click', function(event) {
      const div_id = event.currentTarget.id;
    });

    // Enable detection of window size to display mobile UI
    observer.observe(newApp);

    // Load the app content
    loadAppContent(window_id, app.name);
  }
}

// Load app content from external html file
async function loadAppContent(window_id, app_name) {
  var appElement = document.getElementById(window_id);
  var file_path = ("spencos/apps/" + app_name + ".html")

  if (file_path) {
    const response = await fetch(file_path);
    if (response.ok) {
      const content = await response.text();
      appElement.innerHTML += content;
    }
    else {
      appElement.innerHTML += "<h1>Error loading app content..</h1>";
    }
  }
  else {
    appElement.innerHTML += "<h1>Error finding app location..</h1>";
  }

  // Make app window draggable again to fix broken dragging after content is loaded
  dragElement(window_id);

  /* Remove loading indicator (if app includes one)
    const loadingElement = appElement.querySelector('.appLoading');
    if (loadingElement) {
    loadingElement.remove();
  }*/
}


// =-=-=-= ( Window Dragging ) =-=-=-= 

function windowToTop(source) {
  let apps = document.querySelectorAll('.app');
  let sourceApp = document.getElementById(source);

  // Move every app and popup down the heirarchy
  if (apps) {  
    apps.forEach(function(app) {
      if (app.style.zIndex = 10) {
        app.style.zIndex = 9;
      }      
    })
  }
  
  // Move the app that called the function to the front
  sourceApp.style.zIndex = 10;
}

function dragElement(name) {
    var appElement = document.getElementById(name);
    console.log(appElement);
    var headerElement = document.getElementById(name + "Header");
    console.log(headerElement);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
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

// Allows app UI to change between desktop / mobile when window resizes 
const observer = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const element = entry.target;
    const width = entry.contentRect.width;

    if (width < 500 && !element.classList.contains("mobile")) {
      element.classList.add('mobile')
    } else if (width > 500 && element.classList.contains("mobile")) {
      element.classList.remove('mobile')
    }
  }
});

// Consistent system to switch between views within an app
function pageView(element, selection){
  try {
    var appElement = element.closest("article");

    console.log(appElement);
    console.log(selection);

    // Obtain current buttons using id of app name and then the corresponding class
    const buttonList = appElement.querySelector('.menuButtons');
    console.log(buttonList);
    const buttons = buttonList.querySelectorAll('button');

    buttons.forEach(button => {
        button.style.backgroundColor = "transparent";
    });

    const pagesList = appElement.querySelector('.pageView');
    console.log(pagesList);
    const pages = pagesList.querySelectorAll('.page');
    
    pages.forEach(page => {
        page.style.display = "none";
    });

    appElement.querySelector('.' + selection).style.display = "block";
    appElement.querySelector('.' + selection + 'Button').style.backgroundColor = "var(--element-hover)";
  }
  catch (e) {    
    popup("system", "Error", "<p>" + e + "</p><p>Tried " + selection + " on " + element + "</p>", "error");
    return;
  }
}
