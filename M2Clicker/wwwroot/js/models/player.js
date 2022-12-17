class Player extends Unit {
    constructor(newName, newPos, newId) {
        super(newName, newPos, newId);
        this.attackRange = 100;

        this.hp = 1000;
        this.maxHp = 1000;

        this.level = 1;
        this.exp = 999;
        this.levelNext = 1000;
    }

    speed = 100;

    //NEW HERE
    mp;
    maxMp;
    stamina;
    maxStamina;
    gold;
    levelNext;


    attack(){

        //if isnt in attack range go to target
        if (!isInRange(this, this.autoAttackTarget, this.attackRange)) this.goTo(this.autoAttackTarget.pos);
        //if in range and if there is no attackcd attack
        else {
            this.pos.walking = false;
            if (this.attackCD == this.attackSpeed / 2) this.hit(this.autoAttackTarget);
        }


        this.attackCD -= 1;
        this.dropAggro -= 1;

        if (this.attackCD <= 0) this.attackCD = this.attackSpeed / 2;
    }

    takeDmage(source) {
        addToUserLog(this.name + " oberwał, hp " + this.hp + "->" + (this.hp - source.attackDmage));


        //check if dead
        if (this.hp <= 0) {
            //TODO De-aggro all atacking mobs
            //disable all actions
        }
    }

    getExperience(expPoints) {
        this.exp += expPoints;
        //TODO check if level up
        if (this.exp >= this.levelNext) {
            this.level += 1;
            this.exp = this.exp - this.levelNext;
        }

    }

}