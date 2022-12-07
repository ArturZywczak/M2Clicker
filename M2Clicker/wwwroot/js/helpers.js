function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCordsInRadius(x, y, r) {
    let ang = Math.random() * 2 * Math.PI,
        hyp = Math.sqrt(Math.random()) * r,
        adj = Math.cos(ang) * hyp,
        opp = Math.sin(ang) * hyp;

    return new Position(x + adj, y + opp);

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    
    x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    //x = Math.round(x); y = Math.round(y);

    return new Position(x,y);
}

function isInRange(obj1, obj2, range) {

    //Sprawdzenie czy 'a'' i 'b'' to Unit czy Pos i konwertowanie do wspólnego formatu
    var a = typeof obj1.x == "number" ? obj1 : obj1.pos;
    var b = typeof obj2.x == "number" ? obj2 : obj2.pos;

    if (((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)) < Math.pow(range,2) ) return true;
    else return false;
}

//Used for creating hovering tooltips
var tooltip = document.querySelectorAll('.interface-bar-tooltip');
document.addEventListener('mousemove', fn, false);
function fn(e) {
    for (var i = tooltip.length; i--;) {
        tooltip[i].style.left = e.pageX + 'px';
        tooltip[i].style.top = e.pageY + 'px';
    }
}

function addToMobList(mob) {
    var ul = document.getElementById("mob-list");
    var li = document.createElement("li");
    li.setAttribute('id', "Mob" + mob.id);
    li.setAttribute('class', 'p-1');

    //div container
    var bigDiv = document.createElement('div');

    //div z nazwą potwora
    var nameDiv = document.createElement('div');
    nameDiv.setAttribute('class', 'col-md-12 text-center bg-info');
    nameDiv.appendChild(document.createTextNode(mob.name + " z id " + mob.id));

    //Div z przyciskami
    var buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('class', 'col-md-12 text-center bg-dark p-2');

    //Przycisk
    var button = document.createElement('button');
    button.setAttribute('class', 'btn btn-secondary');
    button.setAttribute('type', 'button');
    button.setAttribute('onClick', 'attackMob(this)');
    button.setAttribute('data-mobID', mob.id);
    button.appendChild(document.createTextNode('Atakuj'));

    //DIV wypisane HP
    var hpDiv = document.createElement('div');
    hpDiv.appendChild(document.createTextNode(mob.hp + "/" + mob.maxHp));
    hpDiv.setAttribute('class', 'bg-info');

    //dodawanie
    buttonDiv.appendChild(button);
    buttonDiv.appendChild(hpDiv);

    bigDiv.appendChild(nameDiv);
    bigDiv.appendChild(buttonDiv);

    li.appendChild(bigDiv);

    ul.appendChild(li);
}

function removeFromMobList(mob) {
    var ul = document.getElementById("mob-list");
    var item = document.getElementById("Mob" + mob.id);
    ul.removeChild(item);
}
