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

require("/js/helpers/canvas-display.js");
require("/js/helpers/other-helpers.js");
require("/js/helpers/mob-behavior.js");
require("/js/helpers/user-display.js");




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