class SpawnPoint {


    x;
    y;
    id;
    mobGroups = [];
    mobGroupSpawnRange = 100;

    constructor(newX, newY, newId) {
        this.x = newX;
        this.y = newY;
        this.id = newId;
    }

    addMobGroup() {
        this.mobGroups.push(new MobGroup(this));
    }

    getMob(groupId, mobId) {
        var mobGroup = this.mobGroups.find(e => e.id == groupId);
        if (typeof mobGroup == undefined) return false;
        return typeof mobGroup.mobs.find(e => e.id == mobId) == undefined ? false : mobGroup.mobs.find(e => e.id == mobId);
    }
}