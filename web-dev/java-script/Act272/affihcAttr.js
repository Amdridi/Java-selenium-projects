object.onclick = fonction();
function fonction(){
const elem= document.getElementById("ta");


        alert(elem.getAttribute("href"));
        alert(elem.getAttribute("hreflang"));
        alert(elem.getAttribute("rel"));
        alert(elem.getAttribute("target"));
        alert(elem.getAttribute("type"));
     
}

