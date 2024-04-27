function selectGame(selection) {
    document.getElementById("list").style.display = "none";
    document.getElementById("content").style.display = "block";
    document.getElementById("sidebarToggleLeaveGame").style.backgroundColor = "#25272D";
        
    let elems = document.querySelectorAll("#content article");
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.display = "none";
    }

    switch(selection){
        case 0: {
            document.getElementById('gameMinecraft').style.display = 'block';
            break;
        }  
        case 1: {
            document.getElementById('gameTerraria').style.display = 'block';
            break;
        }          
        case 2: {
            document.getElementById('gameBeatSaber').style.display = 'block';
            break;
        }    
        case 3: {
            document.getElementById('gameOSU').style.display = 'block';
            break;
        }    
        case 4: {
            document.getElementById('gameGeometryDash').style.display = 'block';
            break;
        }    
        case 5: {
            document.getElementById('gameGenshinImpact').style.display = 'block';
            break;
        }
        case 6: {
            document.getElementById('gameFortnite').style.display = 'block';
            break;
        }        
    }
}

function gameTransitionOut() {
    document.getElementById("list").style.display = "block";
    document.getElementById("content").style.display = "none";
    document.getElementById("sidebarToggleLeaveGame").style.backgroundColor = "#3E4047";
}