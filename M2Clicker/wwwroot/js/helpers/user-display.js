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

        var target = spawnPoints[e.dataset.spawnid].getMob(e.dataset.groupid, e.dataset.mobid);

        e.childNodes[0].childNodes[1].childNodes[1].childNodes[0].replaceWith(document.createTextNode(target.hp + "/" + target.maxHp));

    });


}

//MOB LIST
function addToMobList(mob) {
    var ul = document.getElementById("mob-list");
    var li = document.createElement("li");
    li.setAttribute('id', "S" + mob.spawnPointID + "G" + mob.mobGroupID + "M" + mob.id);
    li.setAttribute('class', 'p-1');
    li.setAttribute('data-mobid', mob.id);
    li.setAttribute('data-groupid', mob.mobGroupID);
    li.setAttribute('data-spawnid', mob.spawnPointID);

    //div container
    var bigDiv = document.createElement('div');

    //div z nazwą potwora
    var nameDiv = document.createElement('div');
    nameDiv.setAttribute('class', 'col-md-12 text-center bg-info');
    nameDiv.appendChild(document.createTextNode(mob.name + " S" + mob.spawnPointID + "G" + mob.mobGroupID + "M" + mob.id));

    //Div z przyciskami
    var buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('class', 'col-md-12 text-center bg-dark p-2');

    //Przycisk
    var button = document.createElement('button');
    button.setAttribute('class', 'btn btn-secondary');
    button.setAttribute('type', 'button');
    button.setAttribute('onClick', 'attackMob(this)');
    button.setAttribute('data-mobID', mob.id);
    button.setAttribute('data-groupID', mob.mobGroupID);
    button.setAttribute('data-spawnID', mob.spawnPointID);
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
    var item = document.getElementById("S" + mob.spawnPointID + "G" + mob.mobGroupID + "M" + mob.id);
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

