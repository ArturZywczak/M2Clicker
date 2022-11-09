class MobGroup {



}

class SpawnPoint {


}

class Unit {
    constructor(newName, newPos){
        //TODO, tymczasowo jakieś losowe wartości
        //HERE PARSER Z JSONA?        
        this.id = 1;
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
    


}

class Player extends Unit {
    constructor(newName, newPos){
        super(newName, newPos);
    }


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

    goto(newPos){

        this.toX = newPos.x; this.toY = newPos.y;
        this.a = (this.toY-this.y)/(this.toX-this.x);
        this.b = this.toY-(this.a*this.toX);
        
        var distance = Math.pow(Math.pow(this.x - this.toX, 2) + Math.pow(this.y - this.toY, 2), 1 / 2); 
        this.step = Math.abs(this.toX-this.x) / Math.ceil(distance / 2); //PRĘDKOŚĆ PORUSZANIA, 10ms-1j, dlatego distance*10(aby uzyskać ms potrzebne do pokonania takiego dystansu) /20 (krok animacji jest co 20ms);
    
        this.walking = true;
        this.run();
        
    }

    run(){

        if (Math.abs(this.x - this.toX) > 1 ) {
            this.x > this.toX ? this.x -= this.step : this.x += this.step;
            //if (player.y != y) player.y = a*player.x+b;
            this.y = this.a*this.x+this.b;
        }
        else this.walking = false;

    }
}
