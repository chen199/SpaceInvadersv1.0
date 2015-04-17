DefenderBullet = (function () {

    var gameObject = GameObject;

    function DefenderBullet(height, width, posX, posY, img) {
        gameObject.call(this, height, width, posX, posY, img);
        this._direction = UP;
    }

    inherit(gameObject, DefenderBullet);

    return DefenderBullet;
})();


DefenderBullet.prototype.update = function () {
    this._posY += DEF_BULLET_JMP;
    if (this._posY < ZERO)
    {
        return OUT_OF_RANGE;
    }
}