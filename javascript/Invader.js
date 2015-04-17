Invader = (function () {

    var gameObject = GameObject;

    function Invader(height, width, posX, posY, img, points) {
        gameObject.call(this, height, width, posX, posY, img);
        this._move = true;
        this._timeAggregator = ZERO;
        this._timeThreshold = INV_THRESHOLD;
        this._points = points;
        this._isChangedImage = false;
        this._direction = RIGHT;
    }
    
    inherit(gameObject, Invader);

    return Invader;

})();

Invader.prototype.getPoints = function () { return this._points; }
Invader.prototype.getTimeThreshold = function () { return this._timeThreshold; }
Invader.prototype.getTimeAggregator = function () {}

Invader.prototype.setPoints = function (points) { this._points = points; }
Invader.prototype.setTimeThrshold = function (timeThreshold) { this._timeThreshold = timeThreshold; }
Invader.prototype.setTimeAggregator = function (timeAggregator) { this._timeAggregator = timeAggregator; }



Invader.prototype.update = function () {
    this._timeAggregator++;
    if (this._move == true && this._timeAggregator >= this._timeThreshold)
    {
        this._timeAggregator = ZERO;
        if (this._direction == RIGHT && this._posX > screen_width - RIGHT_SIDE_INV_GAP)
        {
            return DOWN_LEFT;
        }
        else if (this._direction == LEFT && this._posX < LEFT_SIDE_INV_GAP)
        {
            return DOWN_RIGHT;
        }
        else if (this._direction == RIGHT)
        {
            this.changeImage();
            this._posX += INV_RIGHT_JMP;
        }
        else if (this._direction == LEFT) {
            this.changeImage();
            this._posX += INV_LEFT_JMP;
        }
    }
}

Invader.prototype.updateReverse = function (dir) {
    if (dir == LEFT) {
        this.changeImage();
        this._posX += INV_LEFT_JMP;
    } else {
        this.changeImage();
        this._posX += INV_RIGHT_JMP;
    }
}


Invader.prototype.changeImage = function () {
    var num = this._img[7];
    var newStrForImg = "";

    if (num == '1')
    {
        newStrForImg = replaceAt(this._img, 7, "2");
        this._img = newStrForImg;
    }
    else if (num == '2')
    {
        newStrForImg = replaceAt(this._img, 7, "1");
        this._img = newStrForImg;
    }
}

