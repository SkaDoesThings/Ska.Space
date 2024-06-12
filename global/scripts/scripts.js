let theme = localStorage.getItem('data-theme');
const checkbox = document.getElementById("switchTheme");
const changeThemeToDark = () =>{
    document.documentElement.setAttribute("data-theme", "dark")
    localStorage.setItem("data-theme", "dark")
    console.log("I give you dark")
}

const changeThemeToLight = () =>{
    document.documentElement.setAttribute("data-theme", "light")
    localStorage.setItem("data-theme", 'light')
    console.log("I give you light")
}

if(theme === 'light'){
    changeThemeToLight()
}

checkbox.addEventListener('change', ()=> {
    let theme = localStorage.getItem('data-theme');
    if (theme ==='light'){
        changeThemeToDark()
    }else{
        changeThemeToLight()
    }
});

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
    var fader = document.getElementById('leavingPage'),
        anchor = event.currentTarget;
    
    var listener = function() {
        window.location = anchor.href;
        fader.removeEventListener('animationend', listener);
    };
    fader.addEventListener('animationend', listener);

    event.preventDefault();
    closeThatNav();
    fader.classList.add('fadeOut');
      });
    }
});

window.addEventListener('pageshow', function (event) {
  if (!event.persisted) {
    return;
  }
  var fader = document.getElementById('leavingPage');
  fader.classList.remove('fadeOut');
});

function closeMenu(selection) {
  switch(selection){
    case 0: {
      document.getElementById("leavingPage").style.visibility = "hidden";
      break;
    }
  }
}

document.querySelector("#page").addEventListener('click', (e, checkbox = document.querySelector('input'))=>{ 
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
    document.getElementById("linkContainer").style.height = "400px";
  
    document.getElementById("navbox").style.borderTopLeftRadius = "20px";
    document.getElementById("navbox").style.borderTopRightRadius = "20px";

    document.getElementById("page").style.opacity = "0.5";
  }
  else if (opened == true){
      closeThatNav();
  }
  opened = !opened;
}

function closeThatNav() {
  document.getElementById("navbox").style.height = "60px";

  document.getElementById("navbox").style.borderTopLeftRadius = "0px";
  document.getElementById("navbox").style.borderTopRightRadius = "0px";

  document.getElementById("page").style.opacity = "1";
}

// When the user scrolls down 20px from the top of the document, slide down the navbar
function scrollFunction() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
      document.getElementById("buttonTop").style.marginRight = "15px";
      document.getElementById("navbox").classList.remove('transparency');
  }
    else{
      document.getElementById("buttonTop").style.marginRight = "-100px";
      document.getElementById("navbox").classList.add('transparency');
  }
}

//To Top Button
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
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

//Modal Viewer
var btn = document.querySelectorAll("button.modal-button");
var btn = document.querySelectorAll("img.modal-button");

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

// Page Content Swaps
function inlinePageInfo(selection) {
  document.getElementById("inlineInfoMain").style.display = "none";
  document.getElementById("inlineInfoAbout").style.display = "none";
  document.getElementById("inlineInfoCloud").style.display = "none";

  switch(selection){
    case 0: {
      document.getElementById("inlineInfoMain").style.display = "block";
      break;
    }
    case 1: {
      document.getElementById("inlineInfoAbout").style.display = "block";
      break;
    }
    case 2: {
      document.getElementById("inlineInfoCloud").style.display = "block";
      break;
    }
  }
}