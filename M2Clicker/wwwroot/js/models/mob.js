class Mob extends Unit {

    /* INHERITED
     * 
     * id; name; 
     * hp; maxHp;
     * dmageMin; dmageMax; attackSpeed; attackRange;
     * def; moveSpeed;
     * pos;
     * level; exp;
     * st;iq;ht;dx;
     * attackCD; autoAttackTarget;
    */

    //NEW HERE

    goldMin;
    goldMax;

    dropItem;

    dropAggro = 500;

    spawnPointID;
    mobGroupID;
    uniqueID;

    constructor(newName, newPos, spawnPoint, mobGroup) {
        super(newName, newPos, mobGroup.mobs.length);
        this.spawnPointID = spawnPoint.id;
        this.mobGroupID = mobGroup.id;

        this.hp = 100;
        this.maxHp = 100;
        this.attackRange = 10;
        this.moveSpeed = 50;
        this.attackSpeed = 50 + Math.random(50);

        this.exp = 120;

        this.uniqueID = "S" + this.spawnPointID + "G" + this.mobGroupID + "M" + this.id;
    }

    /* INHERITED METHODS
     * goTo(target); run();
     * startAttack(target); hit();
    */

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
            this.goTo(new Position(100, 100)); //TODO go back to your mob group spawn range
            this.dropAggro = 500;
            addToUserLog(this.name + " pierdoli to i wraca");
        }
        if (this.attackCD <= 0) this.attackCD = this.attackSpeed / 2;
    }

    takeDmage(source) {
        addToUserLog(this.name + " oberwał, hp " + this.hp + "->" + (this.hp - source.dmageMin));

        //if one mob in group gets hit every other starts attacking
        if (this.autoAttackTarget == '') testGroupAttack(this.spawnPointID, this.mobGroupID, source);

        this.dropAggro = 500;

        //check if dead
        if (this.hp <= 0) {
            //TODO give xp to player
            source.getExperience(this.exp);
            //remove yourself from mob-list
            addToUserLog(this.name + " z id " + this.id + " zdechł.");
            killMob(this);

            return false;
        }

        return true;
    }
}