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
    var fader = document.getElementById('page'),
        anchor = event.currentTarget;
    
    var listener = function() {
        window.location = anchor.href;
        fader.removeEventListener('animationend', listener);
    };
    fader.addEventListener('animationend', listener);

    event.preventDefault();
    closeThatNav();
    document.body.style.animation = "backgroundLoader 1s infinite"
    fader.classList.add('fadeOut');
      });
    }
});

window.addEventListener('pageshow', function (event) {
  if (!event.persisted) {
    return;
  }
  var fader = document.getElementById('page');
  fader.classList.remove('fadeOut');
});


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

//Mobile navigation
function openNav() {
  document.getElementById("navbox").style.height = "401px";
  document.getElementById("linkContainer").style.height = "400px";

  document.getElementById("navbox").style.borderTopLeftRadius = "20px";
  document.getElementById("navbox").style.borderTopRightRadius = "20px";
  
  document.getElementById("openNav").style.display = "none";
  document.getElementById("closeNav").style.display = "block";
}

function closeNav() {
  document.getElementById("navbox").style.height = "60px";

  document.getElementById("navbox").style.borderTopLeftRadius = "0px";
  document.getElementById("navbox").style.borderTopRightRadius = "0px";

  document.getElementById("closeNav").style.display = "none";
  document.getElementById("openNav").style.display = "block";
}

function clickPage() {
  closeNav();
}

// When the user scrolls down 20px from the top of the document, slide down the navbar
function scrollFunction() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
      document.getElementById("buttonTop").style.marginRight = "15px";
      document.getElementById("navbox").classList.remove('transparency');

      document.getElementById("page").classList.add('backgroundScrollBlur');

      document.getElementById("lobbyBanner").style.opacity = "0";
      document.getElementById("lobbyBanner").style.transform = "scale(0) translateY(-1000px)";
  }
    else{
      closeThatNav();

      document.getElementById("navbox").classList.add('transparency');
      document.getElementById("lobbyBanner").style.opacity = "1";
      document.getElementById("lobbyBanner").style.transform = "scale(1) translateY(0px)";
  }
}

function closeThatNav() {
    document.getElementById("closeNav").style.dislay = "none";
    document.getElementById("openNav").style.dislay = "block";
    document.getElementById("navbox").style.borderTopLeftRadius = "0px";
    document.getElementById("navbox").style.borderTopRightRadius = "0px";
    document.getElementById("navbox").style.height = "60px";
    document.getElementById("buttonTop").style.marginRight = "-100px";



}

//Transitions

function pageTransitionOut() {
  closeThatNav();
  document.getElementById("page").style.animation = "pageMoveOut 0.3s ease 1 normal forwards";
  }

function spaceTransitionOut() {
  closeThatNav();
  document.getElementById("navbox").style.height = "50px";

  document.getElementById("page").style.animation = "spaceMoveOut 0.6s ease 1 normal forwards";
}


//To Top Button

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


//Drop Down Menu
function dropdownFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var b;
  for (b = 0; b < dropdowns.length; b++) {
      var openDropdown = dropdowns[b];
      if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
      }
    }
  }
}


//Modal Viewer

// Get the button that opens the modal
var btn = document.querySelectorAll("button.modal-button");

// All page modals
var modals = document.querySelectorAll('.modal');

// Get the <span> element that closes the modal
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



window.addEventListener("scroll", function () {
  var box = document.getElementById("box");
  var position = box.getBoundingClientRect();
  if (position.top < window.innerHeight && 
  position.bottom >= 0) {
      box.classList.add("bounce");
  } else {
      box.classList.remove("bounce");
  }
});

