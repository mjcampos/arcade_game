// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = y;
    this.x = -100;
    this.speed = Math.floor(Math.random() * 125) + 100;
    this.delay = Math.floor(Math.random() * 20) + 10;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.delay === 0) {
        this.x += this.speed * dt;

        if(this.x > 500) {
            this.x = -this.speed;
            this.delay = Math.floor(Math.random() * 20) + 10;
        }
    } else {
        this.delay--;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 450;
}

Player.prototype.update = function(dt) {
    var enemy1 = allEnemies[0];
    var enemy2 = allEnemies[1];
    var enemy3 = allEnemies[2];

    if((this.y === 50) && ((this.x > enemy1.x - 50) && (this.x < enemy1.x + 50))) {
        this.y = 450;
        this.x = 200;
    } else if((this.y === 150) && ((this.x > enemy2.x - 50) && (this.x < enemy2.x + 50))) {
        this.y = 450;
        this.x = 200;
    } else if((this.y === 250) && ((this.x > enemy3.x - 50) && (this.x < enemy3.x + 50))) {
        this.y = 450;
        this.x = 200;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if((this.y < 0) || (this.y > 450)) {
        this.y = 450;
    }
}

Player.prototype.handleInput = function(key) {
    if(key === "up") {
        this.y -= 100;
    } else if(key === "down") {
        this.y += 100;
    } else if((key === "right") && (this.x < 400)) {
        this.x += 100;
    } else if((key === "left") && (this.x > 0)) {
        this.x -= 100;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(50), new Enemy(150), new Enemy(250)];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
