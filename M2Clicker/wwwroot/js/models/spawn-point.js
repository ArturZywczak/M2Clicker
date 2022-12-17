class SpawnPoint {
    constructor(newX, newY, newId) {
        this.x = newX;
        this.y = newY;
        this.id = newId;
    }

    x;
    y;
    id;
    mobGroups = [];
    mobGroupSpawnRange = 100;

    addMobGroup() {
        this.mobGroups.push(new MobGroup(this));
    }

}