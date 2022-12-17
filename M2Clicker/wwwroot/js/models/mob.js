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

}