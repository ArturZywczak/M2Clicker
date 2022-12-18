function drawAll() { 
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    drawPlayer();
    drawMobs();

    setTimeout(mapAnim, 20); //do mapAnim every 20ms
}

function drawPlayer() {

    ctx.fillStyle = "blue";
    ctx.fillRect(player.pos.x - 2.5, player.pos.y - 2.5, 5, 5);

    if (debugMode) { //Draw attack range on debug
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(player.pos.x, player.pos.y, player.attackRange, 0, 2 * Math.PI); 
        ctx.stroke();
    }
}

function drawMobs() {

    spawnPoints.forEach(e => {

        if (debugMode) { //Draw spawnPoints on debug
            ctx.fillStyle = "yellow";
            ctx.fillRect(e.x - 2.5, e.y - 2.5, 5, 5);
        }

        e.mobGroups.forEach(f => {

            if (debugMode) { //Draw mobGroup center, and 'wandering' range
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
                if (leftClickPos.x == null) {
                    if (typeof clickedItem != 'undefined' && clickedItem.uniqueID == g.uniqueID) {
                        isNearLeftClick = true;
                    }
                    else {
                        isNearLeftClick = false;
                    }
                }
                else {
                    isNearLeftClick = isInRange(leftClickPos, g, 6);
                }
                ctx.fillStyle = "red";

                var isOnList = false;
                ul.childNodes.forEach(h => {
                    if (h.id == (g.uniqueID)) {
                        isOnList = true;

                    }
                });

                if (isNearPlayer && !isOnList) {
                        addToMobList(g);
                        isOnList = true;
                }
                if (isNearLeftClick && !isOnList) {
                    addToMobList(g);
                    clickedItem = g;
                    leftClickPos.x = null; leftClickPos.y = null;
                    isOnList = true;
                }

                if (isOnList) {
                    ctx.fillStyle = "orange";
                    if (!isNearLeftClick && !isNearPlayer) removeFromMobList(g);
                }

                ctx.fillRect(g.pos.x - 2.5, g.pos.y - 2.5, 5, 5);

            });
        });
    });

    leftClickPos.x = null; leftClickPos.y = null;
}

function mapAnim() { //stuff that happens every frame, only calculating stuff no drawing


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

    updateHPBar();
    updateMobHpBar();
    updateEXPBar();

    drawAll();
}

//CANVAS EVENTS
function onRightClick(e) {

    player.pos.inCombat = false;
    player.goTo(getMousePos(canvas, e));
    leftClickPos.x = null;
    leftClickPos.y = null;

}

function onLeftClick(e) {
    if (typeof clickedItem != 'undefined') {
        var ul = document.getElementById("mob-list");
        var isOnList = false;
        ul.childNodes.forEach(h => {
            if (h.id == ("S" + clickedItem.spawnPointID + "G" + clickedItem.mobGroupID + "M" + clickedItem.id)) {
                isOnList = true;
            }
        });

        if (isOnList) removeFromMobList(clickedItem);
        clickedItem  = undefined;
    }

    

    var temp = getMousePos(canvas, e);
    leftClickPos.x = temp.x;
    leftClickPos.y = temp.y;

}