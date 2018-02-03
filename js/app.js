// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = y;  // The starting Y location of an enemy instance
    this.x = -100;
    this.speed = Math.floor(Math.random() * 125) + 100;  // How fast an enemy should move
    this.delay = Math.floor(Math.random() * 20) + 10;  // How much time to wait before enemy begins moving
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // When the delay reaches 0 begin moving at this.speed * dt
    if(this.delay === 0) {
        this.x += this.speed * dt;

        // If the enemy instance has moved passed 500px, or off the screen, then reset this.x and set a new this.delay timer
        if(this.x > 500) {
            this.x = -100;
            this.delay = Math.floor(Math.random() * 20) + 10;
        }
    } else {
        // Else decrease this.delay by 1
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
    this.winningDelay = 10;  // When a player wins set a timer for how long they'll see their character on screen before the reset features are initiated
}

Player.prototype.update = function(dt) {
    var enemy1 = allEnemies[0];
    var enemy2 = allEnemies[1];
    var enemy3 = allEnemies[2];

    // Check if collision occurs. If true then reset the player to their original starting point
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

    // If the player reaches the end then they've won. 
    if (this.y < 0) {
        // Allow them 10 ticks to see their character in the winning slot before alerting them of their victory and reset the entire game
        if (this.winningDelay === 0) {
            alert("You won");
            location.reload();
        } else{
            --this.winningDelay;
        };
    };

    // If player tries to go off the bottom tiles then return them to the default this.y location
    if (this.y > 450) {
        this.y = 450;
    };
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    // In any movement the character moves 100px
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
