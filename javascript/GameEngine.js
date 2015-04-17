/***************************************************************************/
/*    MOBILE WEB DEVELOPMENT COURSE,                                       */
/*    Tel Aviv Academic College,                                           */
/*    Lecturer: Mr. Guy Ronen                                              */
/*    April 2015                                                           */
/*                                                                         */
/*    SPACE INVADERS (assignment)                                          */
/*    Author: Chen Navon (chennavon1@gmail.com)                            */
/*    Repo: https://github.com/chen199/                                    */
/*                                                                         */
/***************************************************************************/


gameObjectFactory = new GameObjectFactory();

GameEngine = (function () {
    
    function GameEngine(UIFunc1, UIFunc2, UIFunc3, UIFunc4) {
        this._bulletsCounterForId = 0;
        this._intervalId = null;
        this._gameObjectCreated = UIFunc1;
        this._gameObjectMoved = UIFunc2;
        this._gameObjectDestroyed = UIFunc3;
        this._onUpdatedScoreAndLives = UIFunc4;
        this.initProperties();
    }

    return GameEngine;

})();

GameEngine.prototype.initProperties = function () {
    this._InvadersArr = this.createInvaderArray();

    this._motherShip = gameObjectFactory.Create(MOTHERSHIP,
                                                MOTHERSHIP_HEIGHT,
                                                MOTHERSHIP_WIDTH,
                                                MOTHERSHIP_X_START_POSITION,
                                                MOTHERSHIP_Y_START_POSITION,
                                                MOTHERSHIP_IMG_NAME,
                                                MOTHERSHIP_HIT_POINTS);

    this._defender = gameObjectFactory.Create(DEFENDER,
                                              DEFENDER_WIDTH,
                                              DEFENDER_HEIGHT,
                                              DEFENDER_X_START_POSITION,
                                              screen_height - 50,
                                              DEFENDER_IMG_NAME,
                                              DEFENDER_HIT_POINTS);

    this._defenderBulletsArr = new Array();
    this._InvadersBulletsArr = new Array();
    this._gameObjectCreated(this._defender);
    this._score = ZERO;
    this._isLeftOnPress = false;
    this._isRightOnPress = false;
    this.initListeners();
}

GameEngine.prototype.startEngine = function () {
    this._intervalId = setInterval(this.scan, 10, this);
}


GameEngine.prototype.createInvaderArray = function() {
    var InvadersArray = new Array();
    var points;
    for (var i = 0; i < INV_ROWS; i++) {
        for (var j = 0; j < INV_COLS; j++) {
            var img;
            if (i == 0) {
                img = INV_A_01;
                points = INV_A_HIT_POINTS;
            }
            else if (i > 0 && i < 3) {
                img = INV_B_01;
                points = INV_B_HIT_POINTS;
            }
            else {
                img = INV_C_01;
                points = INV_C_HIT_POINTS;
            }

            var newInvader = gameObjectFactory.Create(INVADER,
                                                      INV_HEIGHT,
                                                      INV_WIDTH,
                                                      10 + j * 32 + j * GAP_FROM_LEFT_INV,
                                                      96 + i * 32 + i * GAP_FROM_LEFT_INV,
                                                      img,
                                                      points);

            newInvader._objId = "invader" + i.toString() + "_" + j.toString();
            this._gameObjectCreated(newInvader);
            InvadersArray.push(newInvader);

        }
    }
    return InvadersArray;
}

GameEngine.prototype.initListeners = function() {
    document.onkeydown = this.checkKeyDown.bind(this);
    document.onkeyup = this.checkKeyUp.bind(this);
    document.onkeypress = this.checkKeyPress.bind(this);
    document.onmousemove = this.checkMouseMove.bind(this);
    document.onmousedown = this.checkMouseDown.bind(this);
}

GameEngine.prototype.checkKeyDown = function (e) {

    e = e || window.event;

    if (e.keyCode == LEFT_ARROW_KEY) {
        this._isLeftOnPress = true;
        this._defender.setDirection(LEFT);
        this._defender.setMove(true);
    }
    else if (e.keyCode == RIGHT_ARROW_KEY) {
        this._isRightOnPress = true;
        this._defender.setDirection(RIGHT);
        this._defender.setMove(true);
    }
};


GameEngine.prototype.checkKeyUp = function (e) {

    e = e || window.event;

    if (e.keyCode == LEFT_ARROW_KEY) {
        this._isLeftOnPress = false;
        if (this._isRightOnPress) {
            this._direction = RIGHT;
        }
        else {
            this._defender.setMove(false);
        }
    }
    else if (e.keyCode == RIGHT_ARROW_KEY) {
        this._isRightOnPress = false;
        if (this._isLeftOnPress == true) {
            this._direction = LEFT;
        }
        else {
            this._defender.setMove(false);
        }
    }
    else if (e.keyCode == ENTER_KEY) {
        this._isEnterOnPress = false;
        this._defender.setShoot(false);
    }
};

GameEngine.prototype.checkKeyPress = function (e) {
    if (e.keyCode == ENTER_KEY) {
        this._defender.setShoot(true);
    }
}

GameEngine.prototype.checkMouseMove = function (e) {
    this._defender.setPosX(e.clientX);
    this._gameObjectMoved(this._defender);
}

GameEngine.prototype.checkMouseDown = function (e) {
    GameEngine.prototype.createABulletForDefender.call(this, this._defender);
}

GameEngine.prototype.scan = function (enginePropContainer) {
    GameEngine.prototype.scanInvaders.call(enginePropContainer);
    GameEngine.prototype.scanDefender.call(enginePropContainer);
    GameEngine.prototype.scanMotherShip.call(enginePropContainer);
    GameEngine.prototype.scanForBullets.call(enginePropContainer);
    GameEngine.prototype.shootBullets.call(enginePropContainer);
    GameEngine.prototype.checkCollisionsForDefenderBullets.call(enginePropContainer);
    GameEngine.prototype.checkCollisionsForInvaderBullets.call(enginePropContainer);
    GameEngine.prototype.checkCollisionsInvadersWithDefender.call(enginePropContainer);
}

GameEngine.prototype.scanInvaders = function () {
    for (var i = 0; i < this._InvadersArr.length; i++)
    {
        var newDir = this._InvadersArr[i].update();
        if (newDir == DOWN_LEFT)
        {
            GameEngine.prototype.updateReverse.call(this, i, LEFT);
            GameEngine.prototype.updateAllInvadersMovement.call(this, DOWN_LEFT);
            i = ZERO;
            break;
        } else if (newDir == DOWN_RIGHT) {
            GameEngine.prototype.updateReverse.call(this, i, RIGHT);
            GameEngine.prototype.updateAllInvadersMovement.call(this, DOWN_RIGHT);
            i = ZERO;
            break;
        } else {
            this._gameObjectMoved(this._InvadersArr[i]);
        }
    }
    if (this._InvadersArr.length == ZERO) {
        clearInterval(this._intervalId);
        alert("You Won! The score is: " + this._score);
    }
}

GameEngine.prototype.updateReverse = function (index, dir) {
    
    for(var i = 0; i < index; i++)
    {
        this._InvadersArr[i].updateReverse(dir);
        this._gameObjectMoved(this._InvadersArr[i]);
    } 
}


GameEngine.prototype.updateAllInvadersMovement = function (direction) {
    var newDir = direction == DOWN_RIGHT ? RIGHT : LEFT;

            for (var i = 0; i < this._InvadersArr.length; i++)
            {
                this._InvadersArr[i].setDirection(newDir);
                this._InvadersArr[i].setTimeThrshold(this._InvadersArr[i].getTimeThreshold() * 0.9);
                this._InvadersArr[i].setPosY(this._InvadersArr[i].getPosY() + INV_DOWN_JMP);
                this._InvadersArr[i].setTimeAggregator(ZERO);
                this._gameObjectMoved(this._InvadersArr[i]);
            }

    }

GameEngine.prototype.scanDefender = function () {
    if (this._defender.getMove() == true)
    {
        if (this._defender.getDirection() == RIGHT)
        {
            if (this._defender.getPosX() < screen_width - GAP_DEFENDER)
            {
                this._defender.update();
                this._gameObjectMoved(this._defender);
            } 
        }
        else if (this._defender.getDirection() == LEFT)
        {
            if (this._defender.getPosX() > LEFT_SIDE_GAP)
            {
                this._defender.update();
                this._gameObjectMoved(this._defender);
            } 
        }
    }
}



GameEngine.prototype.scanMotherShip = function () {
    if (this._motherShip.getMove() == false)
    {
        if (Math.floor(Math.random() * 50000) + 1 < 100)
        {
            this._gameObjectCreated(this._motherShip);
            this._motherShip.setMove(true);
        } 
    }
    if (this._motherShip.update() == OUT_OF_RANGE)
    {
        this._gameObjectDestroyed(this._motherShip);
    }
    else if (this._motherShip.getMove() == true)
    {
        this._gameObjectMoved(this._motherShip);
    }
}


GameEngine.prototype.scanForBullets = function () {
    if (this._defender.isShoot() == true)
    {
        this.createABulletForDefender(this._defender);
    }
    GameEngine.prototype.randForInvadersBullets.bind(this)();
}

GameEngine.prototype.createABulletForDefender = function (origin) {
    if (origin instanceof Defender)
    {
        if (this._defenderBulletsArr.length < MAX_NUM_DEFENDER_BULLETS_ONFIRE)
        {
            var bulletToPush = gameObjectFactory.Create(DEFENDERBULLET,
                                                 BULLET_HEIGHT,
                                                 BULLET_WIDTH,
                                                 this._defender._posX + 15,
                                                 this._defender._posY - 1,
                                                 BULLET_DEF_NAME);
            
            bulletToPush.setObjId("InvaderBullet" + this._bulletsCounterForId);
            this._bulletsCounterForId++;
            this._gameObjectCreated(bulletToPush);
            this._defenderBulletsArr.push(bulletToPush);
            origin._shoot = false;
        } 
    } 
}

GameEngine.prototype.randForInvadersBullets = function ()
{
    for(var i = 0; i < this._InvadersArr.length; i++)
    {
        if(Math.floor((Math.random() * 5000) + 1) == 1)
        {
            var bulletToPush = gameObjectFactory.Create(ENEMYBULLET,
                                                        BULLET_HEIGHT,
                                                        BULLET_WIDTH,
                                                        this._InvadersArr[i].getPosX(),
                                                        this._InvadersArr[i].getPosY() + 2,
                                                        BULLET_INV_NAME);
            bulletToPush.setObjId("InvaderBullet" + this._bulletsCounterForId);
            this._bulletsCounterForId++;
            this._InvadersBulletsArr.push(bulletToPush);
            this._gameObjectCreated(bulletToPush);
        }
    }
}

GameEngine.prototype.shootBullets = function () 
{
    for (var i = 0; i < this._defenderBulletsArr.length; i++)
    {
        if (this._defenderBulletsArr[i].update() == OUT_OF_RANGE)
        {
            this._gameObjectDestroyed(this._defenderBulletsArr[i]);
            this._defenderBulletsArr.splice(i, 1);
            i--;
        }
        else
        {
            this._gameObjectMoved(this._defenderBulletsArr[i]);
        }

    }

    for (var i = 0; i < this._InvadersBulletsArr.length; i++)
    {
        if (this._InvadersBulletsArr[i].update() == OUT_OF_RANGE)
        {
            this._gameObjectDestroyed(this._InvadersBulletsArr[i]);
            this._InvadersBulletsArr.splice(i, 1);
            i--;
        }

        else
        {
            this._gameObjectMoved(this._InvadersBulletsArr[i]);
        }
    }
    
}

GameEngine.prototype.checkCollisionsForDefenderBullets = function () {
    for (var i = 0; i < this._defenderBulletsArr.length; i++) {
        var bulletToCompare = this._defenderBulletsArr[i];
        for (var j = 0 ; j < this._InvadersArr.length; j++) {
            var invaderToCompare = this._InvadersArr[j];
            if (GameEngine.prototype.checkCollisionsGenerics(bulletToCompare, invaderToCompare) == true)
            {
                GameEngine.prototype.addScore.call(this, this._InvadersArr[j].getPoints());
                this._gameObjectDestroyed(this._InvadersArr[j]);
                this._InvadersArr.splice(j, 1);
                this._gameObjectDestroyed(this._defenderBulletsArr[i]);
                this._defenderBulletsArr.splice(i, 1);
                this._onUpdatedScoreAndLives(this._score, this._defender.getLife());
                this.increaseInvadersSpeed();
                i -= 1;
                break;
            }

            if (GameEngine.prototype.checkCollisionsGenerics(bulletToCompare, this._motherShip) == true)
            {
                GameEngine.prototype.addScore.call(this, this._motherShip.getPoints());
                this._motherShip.setMove(false);
                this._motherShip.setPosX(MOTHERSHIP_X_START_POSITION);
                this._gameObjectMoved(this._motherShip);
                this._gameObjectDestroyed(this._defenderBulletsArr[i]);
                this._defenderBulletsArr.splice(i, 1);
                this._onUpdatedScoreAndLives(this._score, this._defender.getLife());
                i -= 1;
                break;
            }
        }
    }
}

GameEngine.prototype.checkCollisionsGenerics = function () {
    var isCollision = false;
    var issued1 = arguments[0];
    var issued2 = arguments[1];

    if (issued1.getPosX() <= issued2.getPosX() + issued2.getWidth()
        && issued1.getPosX() >= issued2.getPosX())
    {
        if (issued1.getPosY() <= issued2.getPosY() + issued2.getHeight() &&
            issued1.getPosY() >= issued2.getPosY() - issued2.getHeight())
        {
            isCollision = true;
        }
    }

    return isCollision;
}


GameEngine.prototype.checkCollisionsForInvaderBullets = function () {
    for (var i = 0; i < this._InvadersBulletsArr.length; i++) {
        var bulletToCompare = this._InvadersBulletsArr[i];

        if (GameEngine.prototype.checkCollisionsGenerics(bulletToCompare, this._defender) == true)
        {
            GameEngine.prototype.addScore.call(this, this._defender.getPoints());
            this._gameObjectDestroyed(this._InvadersBulletsArr[i]);
            this._InvadersBulletsArr.splice(i, 1);
            this._defender.decLife();
            this._onUpdatedScoreAndLives(this._score, this._defender.getLife());
            if (this._defender.getLife() == ZERO)
            {
                this._gameObjectDestroyed(this._defender);
                clearInterval(this._intervalId);
                alert("Game Over");
            }
            else
            {
                this._defender.setPosX(ZERO);
                this._gameObjectMoved(this._defender);
            }       
        }
    }
}

GameEngine.prototype.increaseInvadersSpeed = function () {
    for (var i = 0; i < this._InvadersArr.length; i++)
    {
        this._InvadersArr[i].setTimeThrshold(this._InvadersArr[i].getTimeThreshold() * 0.96);
    }
}


GameEngine.prototype.addScore = function(points){
    this._score += points;
    if (this._score < ZERO)
    {
        this._score = ZERO;
    }
}

GameEngine.prototype.checkCollisionsInvadersWithDefender = function () {
    for(i = 0; i < this._InvadersArr.length; i++)
    {
        if (GameEngine.prototype.checkCollisionsGenerics(this._defender, this._InvadersArr[i]) == true)
        {
            clearInterval(this._intervalId);
            alert("GAME OVER");       
        }
    }
}

