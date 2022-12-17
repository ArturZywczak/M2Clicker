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
require("/js/helpers.js");




//DEBUG MODE
var debugMode = document.getElementById("debugMode").checked;
function changeDebugMode() {
    debugMode = document.getElementById("debugMode").checked;
}

//TEMP INIT, CREATE PLAYER, SPAWN POINTS, SELECTED MOB(LMB)
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

function onRightClick(e) {

    player.pos.inCombat = false;
    player.goTo(getMousePos(canvas, e));
    leftClickPos.x = -100;
    leftClickPos.y = -100;

}

function onLeftClick(e) {
    if (typeof clickedItem != 'undefined') {
        var ul = document.getElementById("mob-list");
        var isOnList = false;
        ul.childNodes.forEach(h => {
            if ((typeof h.id != 'undefined') && h.id == "Mob" + clickedItem.id) {
                isOnList = true;
                return false;
            }
        });

        if (isOnList) removeFromMobList(clickedItem);
    }
    var temp = getMousePos(canvas, e);
    leftClickPos.x = temp.x;
    leftClickPos.y = temp.y;

}

function drawAll() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    drawPlayer();
    drawMobs();
    drawLeftClick();

    setTimeout(mapAnim, 20);
}

function drawPlayer() {

    ctx.fillStyle = "blue";
    ctx.fillRect(player.pos.x - 2.5, player.pos.y - 2.5, 5, 5);

    if (debugMode) {
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(player.pos.x, player.pos.y, player.attackRange, 0, 2 * Math.PI);
        ctx.stroke();
    }
}


function drawMobs() {

    spawnPoints.forEach(e => {

        if (debugMode) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(e.x - 2.5, e.y - 2.5, 5, 5);
        }

        e.mobGroups.forEach(f => {

            if (debugMode) {
                ctx.fillStyle = "pink";
                ctx.strokeStyle = "pink";
                ctx.fillRect(f.x - 2.5, f.y - 2.5, 5, 5);
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.mobGroupSpawnRange, 0, 2 * Math.PI);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.arc(f.x, f.y, f.mobPosRadius, 0, 2 * Math.PI);
                ctx.stroke();
            }

            var ul = document.getElementById("mob-list");

            f.mobs.forEach(g => {
                var isNearPlayer = isInRange(player, g, player.attackRange);
                var isNearLeftClick;
                isNearLeftClick = leftClickPos.x == -100 ? false : isInRange(leftClickPos, g, 6);
                ctx.fillStyle = "red";

                var isOnList = false;
                ul.childNodes.forEach(h => {
                    if ((typeof h.id !== 'undefined') && h.id == "Mob" + g.id) {
                        isOnList = true;
                        ctx.fillStyle = "orange";
                    }
                });

                if (isNearPlayer) {
                    if (!isOnList) {
                        addToMobList(g);
                    }
                }
                else if (isNearLeftClick) {
                    addToMobList(g);
                    clickedItem = g;

                }
                else {

                    if (isOnList && g != clickedItem) {
                        removeFromMobList(g);
                    }
                }

                ctx.fillRect(g.pos.x - 2.5, g.pos.y - 2.5, 5, 5);

            });
        });
    });

    leftClickPos.x = -100; leftClickPos.y = -100;
}

function drawLeftClick() {

    if (debugMode) {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(leftClickPos.x - 2.5, leftClickPos.y - 2.5, 5, 5);
    }
}

function mapAnim() {

    updateHPBar();
    updateMobHpBar();
    if (player.pos.inCombat == true) player.attack();
    else if (player.pos.walking == true) player.run();


    //random mob movement
    spawnPoints.forEach(e => {

        e.mobGroups.forEach(f => {

            f.mobs.forEach(g => {
                if (g.pos.inCombat) g.attack();
                else if (g.pos.walking) g.run();

                if (!g.pos.walking && !g.pos.inCombat)
                    if (Math.random() > 0.995)
                        g.goTo(getRandomCordsInRadius(f.x, f.y, f.mobPosRadius));

            });
        });
    });

    drawAll();
}

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