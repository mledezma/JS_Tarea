var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var score = 0;
var scoreText;

function preload() {

	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var platforms;

function create() {

	//Enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Simple Background
    game.add.sprite(0, 0, 'sky');

    // The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //Enable physics for any object that is created in this group
    platforms.enableBody = true;

    //Create the ground
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //Scale it to fit the width of the game
    ground.scale.setTo(2, 2);

    //This stops it from falling away when you jump on it
    ground.body.immovable = true;

    // Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

    //The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //Enable physics on the player
    game.physics.arcade.enable(player);

    //Player physics properties and give a bounce
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;

    //Two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //Stars
    stars = game.add.group();

    stars.enableBody = true;

    //Create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //Let gravity do its thing
        star.body.gravity.y = 60;

        //This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //Score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#191919' });
}


function update() {

	//Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

	cursors = game.input.keyboard.createCursorKeys();

    //Reset the players velocity
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //Stand still
        player.animations.stop();

        player.frame = 4;
    }
    //Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }

    //If player take star call CollectStar
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
}

function collectStar (player, star) {

    //Removes the star from the screen
    star.kill();

    //Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;


}