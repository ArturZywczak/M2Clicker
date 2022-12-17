function require(script) {
    $.ajax({
        url: script,
        dataType: "script",
        async: false,           // <-- This is the key
        success: function () {
            // all good...
        },
        error: function () {
            throw new Error("Could not load script " + script);
        }
    });
}

require("/js/models/position.js");
require("/js/models/unit.js");
require("/js/models/player.js");
require("/js/models/mob.js");
require("/js/models/mob-group.js");
require("/js/models/spawn-point.js");

require("/js/canvas-display.js");
require("/js/helpers.js");




//DEBUG MODE
var debugMode = document.getElementById("debugMode").checked;
function changeDebugMode() {
    debugMode = document.getElementById("debugMode").checked;
}

//INIT, CREATE PLAYER, SPAWN POINTS, SELECTED MOB(LMB)
const player = new Player("Gracz", new Position(200, 250), 0);
const spawnPoints = [new SpawnPoint(100, 100, 0),
new SpawnPoint(300, 100, 1),
new SpawnPoint(100, 300, 2),
new SpawnPoint(300, 300, 3)
];
spawnPoints.forEach(e => {
    for (var i = 0; i < 3; i++) e.addMobGroup();
});
const leftClickPos = new Position(-1, -1);
var clickedItem;

//CANVAS 
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("contextmenu", onRightClick);
canvas.addEventListener("click", onLeftClick);



drawAll();

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

function attackMob(buttonData) {

    var mobID = buttonData.dataset.mobid % 10;
    var groupID = ((buttonData.dataset.mobid - mobID) / 10) % 10;
    var spawnPointID = (buttonData.dataset.mobid - mobID - groupID * 10) / 100;

    var target;

    target = spawnPoints.find(e => e.id == spawnPointID);
    target = target.mobGroups.find(f => f.groupId == groupID);
    target = target.mobs.find(g => g.id == buttonData.dataset.mobid); //FIX MOBID!!!!!!

    player.startAttack(target);
}

function testGroupAttack(x, y, target) {
    spawnPoints[x].mobGroups[y].groupAttack(target);
}

function updateEXPBar() {

    var expPercent;

    expPercent = ((player.exp / player.levelNext) * 100);
    document.getElementById("expValue").childNodes[0].replaceWith(document.createTextNode("Doświadczenie: "+ expPercent + '%'));



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

        var tempExpCircleName = "expCircle" + (i+1);
        document.getElementById(tempExpCircleName).style.background = "linear-gradient( black " + expBall[i] + "%, yellow 0%)";
        var test = 3;
    }

}