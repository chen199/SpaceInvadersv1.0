GameObjectFactory = (function () {

    function GameObjectFactory() {}

    GameObjectFactory.prototype.Create = function (type, height, width, posX, posY, img, points) {
        var newObject = null;
        if (type == DEFENDER)
        {
            newObject = new Defender(height, width, posX, posY, img, points);
        }
        else if (type == INVADER)
        {
            newObject = new Invader(height, width, posX, posY, img, points);
        }
        else if (type == MOTHERSHIP)
        {
            newObject = new MotherShip(height, width, posX, posY, img, points);
        }
        else if (type == ENEMYBULLET)
        {
            newObject = new InvaderBullet(height, width, posX, posY, img, points);
        }
        else if (type == DEFENDERBULLET)
        {
            newObject = new DefenderBullet(height, width, posX, posY, img, points);
        }
        return newObject;
    }

    return GameObjectFactory;

})();