InvaderBullet = (function () {

    var gameObject = GameObject;

    function InvaderBullet(height, width, posX, posY, img) {
        gameObject.call(this, height, width, posX, posY, img);
        this._direction = DOWN;
    }

    inherit(gameObject, InvaderBullet);

    return InvaderBullet;

})();


InvaderBullet.prototype.update = function () {
    this._posY += INV_BULLET_JMP;
    if (this._posY > screen_height)
    {
        return OUT_OF_RANGE;
    }
}