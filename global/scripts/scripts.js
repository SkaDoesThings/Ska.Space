let currentTheme = localStorage.getItem('data-theme');
if (currentTheme) {
  changeTheme(currentTheme);
} else {
  changeTheme('dark');
}

function changeTheme(theme) {  
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("data-theme", theme);
  console.log("I give you " + theme);
}

var fader = document.getElementById('leavingPage');
fader.classList.add('fadeIn');
//Global fadeout thanks to https://christopheraue.net/design/fading-pages-on-load-and-unload
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
    
    if(UIStateSpaces = 1){
      uiFunction('Spaces');
    }
    if(UIStateTheme = 1){
      uiFunction('Theme');
    }  
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


document.querySelector("main").addEventListener('click', (e, checkbox = document.querySelector('input'))=>{ 
  if(checkbox.checked) { checkbox.checked = false; e.stopPropagation(); }
});

//Image viewer thanks! https://stackoverflow.com/questions/67815853/how-do-i-make-an-image-full-screen-on-click

function getPics() {} //just for this demo
const imgs = document.querySelectorAll('.viewable');
const fullPage = document.querySelector('#imageViewer');
const backDrop = document.querySelector('#imageBackdrop');
const chosenImage = document.querySelector('#imageDisplay');

imgs.forEach(img => {
  img.addEventListener('click', function() {
    chosenImage.style.backgroundImage = 'url(' + img.src + ')';
    backDrop.style.backgroundImage = 'url(' + img.src + ')';
    fullPage.style.display = 'block';
  });
});

function backgroundViewer(given){
    chosenImage.style.backgroundImage = 'url(' + given + ')';
    backDrop.style.backgroundImage = 'url(' + given + ')';
    fullPage.style.display = 'block';
}

var opened = false;
//Mobile navigation
function openNav() {
  if (opened == false){
    document.getElementById("navbox").style.height = "401px";
  
    document.getElementById("navbox").style.borderTopLeftRadius = "20px";
    document.getElementById("navbox").style.borderTopRightRadius = "20px";
  }
  else if (opened == true){
      closeThatNav();
  }
  opened = !opened;
}

function closeThatNav() {
  document.getElementById("navbox").style.height = "56px";

  document.getElementById("navbox").style.borderTopLeftRadius = "0px";
  document.getElementById("navbox").style.borderTopRightRadius = "0px";
}

// When the user scrolls down 20px from the top of the document, slide down the navbar
function scrollFunction() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
      document.getElementById("buttonTop").style.marginRight = "15px";
  }
    else{
      document.getElementById("buttonTop").style.marginRight = "-100px";
  }
}

//Drop Down Menu
var dropdown = false;
function dropdownFunction() {
  if (dropdown == false) {
    document.getElementById("myDropdown").style.display = "block";
  }
  else if (dropdown == true){
    document.getElementById("myDropdown").style.display = "none";
  }
  dropdown = !dropdown;
}

//UI Toggles
var UIStateSpaces = false;
var UIStateTheme = false;
function uiFunction(name) {
  switch(name) {
    case "Spaces": {
      if(UIStateSpaces == false) {
        document.getElementById("myDropdown").style.animation = "slideDownBelow 0.15s forwards";
        document.getElementById("myDropdown").style.display = "block";
      }
      else {
        document.getElementById("myDropdown").style.animation = "slideUpAbove 0.15s forwards";
        setTimeout(function(){document.getElementById("myDropdown").style.display = "none";}, 200);
      }
      UIStateSpaces = !UIStateSpaces;
      break;
    }
    case "Theme": {
      if(UIStateTheme == false) {
        document.getElementById("themeMenu").style.animation = "slideDownBelow 0.15s forwards";
        document.getElementById("themeMenu").style.display = "block";
      }
      else {
        document.getElementById("themeMenu").style.animation = "slideUpAbove 0.15s forwards";
        setTimeout(function(){document.getElementById("themeMenu").style.display = "none";}, 200);
      }
      UIStateTheme = !UIStateTheme;
      break;
    }
  }
}

//Modal Viewer
var btn = document.querySelectorAll("button.modal-button");
var imgbtn = document.querySelectorAll("img.modal-button");
var modals = document.querySelectorAll('.modal');
var spans = document.getElementsByClassName("close");

// When the user clicks the button, open the modal
for (var i = 0; i < btn.length; i++) {
 btn[i].onclick = function(e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = "block";
 }
}


// When the user clicks img button, open the modal
for (var i = 0; i < imgbtn.length; i++) {
  imgbtn[i].onclick = function(e) {
     e.preventDefault();
     modal = document.querySelector(e.target.getAttribute("href"));
     modal.style.display = "block";

  }
 }

// When the user clicks on <span> (x), close the modal
for (var i = 0; i < spans.length; i++) {
 spans[i].onclick = function() {
    for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
    }
 }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
     for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none"; 
     }
    }
}

function copyUrl() {
  let url = document.location.href

  navigator.clipboard.writeText(url).then(function() {
      console.log('Copied!');
  }, function() {
      console.log('Copy error')
  })
}

function showHiddenItem() {
  document.getElementById("showHiddenItem").style.display = "none";
  document.getElementById("startHidden").style.display = "block";
}