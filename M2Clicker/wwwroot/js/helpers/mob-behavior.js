//PLAYER
function attackMob(buttonData) {
    var target = spawnPoints[buttonData.dataset.spawnid].mobGroups[buttonData.dataset.groupid].mobs[buttonData.dataset.mobid];
    player.startAttack(target);
}

//MOBS
function testGroupAttack(x, y, target) {
    spawnPoints[x].mobGroups[y].groupAttack(target);
}

function killMob(mob) {
    removeFromMobList(mob);
    spawnPoints[mob.spawnPointID].mobGroups[mob.mobGroupID].mobs.splice(mob.id, 1);

}

