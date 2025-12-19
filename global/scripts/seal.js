function openSealOptions() {
    document.getElementById("customizeList").style.display = "block";
    document.getElementById("buttonCustomize").style.display = "none";
    
    document.getElementById("customize").style.width = "180px";
    document.getElementById("customize").style.height = "190px";
}

function closeList() {
  document.getElementById("customizeList").style.display = "none";
  document.getElementById("buttonCustomize").style.display = "block";

  document.getElementById("customize").style.width = "120px";
  document.getElementById("customize").style.height = "40px";
}

//Thank you Copilot for helping

document.addEventListener("DOMContentLoaded", () => {
  const quickLinksDiv = document.getElementById("quickLinks");
  const linkNameInput = document.getElementById("link-name");
  const linkUrlInput = document.getElementById("link-url");
  const addLinkButton = document.getElementById("add-link");

  // Load quick links from local storage
  const loadLinks = () => {
      const links = JSON.parse(localStorage.getItem("quickLinks")) || [];
      quickLinksDiv.innerHTML = "";
      links.forEach((link, index) => {
          const linkElement = document.createElement("li");
          linkElement.innerHTML = `
              <button onclick="removeLink(${index})">x</button>
              <a href="${link.url}">${link.name}</a>
          `;
          quickLinksDiv.appendChild(linkElement);
      });
  };

  // Add a new link to the quick links
  addLinkButton.addEventListener("click", () => {
      const name = linkNameInput.value;
      const url = linkUrlInput.value;
      if (name && url) {
          const links = JSON.parse(localStorage.getItem("quickLinks")) || [];
          links.push({ name, url });
          localStorage.setItem("quickLinks", JSON.stringify(links));
          loadLinks();
          linkNameInput.value = "";
          linkUrlInput.value = "";
      }
  });

  // Remove a link from the quick links
  window.removeLink = (index) => {
      const links = JSON.parse(localStorage.getItem("quickLinks")) || [];
      links.splice(index, 1);
      localStorage.setItem("quickLinks", JSON.stringify(links));
      loadLinks();
  };

  // Initial load of links
  loadLinks();
});


function selectSearch(selection) {
  document.getElementById("searchGoogle").style.display = "none";
  document.getElementById("searchYouTube").style.display = "none";
  document.getElementById("searchBing").style.display = "none";
  document.getElementById("searchX").style.display = "none";
  document.getElementById("searchReddit").style.display = "none";

  document.getElementById("selectGoogle").style.opacity = "0.7";
  document.getElementById("selectYouTube").style.opacity = "0.7";
  document.getElementById("selectBing").style.opacity = "0.7";
  document.getElementById("selectX").style.opacity = "0.7";
  document.getElementById("selectReddit").style.opacity = "0.7";

  switch(selection) {
    case 'Google': {
      document.getElementById("searchGoogle").style.display = "block";
      document.getElementById("selectGoogle").style.opacity = "1";
      break;
    }
    case 'YouTube': {
      document.getElementById("searchYouTube").style.display = "block";
      document.getElementById("selectYouTube").style.opacity = "1";
      break;
    }
    case 'Bing': {
      document.getElementById("searchBing").style.display = "block";
      document.getElementById("selectBing").style.opacity = "1";
      break;
    }
    case 'Duck': {
      document.getElementById("searchDuck").style.display = "block";
      document.getElementById("selectDuck").style.opacity = "1";
      break;
    }
    case 'X': {
      document.getElementById("searchX").style.display = "block";
      document.getElementById("selectX").style.opacity = "1";
      break;
    }
    case 'Reddit': {
      document.getElementById("searchReddit").style.display = "block";
      document.getElementById("selectReddit").style.opacity = "1";
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


