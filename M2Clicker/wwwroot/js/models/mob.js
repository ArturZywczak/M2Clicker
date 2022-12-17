class Mob extends Unit {
    constructor(newName, newPos, newId) {
        super(newName, newPos, newId);

        this.hp = 100;
        this.maxHp = 100;
        this.attackRange = 5;

        this.attackSpeed = 50 + Math.random(50);
    }

    speed = 50;

    //NEW HERE
    dmageMin;
    dmageMax;
    goldMin;
    goldMax;
    def;
    moveSpeed;
    dropItem;

    dropAggro = 500;

    attack() {

        //if isnt in attack range go to target
        if (!isInRange(this, this.autoAttackTarget, this.attackRange)) this.goTo(this.autoAttackTarget.pos);
        //if in range and if there is no attackcd attack
        else {
            this.pos.walking = false;
            if (this.attackCD == this.attackSpeed / 2) this.hit(this.autoAttackTarget);
        }


        this.attackCD -= 1;
        this.dropAggro -= 1;

        //if target hasnt been atacked in a while stop attacking
        if (this.dropAggro <= 0) {
            this.pos.inCombat = false;
            this.autoAttackTarget = '';
            this.goTo(new Position(100, 100));
            this.dropAggro = 500;
            addToUserLog(this.name + " pierdoli to i wraca");
        }
        if (this.attackCD <= 0) this.attackCD = this.attackSpeed / 2;
    }

    takeDmage(source) {
        addToUserLog(this.name + " oberwał, hp " + this.hp + "->" + (this.hp - source.attackDmage));


        var mobID = this.id % 10;
        var groupID = ((this.id - mobID) / 10) % 10;
        var spawnPointID = (this.id - mobID - groupID * 10) / 100;

        //if one mob in group gets hit every other starts attacking
        if (this.autoAttackTarget == '') testGroupAttack(spawnPointID, groupID, source);
        this.dropAggro = 500;

        //check if dead
        if (this.hp <= 0) {
            //TODO give xp to player
            source.getExperience(this.exp);
            //remove yourself from mob-list
        }
    }
}