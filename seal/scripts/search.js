function openSealOptions() {
    document.getElementById("customizeList").style.display = "block";
    document.getElementById("buttonCustomize").style.display = "none";
    
    document.getElementById("customize").style.width = "180px";
    document.getElementById("customize").style.height = "200px";
}

function closeList() {
  document.getElementById("customizeList").style.display = "none";
  document.getElementById("buttonCustomize").style.display = "block";

  document.getElementById("customize").style.width = "120px";
  document.getElementById("customize").style.height = "40px";
}

function resetSearch() {

}

function selectSearch(selection) {
  document.getElementById("searchGoogle").style.display = "none";
  document.getElementById("searchYouTube").style.display = "none";
  document.getElementById("searchBing").style.display = "none";
  document.getElementById("searchDuck").style.display = "none";
  document.getElementById("selectGoogle").style.opacity = "0.7";
  document.getElementById("selectYouTube").style.opacity = "0.7";
  document.getElementById("selectBing").style.opacity = "0.7";
  document.getElementById("selectDuck").style.opacity = "0.7";

  switch(selection) {
    case 0: {
      document.getElementById("searchGoogle").style.display = "block";
      document.getElementById("selectGoogle").style.opacity = "1";
      break;
    }
    case 1: {
      document.getElementById("searchYouTube").style.display = "block";
      document.getElementById("selectYouTube").style.opacity = "1";
      break;
    }
    case 2: {
      document.getElementById("searchBing").style.display = "block";
      document.getElementById("selectBing").style.opacity = "1";
      break;
    }
    case 3: {
      document.getElementById("searchDuck").style.display = "block";
      document.getElementById("selectDuck").style.opacity = "1";
      break;
    }
  }
}

$(switchBackground);
var oFReader = new FileReader(),
    rFilter = /^(?:image\/bmp|image\/webp|image\/|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

oFReader.onload = function(oFREvent) {
    localStorage.setItem('b', oFREvent.target.result);
    switchBackground();
};

function switchBackground() {
  var backgroundImage = localStorage.getItem('b');
  if (backgroundImage) {
    $('body').css('background-image', 'url(' + backgroundImage + ')');    
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
    localStorage.removeItem('b')
    window.location.reload()
}