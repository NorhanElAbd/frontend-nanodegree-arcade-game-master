var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

class Charchter {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = 'images/char-boy.png';
    }
}

class Enemy extends Charchter {
    constructor(x, y, speed, width, height, sprite) {
        super(x, y, width, height);
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.speed += (0.1) * dt;
        this.x = this.x + (this.speed);
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
var instantiateEnemies = function instantiateEnemies() {
    let posY = 60,
        posX = -100,
        newSpeed = 2;
    for (let i = 1; i < 40; i++) {
        const enemy = new Enemy(posX, posY, newSpeed, 50, 50);
        allEnemies.push(enemy);
        posY += 85;
        newSpeed -= 0.5;

        if (i % 3 == 0) {
            posY = 60;
            newSpeed = 2;
            posX -= 400;
        }
    }
}

instantiateEnemies();

var Keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

let winner = false;

class Player extends Charchter {

    update(dt) {
        if (this.x >= 0 && this.x <= 400) {
            if (Keys.left) {
                this.x = this.x - TILE_WIDTH;
                if (this.x < 0) { this.x = 0; }
                Keys.left = false
            }
            if (Keys.right) {
                this.x = this.x + TILE_WIDTH;
                if (this.x > 400) { this.x = 400; }
                Keys.right = false
            }
        }
        if (this.y >= -10 && this.y <= 400) {
            if (Keys.up) {
                this.y = this.y - TILE_HEIGHT;
                if (this.y < -50) { this.y = -50; }
                Keys.up = false
            }
            if (Keys.down) {
                this.y = this.y + TILE_HEIGHT;
                if (this.y > 400) { this.y = 400; }
                Keys.down = false
            }
        }
        if (this.y <= -10) { winner = true; }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

let player = new Player(200, 400, 50, 50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    //var allowedKeys = {
    //    37: 'left',
    //    38: 'up',
    //    39: 'right',
    //    40: 'down'
    //};

    e.preventDefault();
    //player.handleInput(allowedKeys[e.keyCode]);
    if (e.keyCode == "37") {
        Keys.left = true;
    }
    else if (e.keyCode == "38") {
        Keys.up = true;
    }
    else if (e.keyCode == "39") {
        Keys.right = true;
    }
    else if (e.keyCode == "40") {
        Keys.down = true;
    }
});

let collision = false;
function checkCollisions() {
    // console.log(player.width);
    allEnemies.forEach(function (enemyCollision) {
        if (player.x < enemyCollision.x + enemyCollision.width && player.x + player.width > enemyCollision.x &&
            player.y < enemyCollision.y + enemyCollision.height && player.y + player.height > enemyCollision.y) {
            collsision = true;
            reset();
        }
    });
}

function reset() {
    player.x = 200;
    player.y = 400;
    allEnemies = [];
    instantiateEnemies();
}

let winScreen = document.getElementById('winScreen');
let playAgain = document.getElementById('playAgain');

var winPopUp = function () {
    if (winner == true) {
        winScreen.style.display = "block";
        winner = false;
    }
}

playAgain.addEventListener('click', function () {
    reset();
    winScreen.style.display = 'none';
});