GameObject = (function () {

    function GameObject(height, width, posX, posY, img) {
        this._height = height;
        this._width = width;
        this._posX = posX;
        this._posY = posY;
        this._img = img;
        this._objId = null;
        this._direction = null;
        this._move = true;
    }

    GameObject.prototype.getHeight = function () { return this._height; }
    GameObject.prototype.getWidth = function () { return this._width; }
    GameObject.prototype.getPosX = function () { return this._posX; }
    GameObject.prototype.getPosY = function () { return this._posY; }
    GameObject.prototype.getImg = function () { return this._img; }
    GameObject.prototype.getDirection = function () { return this._direction; }
    GameObject.prototype.getMove = function () { return this._move; }
    GameObject.prototype.getObjId = function () { return this._objId; }

    GameObject.prototype.setHeight = function (height) { this._height = height; }
    GameObject.prototype.setWidth = function (width) { this._width = height; }
    GameObject.prototype.setPosX = function (posX) { this._posX = posX; }
    GameObject.prototype.setPosY = function (posY) { this._posY = posY; }
    GameObject.prototype.setImg = function (img) { this._img = img; }
    GameObject.prototype.setDirection = function (direction) { this._direction = direction }
    GameObject.prototype.setMove = function (move) { this._move = move; }
    GameObject.prototype.setObjId = function (objId) { this._objId = objId; }

    return GameObject;

})();