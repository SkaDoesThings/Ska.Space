function gameTransitionIn() {
    document.getElementById("list").style.display = "none";
    document.getElementById("content").style.display = "block";

    document.getElementById("sidebarToggleLeaveGame").style.backgroundColor = "#25272D";
}
function gameTransitionOut() {
    document.getElementById("list").style.display = "block";
    document.getElementById("content").style.display = "none";

    document.getElementById("sidebarToggleLeaveGame").style.backgroundColor = "#3E4047";


    document.getElementById("gameMinecraft").style.display = "none";
    document.getElementById("gameTerraria").style.display = "none";
    document.getElementById("gameBeatSaber").style.display = "none";
    document.getElementById("gameOSU").style.display = "none";
    document.getElementById("gameGeometryDash").style.display = "none";
}


function selectGameMinecraft() {
    document.getElementById("content").style.opacity = "1";
}