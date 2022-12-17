//USER HUD

//Used for creating hovering tooltips
var tooltip = document.querySelectorAll('.interface-bar-tooltip');
document.addEventListener('mousemove', showTooltip, false);
function showTooltip(e) {
    for (var i = tooltip.length; i--;) {
        tooltip[i].style.left = e.pageX + 'px';
        tooltip[i].style.top = e.pageY + 'px';
    }
}

function updateEXPBar() {

    var expPercent;

    expPercent = ((player.exp / player.levelNext) * 100);
    document.getElementById("expValue").childNodes[0].replaceWith(document.createTextNode("Doświadczenie: " + expPercent + '%'));



    expBall = [0, 0, 0, 0];
    for (var i = 0; i < 4; i++) {

        if (expPercent <= 0) expBall[i] = 0;
        else {
            if (expPercent > 25) {
                expBall[i] = 100;
            }
            else {
                expBall[i] = (expPercent * 100) / 25;
            }
        }
        expPercent -= 25;
        expBall[i] = 100 - expBall[i];

        var tempExpCircleName = "expCircle" + (i + 1);
        document.getElementById(tempExpCircleName).style.background = "linear-gradient( black " + expBall[i] + "%, yellow 0%)";
        var test = 3;
    }

}

function updateHPBar() {

    var hpPercent;

    if (player.hp > 0) {
        hpPercent = ((player.hp / player.maxHp) * 100) + '%';
        document.getElementById("UIHpBar").style.width = hpPercent;
    }
    else {
        hpPercent = 0;
        document.getElementById("UIHpBar").style.display = "none";
    }

    document.getElementById("UIHpValue").childNodes[0].replaceWith(document.createTextNode(player.hp + "/" + player.maxHp));
}

function updateMobHpBar() {
    var ul = document.getElementById("mob-list");

    ul.childNodes.forEach(e => {
        var temp = e.id;
        temp = temp.substring(3);

        var mobID = temp % 10;
        var groupID = ((temp - mobID) / 10) % 10;
        var spawnPointID = (temp - mobID - groupID * 10) / 100;

        var target;

        target = spawnPoints.find(e => e.id == spawnPointID);
        target = target.mobGroups.find(f => f.groupId == groupID);
        target = target.mobs.find(g => g.id == temp); //FIX MOBID!!!!!!

        e.childNodes[0].childNodes[1].childNodes[1].childNodes[0].replaceWith(document.createTextNode(target.hp + "/" + target.maxHp));

    });


}

//MOB LIST
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

//USER LOG
function addToUserLog(newMsg) {
    var ul = document.getElementById("user-log");
    var currentdate = new Date();
    var datetime = "@ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds() + "."
        + currentdate.getMilliseconds() + " | ";
    ul.prepend(document.createTextNode(datetime + newMsg));
    ul.prepend(document.createElement('br'));
}

