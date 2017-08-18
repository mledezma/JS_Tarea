/**
 * Inicializa el juego y empieza.
 *
 * Initialize the Game and starts it.
 */

var game = new Game ();

function init() {
	game.init()
};

window.addEventListener('load', init());