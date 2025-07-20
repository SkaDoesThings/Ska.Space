// Change localstorage settings on page load
if (!localStorage.getItem('data-theme')) {
  localStorage.setItem("data-theme", "dark");
}

function changeThemeToggle() {
  let state = localStorage.getItem('data-theme');
  if (state == "dark")
    changeTheme('light')
  else{
    changeTheme('dark')
  }
}

function changeTheme(theme) {  
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("data-theme", theme);
  console.log("I give you " + theme);
}

const data = ['theme', 'setting-debug-outlines', 'setting-acc-reduced-motion', 'setting-style-movingbg']

data.forEach(setting => {
  let state = localStorage.getItem('data-' + setting);
  document.documentElement.setAttribute("data-" + setting, state);
});

function changeSetting(setting) {  
  let currentState = localStorage.getItem('data-' + setting);
  let newState;
  
  if (currentState == "true"){
    newState = "false";
  }
  else{
    newState = "true";
  }
  document.documentElement.setAttribute("data-" + setting, newState);
  localStorage.setItem("data-" + setting, newState);
  console.log("Set data-" + setting + " to " + newState);
}

//Global fadeout thanks to https://christopheraue.net/design/fading-pages-on-load-and-unload
var fader = document.getElementById('leavingPage');
fader.classList.add('fadeIn');

document.addEventListener('DOMContentLoaded', function() {
  if (!window.AnimationEvent) { return; }
  var anchors = document.getElementsByTagName('a');
    
  for (var idx=0; idx<anchors.length; idx+=1) {
    if (anchors[idx].hostname !== window.location.hostname ||
      anchors[idx].pathname === window.location.pathname) {
      continue;
  }
  anchors[idx].addEventListener('click', function(event) {
        anchor = event.currentTarget;
    
    var listener = function() {
        window.location = anchor.href;
        fader.removeEventListener('animationend', listener);
    };
    fader.addEventListener('animationend', listener);

    event.preventDefault();
    closeThatNav();

    fader.classList.remove('fadeIn');
    fader.classList.add('fadeOut');
    fader.style.zIndex = "2";
    
    clickPage()
  });
  }
});

window.addEventListener('pageshow', function (event) {
  if (!event.persisted) {
    return;
  }
  var fader = document.getElementById('leavingPage');
  fader.classList.remove('fadeOut');
  fader.style.zIndex = "-1";
  fader.style.opacity = "0"
  document.getElementById('pageLoader').style.display = "none";
});

//Image viewer thanks! https://stackoverflow.com/questions/67815853/how-do-i-make-an-image-full-screen-on-click
const imgs = document.querySelectorAll('.viewable');
const imageViewer = document.querySelector('#imageViewer');
const imageBackdrop = document.querySelector('#imageBackdrop');
const imageDisplay = document.querySelector('#imageDisplay');

imgs.forEach(img => {
  img.addEventListener('click', function() {
    imageDisplay.style.backgroundImage = 'url(' + img.src + ')';
    imageBackdrop.style.backgroundImage = 'url(' + img.src + ')';
    uiFunction('Viewer');
  });
});

function backgroundViewer(given){
    imageDisplay.style.backgroundImage = 'url(' + given + ')';
    imageBackdrop.style.backgroundImage = 'url(' + given + ')';
    uiFunction('Viewer');
}

//UI Toggles
var UIStateSpaces = false;
var UIStateDrawer = false;
var UIStateViewer = false;
var UIStateModal = false;

var modal = document.getElementById("modalViewer");
const modalContents = modal.querySelectorAll('.modal-content');

function uiFunction(name) {
  switch(name) {
    case "Spaces": {
      if(UIStateSpaces == false) {
        document.getElementById("myDropdown").style.display = "block";
        document.getElementById("myDropdown").style.pointerEvents = "none";
        document.getElementById("myDropdown").style.animation = "slideDownBelow 0.3s forwards";
        setTimeout(function(){document.getElementById("myDropdown").style.pointerEvents = "all";}, 100);
      }
      else {
        document.getElementById("myDropdown").style.animation = "slideUpAbove 0.2s forwards";
        setTimeout(function(){document.getElementById("myDropdown").style.display = "none";}, 200);
      }
      UIStateSpaces = !UIStateSpaces;
      break;
    }
    case "Drawer": {
      if (UIStateDrawer == false){
        document.getElementById("navbox").style.height = "351px";
        setTimeout(function(){document.getElementById("navbox").style.overflowY = "auto";}, 150);
        UIStateDrawer = true;
      }
      else if (UIStateDrawer == true){
          closeThatNav();
      }
      break;
    }
    case "Viewer": {
      if (UIStateViewer == false) {
        imageViewer.style.display = "block";
        imageViewer.style.animation = "appearOpacity 0.2s forwards";
        imageBackdrop.style.animation = "appearOpacity 0.6s forwards";
        imageDisplay.style.animation = "appearScale 0.3s forwards";
      }
      else{
        imageViewer.style.animation = "disappearOpacity 0.15s forwards";
        imageDisplay.style.animation = "disappearScale 0.3s forwards";
        setTimeout(function(){imageViewer.style.display = "none";}, 150);
      }
      UIStateViewer = !UIStateViewer;
      break;
    }
    case "Modal": {
      console.log("State " + UIStateModal)
      if(UIStateModal == false) {
        modal.style.display = "block";
        modal.style.animation = "appearOpacity 0.15s forwards";
      }
      else {
        // Ensure all inner-models are closed
        modalContents.forEach(content => {
          content.style.animation = "disappearScale 0.4s forwards";
          setTimeout(function(){content.style.display = "none";}, 150);
        });
      
        modal.style.animation = "disappearOpacity 0.15s forwards";
        setTimeout(function(){modal.style.display = "none";}, 150);
      }
      UIStateModal = !UIStateModal;
      break;
    }
  }
}

function uiFlexFunction(name, item) {
  switch(name) {
    case "Modal": {
        var modalContent = document.getElementById("modal" + item);

        // Open model backdrop if closed
        if(UIStateModal == false) {
          uiFunction('Modal');
        }
        // If model backdrop already open, close all other models. Makes for a seamless transition
        else{
          modalContents.forEach(content => {
            if(content != modalContent) {
                content.style.animation = "disappearScaleFull 0.4s forwards";
                setTimeout(function(){content.style.display = "none";}, 150);
              }
          });
        }

        // Display the selected model
        modalContent.style.display = "block";
        modalContent.style.animation = "appearScale 0.3s forwards";
      break;
    }
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
      uiFunction('Modal');
  }
}

function closeThatNav() {
  document.getElementById("navbox").style.height = "56px";
  document.getElementById("navbox").scrollTop = 0;
  // Patch to fix desktop nav cutoff issue
  if (window.matchMedia("(max-width: 800px)").matches){
    document.getElementById("navbox").style.overflowY = "hidden";
    console.log('test');
  }
  // Patch to fix double click issue when navigating back
  UIStateSpaces = false;
  UIStateDrawer = false;
}

function clickPage() {
  if(UIStateSpaces = 1){
    uiFunction('Spaces');
  }
}

function copyUrl() {
  let url = document.location.href;
  navigator.clipboard.writeText(url).then(function() {
      console.log('Copied!');
  }, function() {
      console.log('Copy error')
  })
}

function showHiddenItem(name) {
  document.getElementById("hiddenButton" + name).style.display = "none";
  document.getElementById("hiddenItem" + name).style.display = "block";
}

// Make all buttons bouncy
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 300); // Reset after animation
  });
});