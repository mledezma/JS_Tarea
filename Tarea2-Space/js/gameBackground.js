

/**
 * Definir un objeto para que contenga todas nuestras imagenes del
 * juego y solo crearlas una vez. Un objeto 'Singleton'.
 * 
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */

var imgContainer = new function() {
 	// Definir imgs.
 	// Define images.
 	this.background = new Image();
 	this.spaceShip = new Image();
 	this.enemy = new Image();
 	this.bullet = new Image();
 	this.enemyBullet = new Image();

 	// Asegurar que todas las imagenes esten cargadas antes de iniciar el juego.
 	// Ensure all images have loaded before starting the game.
 	var numImages = 5;
 	var numLoaded = 0;
 	function imageLoaded() {
 		numLoaded++;
 		if (numLoaded === numImages) {
 			window.init();
 		};
 	};

 	this.background.onload = function() {
 		imageLoaded();
 	}

 	this.spaceShip.onload = function() {
 		imageLoaded();
 	}

 	this.bullet.onload = function() {
 		imageLoaded();
 	}

 	this.enemy.onload = function () {
 		imageLoaded();
 	}

 	this.enemyBullet.onload = function () {
 		imageLoaded();
 	}

 	// Setear el src de las imagenes.
 	// Set images src.
 	this.background.src = 'img/background.png';
 	this.spaceShip.src = 'img/ship.png';
 	this.bullet.src = 'img/bullet.png';
 	this.enemy.src = 'img/enemy.png';
 	this.enemyBullet.src = 'img/bullet_enemy.png'
}

 /**
 * Vamos a crear un objeto que va a ser la clase base para
 * cada uno de los objetos que se dibujan del juego. 
 *
 *
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up default variables
 * that all child objects will inherit, as well as the default
 * functions.
 */

function drawBase () {
	this.init = function (x, y, width, height) {
		// Default variables
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	};

	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.collidableWith = "";
	this.isColliding = false;
	this.type;

	// Definir una funcion abstracta para ser implementada en los objetos hijos.
	// Define abstract function to be implemented in child objects.
	this.draw = function () {
	};
	this.move = function () {
	};
	this.isCollidableWith = function (object) {
		return (this.collidableWith === object.type);
	}
};

 /**
 * Vamos a crear un objeto llamado 'Background' que va a convertirse
 * en el hijo de nuestro objeto 'drawBase'. El background esta dibujado
 * en el 'background' canvas y crea la ilusion del movimiento
 *
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */

function Background() {
	this.speed = 1; // Redefine speed of the background for panning
	
	// Implement abstract function
	this.draw = function() {
		// Pan background
		this.y += this.speed;
		this.context.drawImage(imgContainer.background, this.x, this.y);
		
		// Draw another image at the top edge of the first image
		this.context.drawImage(imgContainer.background, this.x, this.y - this.canvasHeight);

		// If the image scrolled off the screen, reset
		if (this.y >= this.canvasHeight)
			this.y = 0;
	};
};

// Set Background to inherit properties from drawBase.
// Setear Background como una propiedad inicial del drawBase.
Background.prototype = new drawBase();

/**
 * Creamos un objeto 'Game' que va a contener todos nuestros objetos
 * y data del juego.
 *
 * Creates the Game object which will hold all objects and data for
 * the game.
 */

function Game () {
/*
 * Obtener la informacion del canvas y el contexto y setear
 * todos los objetos del juego.
 * Retornar 'true' si el canvas es soportado y 'false' si no lo es.
 * Esto detendria el script de la animacion por constante 'running',
 * de navegadores viejos.
 *
 * Gets canvas information and context and sets up all game
 * objects.
 * Returns true if the canvas is supported and false if it
 * is not. This is to stop the animation script from constantly
 * running on older browsers.
 */
	this.init = function () {
		// Obtener el elemento canvas.
		// Get the canvas element.
		this.bgCanvas = document.getElementById('background');
		this.shipCanvas = document.getElementById('ship');
		this.mainCanvas = document.getElementById('main');

		// Testear para ver si el canvas es soportado
		// Test to see if canvas is supported
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			this.shipContext = this.shipCanvas.getContext('2d');
			this.mainContext = this.mainCanvas.getContext('2d');

			// Inicializar los objetos para contener su contexto y la informacion del canvas.
			// Initialize objects to contain their context and canvas information.
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;

			Ship.prototype.context = this.shipContext;
			Ship.prototype.canvasWidth = this.shipCanvas.width;
			Ship.prototype.canvasHeight = this.shipCanvas.height;

			Bullet.prototype.context = this.mainContext;
			Bullet.prototype.canvasWidth = this.mainCanvas.width;
			Bullet.prototype.canvasHeight = this.mainCanvas.height;

			Enemy.prototype.context = this.mainContext;
			Enemy.prototype.canvasWidth = this.mainCanvas.width;
			Enemy.prototype.canvasHeight = this.mainCanvas.height;

			// Inicializar el objeto background;
			// Iniatialize the background object.
			this.background = new Background();
			this.background.init(0,0); // Set draw point to 0,0.
								  	   // Setea el punto de dibujo de 0,0.

			// Inicializar el objeto ship.
			// Iniatialize the ship object.
			this.ship = new Ship();
			// Set the ship to start near the bottom middel of the canvas.
			this.shipStartX = this.shipCanvas.width/2 - imgContainer.spaceShip.width;
			this.shipStartY = this.shipCanvas.height/4*3 + imgContainer.spaceShip.height*2;
			this.ship.init(this.shipStartX, this.shipStartY, imgContainer.spaceShip.width, imgContainer.spaceShip.height);

			// Initialize the enemy pool object
			this.enemyPool = new Pool(30);
			this.enemyPool.init("enemy");
			this.spawnWave();

			this.enemyBulletPool = new Pool(50);
			this.enemyBulletPool.init("enemyBullet");

			// Start QuadTree
			this.quadTree = new QuadTree({x:0,y:0,width:this.mainCanvas.width,height:this.mainCanvas.height});

			this.playerScore = 0;

			// Audio files
			this.laser = new SoundPool(10);
			this.laser.init("laser");

			this.explosion = new SoundPool(20);
			this.explosion.init("explosion");

			this.backgroundAudio = new Audio("sounds/kick_shock.wav");
			this.backgroundAudio.loop = true;
			this.backgroundAudio.volume = .25;
			this.backgroundAudio.load();

			this.gameOverAudio = new Audio("sounds/game_over.wav");
			this.gameOverAudio.loop = true;
			this.gameOverAudio.volume = .25;
			this.gameOverAudio.load();

			this.checkAudio = window.setInterval(function(){checkReadyState()},1000);

		};

	};
	// Spawn a new wave of enemies
	this.spawnWave = function() {
		var height = imgContainer.enemy.height;
		var width = imgContainer.enemy.width;
		var x = 100;
		var y = -height;
		var spacer = y * 1.5;

		for (var i = 1; i <= 18; i++) {
			this.enemyPool.get(x,y,2);
			x += width + 25;
			if (i % 6 == 0) {
				x = 100;
				y += spacer
			}
		};

	};

 	// Empezar el loop de la animacion.
 	// Start the animation loop.
 	this.start = function() {
		this.ship.draw();
		this.backgroundAudio.play();
		animate();
	};

	// Restart the game
	this.restart = function() {
		this.gameOverAudio.pause();

		document.getElementById('game-over').style.display = "none";
		this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
		this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
		this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

		this.quadTree.clear();

		this.background.init(0,0);
		this.ship.init(this.shipStartX, this.shipStartY,
		               imgContainer.spaceShip.width, imgContainer.spaceShip.height);

		this.enemyPool.init("enemy");
		this.spawnWave();
		this.enemyBulletPool.init("enemyBullet");

		this.playerScore = 0;

		this.backgroundAudio.currentTime = 0;
		this.backgroundAudio.play();

		this.start();
	};

	// Game over
	this.gameOver = function() {
		this.backgroundAudio.pause();
		this.gameOverAudio.currentTime = 0;
		this.gameOverAudio.play();
		document.getElementById('game-over').style.display = "block";
	};
};

/**
 * Ensure the game sound has loaded before starting the game
 */
function checkReadyState() {
	if (game.gameOverAudio.readyState === 4 && game.backgroundAudio.readyState === 4) {
		window.clearInterval(game.checkAudio);
		document.getElementById('loading').style.display = "none";
		game.start();
	}
}

/**
 * A sound pool to use for the sound effects
 */
function SoundPool(maxSize) {
	var size = maxSize; // Max bullets allowed in the pool
	var pool = [];
	this.pool = pool;
	var currSound = 0;

	/*
	 * Populates the pool array with the given object
	 */
	this.init = function(object) {
		if (object == "laser") {
			for (var i = 0; i < size; i++) {
				// Initalize the object
				laser = new Audio("sounds/laser.wav");
				laser.volume = .12;
				laser.load();
				pool[i] = laser;
			}
		}
		else if (object == "explosion") {
			for (var i = 0; i < size; i++) {
				var explosion = new Audio("sounds/explosion.wav");
				explosion.volume = .1;
				explosion.load();
				pool[i] = explosion;
			}
		}
	};

	/*
	 * Plays a sound
	 */
	this.get = function() {
		if(pool[currSound].currentTime == 0 || pool[currSound].ended) {
			pool[currSound].play();
		}
		currSound = (currSound + 1) % size;
	};
}

/**
 * El loop de la animacion. Llama el 'requestAnimationFrame' para optimizar
 * el loop del juego y dibujar todos los objetos del juego. Esta funcion
 * debe ser una funcion global y no debe estar dentro de un objeto.
 *
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
function animate() {

	document.getElementById('score').innerHTML = game.playerScore;
	// Insert objects into quadtree
	game.quadTree.clear();
	game.quadTree.insert(game.ship);
	game.quadTree.insert(game.ship.bulletPool.getPool());
	game.quadTree.insert(game.enemyPool.getPool());
	game.quadTree.insert(game.enemyBulletPool.getPool());
	detectCollision();

	// No more enemies
	if (game.enemyPool.getPool().length === 0) {
		game.spawnWave();
	}

	// Animate game objects
	if (game.ship.alive) {
		requestAnimateFrame( animate );

		game.background.draw();
		game.ship.move();
		game.ship.bulletPool.animate();
		game.enemyPool.animate();
		game.enemyBulletPool.animate();
	}

}

/**
 * Busca el primer API que funciona para optimizar el loop de la animacion,
 * sino utiliza el default 'setTimeout()'.
 *
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimateFrame = (function () {
	return window.requestAnimationFrame		||
		window.webkitRequestAnimationFrame 	||
		window.mozRequestAnimationFrame    	||
		window.oRequestAnimationFrame      	||
		window.msRequestAnimationFrame     	||
		function (/* function */ callback, /* DOMElement */ element) {
			window.setTimeout(callback, 1000 / 60);
		};
})();
