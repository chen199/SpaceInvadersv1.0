function inherit(base, derived) {
    function Dummy() { }
    Dummy.prototype = base.prototype;
    derived.prototype = new Dummy();
}

function replaceAt(string ,index, character) {
    return string.substr(0, index) + character + string.substr(index + character.length);
}

const ZERO = 0;

//defender
const DEFENDER_WIDTH = 32;
const DEFENDER_HEIGHT = 32;
const DEFENDER_X_START_POSITION = 0;
const DEFENDER_IMG_NAME = "Ship01_32x32.png";
const DEFENDER_HIT_POINTS = -500;
const LEFT_SIDE_GAP = 20;
const GAP_DEFENDER = 32;
const RIGHT_MOVEMENT_DEFENDER = 4; 
const LEFT_MOVEMENT_DEFENDER = -4; 
const LIFE_NUM = 3;


//invader
const INV_ROWS = 5;
const INV_COLS = 9;
const INV_WIDTH = 32;
const INV_HEIGHT = 32;
const RIGHT_SIDE_INV_GAP = 75;
const LEFT_SIDE_INV_GAP = 10;
const GAP_FROM_LEFT_INV = 19.2;
const INV_RIGHT_JMP = 16;
const INV_LEFT_JMP = -16;
const INV_DOWN_JMP = 16;
const INV_THRESHOLD = 50;
const INV_A_01 = "EnemyA01_32x32.png";
const INV_B_01 = "EnemyB01_32x32.png";
const INV_C_01 = "EnemyC01_32x32.png";
const INV_A_HIT_POINTS = 180;
const INV_B_HIT_POINTS = 150;
const INV_C_HIT_POINTS = 130;


//mothership
const MOTHERSHIP_WIDTH = 120;
const MOTHERSHIP_HEIGHT = 32;
const MOTHERSHIP_X_START_POSITION = -150;
const MOTHERSHIP_Y_START_POSITION = 5;
const MOTHERSHIP_IMG_NAME = "MotherShip_32x120.png";
const MOTHERSHIP_HIT_POINTS = 800;
const GAP_MOTHERSHIP = 150;
const MOVE_MOTHERSHIP = 2;


//bullets
const BULLET_HEIGHT = 16;
const BULLET_WIDTH = 8;
const INV_BULLET_JMP = 12.5;
const DEF_BULLET_JMP = -12.5;
const MAX_NUM_DEFENDER_BULLETS_ONFIRE = 2;
const BULLET_INV_NAME = "BulletRed.png";
const BULLET_DEF_NAME = "BulletBlue.png";
    
//Directions
const RIGHT = "right";
const LEFT = "left";
const DOWN = "down";
const UP = "up";
const DOWN_LEFT = "down-left";
const DOWN_RIGHT = "down-right"

//Keys
const LEFT_ARROW_KEY = '37';
const UP_ARROW_KEY = '38';
const RIGHT_ARROW_KEY = '39';
const DOWN_ARROW_KEY = '40';
const ENTER_KEY = '13';
const OUT_OF_RANGE = "out_of_range"

//factory
const DEFENDER = "defender";
const INVADER = "invader";
const MOTHERSHIP = "mothership";
const ENEMYBULLET = "enemybullet";
const DEFENDERBULLET = "defenderbullet";