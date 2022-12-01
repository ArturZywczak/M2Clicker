class MobGroup {
    constructor(spawnPointX, spawnPointY, spawnPointId, groupId) {
        this.groupId = groupId;

        var tempPos = getRandomCordsInRadius(spawnPointX, spawnPointY, 80);
        this.x = tempPos.x; this.y = tempPos.y;

        //TEMP MOB SPAWN, wszystko wpisane na stałe
        for (var i = 0; i < 3; i++)
            this.mobs.push(new Mob("Dziki pies", getRandomCordsInRadius(this.x, this.y, this.mobPosRadius), i + spawnPointId * 100 + this.groupId*10))
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

    addMobGroup(spawnPointId, groupId){
        this.mobGroups.push(new MobGroup(this.x, this.y, spawnPointId, groupId));
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

}

class Player extends Unit {
    constructor(newName, newPos, newId){
        super(newName, newPos, newId);
    }

    speed = 100;
    
}

class Mob extends Unit {
    constructor(newName,newPos, newId){
        super(newName, newPos, newId);
    }

    speed= 50;
}

class Position {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    x;
    y;

    walking = false;
    attacking = false;

    toX;
    toY;
    a;
    b;
    step;

    
}
