class Player extends Unit {
    constructor(newName, newPos, newId) {
        super(newName, newPos, newId);
        this.attackRange = 100;

        this.hp = 1000;
        this.maxHp = 1000;
    }

    speed = 100;

    //NEW HERE
    mp;
    maxMp;
    stamina;
    maxStamina;
    gold;
    levelNext;

}