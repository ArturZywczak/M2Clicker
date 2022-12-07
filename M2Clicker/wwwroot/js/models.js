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


}

class SpawnPoint {
    constructor(newX, newY, newId){
        this.x = newX;
        this.y = newY;
        this.id = newId;
    }

    x;
    y;
    id;
    mobGroups = [];
    mobGroupSpawnRange = 100;

    addMobGroup(){
        this.mobGroups.push(new MobGroup(this));
    }

}

class Unit {
    constructor(newName, newPos, newId){
        //TODO, tymczasowo jakieś losowe wartości
        //HERE PARSER Z JSONA?        
        this.id = newId;
        this.name = newName;
        this.hp = 100;
        this.attackDmage = 5;
        this.attackSpeed = 100;

        this.pos = newPos;

        this.attackCD = this.attackSpeed / 2;

    }

    id;
    name;
    hp;
    attackDmage;
    attackSpeed;
    attackRange;
    armor;
    speed;

    pos;

    //NEW HERE
    id;
    name;
    level;
    st;
    iq;
    ht;
    dx;
    exp;
    hp;
    maxHp = 1000;

    attackCD;
    autoAttackTarget = '';


    //METHODS
    goTo(newPos){

        this.pos.toX = newPos.x; this.pos.toY = newPos.y;
        this.pos.a = (this.pos.toY-this.pos.y)/(this.pos.toX-this.pos.x);
        this.pos.b = this.pos.toY-(this.pos.a*this.pos.toX);
        
        var distance = Math.pow(Math.pow(this.pos.x - this.pos.toX, 2) + Math.pow(this.pos.y - this.pos.toY, 2), 1 / 2); 
        this.pos.step = Math.abs(this.pos.toX-this.pos.x) * (this.speed/100) / Math.ceil(distance  / 2 ); //PRĘDKOŚĆ PORUSZANIA, 10ms-1j, dlatego distance*10(aby uzyskać ms potrzebne do pokonania takiego dystansu) /20 (krok animacji jest co 20ms);
    
        this.pos.walking = true;
        this.run();
        
    }

    run(){

        if (Math.abs(this.pos.x - this.pos.toX + this.pos.y - this.pos.toY) > 1 ) {
            this.pos.x > this.pos.toX ? this.pos.x -= this.pos.step : this.pos.x += this.pos.step;
            this.pos.y = this.pos.a*this.pos.x+this.pos.b;
        }
        else this.pos.walking = false;

    }


    //COMBAT
    startAttack(target) {
        this.pos.inCombat = true;
        this.autoAttackTarget = target;
        this.attack();
        
    }

    attack() {

        if (!isInRange(this, this.autoAttackTarget, this.attackRange)) this.goTo(this.autoAttackTarget.pos);
        else {
            this.pos.walking = false;
            //jak jak nie ma cd to uderz cel
            if (this.attackCD == this.attackSpeed / 2) this.hit(this.autoAttackTarget);
            //jak jest to nic nie rób
            else;
            //zmniejsz cd
        }

        this.attackCD -= 1;
        if (this.attackCD == 0) this.attackCD = this.attackSpeed / 2;
    }

    hit(target) {
        target.hp -= this.attackDmage;
    }
}

class Player extends Unit {
    constructor(newName, newPos, newId){
        super(newName, newPos, newId);
        this.attackRange = 5;

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

class Mob extends Unit {
    constructor(newName,newPos, newId){
        super(newName, newPos, newId);

        this.hp = 100;
        this.maxHp = 100;
    }

    speed = 50;

    //NEW HERE
    dmageMin;
    dmageMax;
    goldMin;
    goldMax;
    def;
    attackSpeed;
    moveSpeed;
    attackRange;
    dropItem;
}

class Position {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    x;
    y;

    walking = false;
    inCombat = false;

    toX;
    toY;
    a;
    b;
    step;

    
}
