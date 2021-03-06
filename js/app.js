'use strict'
/**
 * Game settings
 */
const config = {
  player: {
    initialX: 200,
    initialY: 400,
    moveSpeed: 50,
    sprite: 'images/char-boy.png'
  },
  enemyQuantity: 5
}

/**
 * Return a random value between two numbers
 */
function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

var Enemy = function() {
    this.x = getRandomBetween(-10, 10) * 50; //Randomize start position of enemies
    this.y = getRandomBetween(1, 3) * 100;

    this.moveSpeed = 50 * getRandomBetween(1, 5); //Randomize speed of enemies

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.moveSpeed * dt;

    if(this.x > 600) {
        this.restartPosition();
    }

    this.checkCollision();
};

/**
 * Check if enemy was collided with the player
 */
Enemy.prototype.checkCollision = function() {
    const area = 50;

    const startX = this.x - area - 20;
    const endX   = this.x + area + 20;

    const startY = this.y - area;
    const endY   = this.y + area;


    if ((player.x > startX && player.x < endX) && (player.y > startY && player.y < endY)) {
        player.die();
    }
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.restartPosition = function() {
    this.x = -100;
}

var Player = function() {
    const playerConfig = config.player;
    this.sprite = playerConfig.sprite;

    this.x = playerConfig.initialX;
    this.y = playerConfig.initialY;
    this.moveSpeed = playerConfig.moveSpeed;

    this.dies  = 0;
    this.score = 0
};

Player.prototype.die = function() {
    this.dies++;
    this.restartPosition();
};

/**
 * Check if player reached to the objective
 */
Player.prototype.checkWin = function() {
    if (this.y < 0  ) {
        this.win();
    }
};

/**
 * Restart position of player and increment the score
 */
Player.prototype.win = function() {
    this.score++;
    this.restartPosition();
};

/**
 * Restart player to initial possition
 */
Player.prototype.restartPosition = function() {
    this.x = config.player.initialX;
    this.y = config.player.initialY;
};

/**
 * Handle player movement
 */
Player.prototype.handleInput = function(key) {
    if(!key) {
        return false;
    }

    let newY = this.y;
    let newX = this.x;

    switch(key) {
        case 'up':
            newY -= this.moveSpeed;
            break;
        case 'down':
            newY += this.moveSpeed;
            break;
        case 'left':
            newX -= this.moveSpeed;
            break;
        case 'right':
            newX += this.moveSpeed;
            break;
    }

    if (newX < 0 || newX > 400) { //check board area
        return false;
    }

    if (newY < -50 || newY > 400) { //check board area
        return false;
    }

    this.x = newX;
    this.y = newY;


    this.checkWin();
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const player = new Player();

const allEnemies = [];
for (var i = 0; i <= config.enemyQuantity; i++) {
  allEnemies.push(new Enemy())
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
