class MobGroup {

    id;
    x;
    y;
    mobPosRadius = 50;
    mobs = [];

    constructor(spawnPoint) {

        this.id = spawnPoint.mobGroups.length;

        var tempPos = getRandomCordsInRadius(spawnPoint.x, spawnPoint.y, spawnPoint.mobGroupSpawnRange);
        this.x = tempPos.x; this.y = tempPos.y;

        //TEMP MOB SPAWN, wszystko wpisane na stałe
        for (var i = 0; i < 3; i++)
            this.mobs.push(new Mob("Dziki pies", getRandomCordsInRadius(this.x, this.y, this.mobPosRadius), spawnPoint, this));
    }

    groupAttack(target) {
        this.mobs.forEach(e => {
            if (!e.pos.inCombat) {
                e.startAttack(target);
            }
        });
    }
}
