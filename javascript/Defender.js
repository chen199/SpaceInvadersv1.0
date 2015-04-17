Defender = (function () {

    var gameObject = GameObject;

    function Defender(height, width, posX, posY, img, points) {
        gameObject.call(this, height, width, posX, posY, img);
        this._move = false;
        this._objId = "defender";
        this._life = LIFE_NUM;
        this._points = points;
        this._shoot = false;
    }

    inherit(gameObject, Defender);

    return Defender;

})();

Defender.prototype.getLife = function () { return this._life;}
Defender.prototype.getPoints = function () { return this._points; }


Defender.prototype.setLife = function (life) { this._life = life; }
Defender.prototype.setPoints = function (points) { this._points = points; }
Defender.prototype.setShoot = function(val) {this._shoot = val;}

Defender.prototype.decLife = function () { this._life--; }
Defender.prototype.isShoot = function () { return this._shoot; }


Defender.prototype.update = function () {
    if (this._direction == RIGHT)
    {
        this._posX += RIGHT_MOVEMENT_DEFENDER;
    }
    else
    {
        this._posX += LEFT_MOVEMENT_DEFENDER;
    }
    
}

