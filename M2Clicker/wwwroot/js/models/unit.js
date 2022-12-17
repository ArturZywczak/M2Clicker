class Unit {

    id;
    name;

    dmageMin;
    dmageMax;
    attackSpeed;
    attackRange;
    def;
    moveSpeed;

    pos;

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


    constructor(newName, newPos, newId) {
        //TODO, tymczasowo jakieś losowe wartości
        //HERE PARSER Z JSONA?        
        this.id = newId;
        this.name = newName;
        this.dmageMin = 5; //TODO, temp wszędzie bije tylko za min
        this.dmageMax = 7;
        this.attackSpeed = 100;

        this.pos = newPos;

        this.attackCD = this.attackSpeed / 2;

    }



    //METHODS
    goTo(newPos) { //set new target position

        this.pos.toX = newPos.x; this.pos.toY = newPos.y;
        this.pos.a = (this.pos.toY - this.pos.y) / (this.pos.toX - this.pos.x);
        this.pos.b = this.pos.toY - (this.pos.a * this.pos.toX);

        var distance = Math.pow(Math.pow(this.pos.x - this.pos.toX, 2) + Math.pow(this.pos.y - this.pos.toY, 2), 1 / 2);
        this.pos.step = Math.abs(this.pos.toX - this.pos.x) * (this.moveSpeed / 100) / Math.ceil(distance / 2); //PRĘDKOŚĆ PORUSZANIA, 10ms-1j, dlatego distance*10(aby uzyskać ms potrzebne do pokonania takiego dystansu) /20 (krok animacji jest co 20ms);

        this.pos.walking = true;
        this.run();

    }

    run() { //animation step toward new target

        if (Math.abs(this.pos.x - this.pos.toX + this.pos.y - this.pos.toY) > 1) {
            this.pos.x > this.pos.toX ? this.pos.x -= this.pos.step : this.pos.x += this.pos.step;
            this.pos.y = this.pos.a * this.pos.x + this.pos.b;
        }
        else this.pos.walking = false;

    }


    //COMBAT
    startAttack(target) {
        addToUserLog(this.name + " z id " + this.id + " chce wpierdolić " + target.name + " z id " + target.id);
        this.pos.inCombat = true;
        this.autoAttackTarget = target;
        this.attack();

    }

    hit(target) {
        

        addToUserLog(this.name + " uderzył " + target.name);
        target.hp -= this.dmageMin;
        if (!target.takeDmage(this)) { //if target died
            this.pos.inCombat = false;
            this.autoAttackTarget = '';
        }
    }

    
}
