//PLAYER
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

//MOBS
function testGroupAttack(x, y, target) {
    spawnPoints[x].mobGroups[y].groupAttack(target);
}

function killMob(mob) {

    var mobID = this.id % 10;
    var groupID = ((this.id - mobID) / 10) % 10;
    var spawnPointID = (this.id - mobID - groupID * 10) / 100;


}

