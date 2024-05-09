
function addcontent(){
var p = document.createElement('div');
var b=document.createElement('div');
p.id='part1';
b.id='part2';
p.innerHTML= "<strong>Talan Academy</strong> est une école de reconverion interne à <a href='https://talan.com'> Talan </a>, qui propose une formation professionnalisante basée sur une pédagogie innovante.";
document.body.appendChild(p);
b.innerHTML= "<p>Les cursus proposés :</p> <ul> <li>Java</li> <li>PHP</li> <li>Test et validation</li> </ul> ";
document.body.appendChild(b);


}