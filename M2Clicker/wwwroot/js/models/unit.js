class Unit {
    constructor(newName, newPos, newId) {
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
    dropAggro = 500;

    //METHODS
    goTo(newPos) {


        this.pos.toX = newPos.x; this.pos.toY = newPos.y;
        this.pos.a = (this.pos.toY - this.pos.y) / (this.pos.toX - this.pos.x);
        this.pos.b = this.pos.toY - (this.pos.a * this.pos.toX);

        var distance = Math.pow(Math.pow(this.pos.x - this.pos.toX, 2) + Math.pow(this.pos.y - this.pos.toY, 2), 1 / 2);
        this.pos.step = Math.abs(this.pos.toX - this.pos.x) * (this.speed / 100) / Math.ceil(distance / 2); //PRĘDKOŚĆ PORUSZANIA, 10ms-1j, dlatego distance*10(aby uzyskać ms potrzebne do pokonania takiego dystansu) /20 (krok animacji jest co 20ms);

        this.pos.walking = true;
        this.run();

    }

    run() {

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
        this.dropAggro -= 1;
        if (this.dropAggro <= 0) {
            this.pos.inCombat = false;
            this.autoAttackTarget = '';
            this.goTo(new Position(100, 100));
            this.dropAggro = 500;
            addToUserLog(this.name + " pierdoli to i wraca");
        }
        if (this.attackCD <= 0) this.attackCD = this.attackSpeed / 2;
    }

    hit(target) {
        addToUserLog(this.name + " uderzył " + target.id);
        target.hp -= this.attackDmage;
        target.takeDmage(this);
    }

    takeDmage(source) {
        addToUserLog(this.name + " oberwał, hp " + this.hp + "->" + (this.hp - source.attackDmage));
        //this.hp -= source.attackDmage;
        var mobID = this.id % 10;
        var groupID = ((this.id - mobID) / 10) % 10;
        var spawnPointID = (this.id - mobID - groupID * 10) / 100;
        if (this.autoAttackTarget == '') testGroupAttack(spawnPointID, groupID, source);
        this.dropAggro = 500;

    }
}
