MotherShip = (function () {

    var gameObject = GameObject;

    function MotherShip(height, width, posX, posY, img, points) {
        gameObject.call(this, height, width, posX, posY, img);
        this._move = false;
        this._objId = "mothership";
        this._points = points;
    }

    inherit(gameObject, MotherShip);

    return MotherShip;

})();

MotherShip.prototype.getPoints = function () { return this._points; }

MotherShip.prototype.setPoints = function (points) { this._points = points; }

MotherShip.prototype.update = function () {
    if (this._move == true) {
        this._posX += MOVE_MOTHERSHIP;
        if (this._posX > screen_width - GAP_MOTHERSHIP) {
            this._posX = MOTHERSHIP_X_START_POSITION;
            this._move = false;
            return OUT_OF_RANGE;
        }
    }
}