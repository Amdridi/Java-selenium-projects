
var i = 0;
const element = document.getElementById("text");
element.innerHTML="<center p style='color:black';>JOUR</p>";
element.style.fontSize="15rem";

function change() {

    element.innerHTML="<center p style='color:black';>JOUR</p>";
    var color = ["black", "white"];

    if (color[i]=="black") {
        element.innerHTML="<center p style='color:white' >NUIT</p>";
    }

    document.body.style.backgroundColor = color[i];
    i++
    
    if(i > color.length - 1) {
        i = 0;
    }
}
setInterval(change, 5000);
