function settingsTransition() {
    document.getElementById("navHome").style.backgroundColor = "#bb3e00";
}

/*Select settings to show*/
function settingPage(selection){
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

    switch(selection){
        case 0: {
            document.getElementById("settingHome").style.display = "block";
            document.getElementById("navHome").style.backgroundColor = "#bb3e00";
            break;
        }
        case 1: {
            document.getElementById("settingStyle").style.display = "block";
            document.getElementById("navStyle").style.backgroundColor = "#bb3e00";
            break;
        }
        case 2: {
            document.getElementById("settingLogin").style.display = "block";
            document.getElementById("navLogin").style.backgroundColor = "#bb3e00";
            break;
        }
        case 3: {
            document.getElementById("settingLogout").style.display = "block";
            document.getElementById("navLogout").style.backgroundColor = "#bb3e00";
            break;
        }
        case 4: {
            document.getElementById("settingAccount").style.display = "block";
            document.getElementById("navAccount").style.backgroundColor = "#bb3e00";
            break;
        }
    }
}