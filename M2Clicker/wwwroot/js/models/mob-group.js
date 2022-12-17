class MobGroup {
    constructor(spawnPoint) {
        this.groupId = spawnPoint.mobGroups.length;

        var tempPos = getRandomCordsInRadius(spawnPoint.x, spawnPoint.y, spawnPoint.mobGroupSpawnRange);
        this.x = tempPos.x; this.y = tempPos.y;

        //TEMP MOB SPAWN, wszystko wpisane na stałe
        for (var i = 0; i < 3; i++)
            this.mobs.push(new Mob("Dziki pies", getRandomCordsInRadius(this.x, this.y, this.mobPosRadius), i + spawnPoint.id * 100 + this.groupId * 10))
    }

    groupId;
    x;
    y;
    mobPosRadius = 50;
    mobs = [];

    groupAttack(target) {
        this.mobs.forEach(e => {
            e.startAttack(target);
        })
    }
}
