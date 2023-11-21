function settingsTransition() {
    document.getElementById("menuContent").style.animation = "switchPage 1s normal forwards";
    document.getElementById("navHome").style.backgroundColor = "#bb3e00";
}

/*Select settings to show*/

function hideAll() {
    document.getElementById("settingHome").style.display = "none";
    document.getElementById("settingAccount").style.display = "none";
    document.getElementById("settingStyle").style.display = "none";
    document.getElementById("settingLogin").style.display = "none";
    document.getElementById("settingLogout").style.display = "none";

    document.getElementById("navHome").style.backgroundColor = "";
    document.getElementById("navStyle").style.backgroundColor = "";
    document.getElementById("navLogin").style.backgroundColor = "";
    document.getElementById("navLogout").style.backgroundColor = "";
    document.getElementById("navAccount").style.backgroundColor = "";
}

function clickHome() {
    document.getElementById("settingHome").style.display = "block";
    document.getElementById("navHome").style.backgroundColor = "#bb3e00";
}
function clickStyle() {
    document.getElementById("settingStyle").style.display = "block";
    document.getElementById("navStyle").style.backgroundColor = "#bb3e00";
}


function clickLogin() {
    document.getElementById("settingLogin").style.display = "block";
    document.getElementById("navLogin").style.backgroundColor = "#bb3e00";
}
function clickLogout() {
    document.getElementById("settingLogout").style.display = "block";
    document.getElementById("navLogout").style.backgroundColor = "#bb3e00";
}
function clickAccount() {
    document.getElementById("settingAccount").style.display = "block";
    document.getElementById("navAccount").style.backgroundColor = "#bb3e00";
}
