screen_width = window.innerWidth;
screen_height = window.innerHeight;

onGameObjectCreate = function (object) {
        var htmlToEnter = '<div id= "';
        htmlToEnter += object.getObjId() + '" '
        htmlToEnter += 'style="width: '
                        + object.getWidth() + 'px; height: ' + object.getHeight() + 'px; position: absolute; margin-left: ' + object.getPosX() + 'px; margin-top: ' + object.getPosY() + 'px;">';
        htmlToEnter += '<img src="../resources/' + object.getImg() + '">';
        htmlToEnter += '</div>'
        $('#invadersMatrixDiv').append(htmlToEnter);
}

onGameObjectMove = function (object) {
    var id = '#' + object._objId;
    $(id).css({'margin-left' : object._posX + 'px'});
    $(id).css({ 'margin-top': object._posY + 'px' });
    $(id + " > img").attr("src", "../resources/" + object._img);
}

onGameObjectDestroy = function (object) {
    var id = '#' + object._objId;
    $(id).remove();
}

onUpdateScoreAndLives = function (score, lives) {
    $('#score').html(score);
    $('#lives').html(lives);
}


$("#playBtn").click(function () {
    this.remove();
    gameEngine = new GameEngine(onGameObjectCreate,
                                onGameObjectMove,
                                onGameObjectDestroy,
                                onUpdateScoreAndLives).startEngine();
});


