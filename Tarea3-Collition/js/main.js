var canvasBalls = document.getElementById("canvas-balls");
var contextBalls = canvasBalls.getContext("2d");

var canvasSquare = document.getElementById("canvas-square");
var contextSquares = canvasSquare.getContext("2d");

var firstBallx = canvasBalls.width/2;
var firstBally = canvasBalls.height-30;

var firstSquarex = canvasBalls.width/2;
var firstSquarey = canvasBalls.height-50;

var secondBallx = canvasBalls.width/6;
var secondBally = canvasBalls.height-50;

var secondSquarex = canvasBalls.width/20;
var secondSquarey = canvasBalls.height-70;

var directionFirstx = 2;
var directionFirsty = -2;

var directionFirstSquarex = 2;
var directionFirstSquarey = -2;

var directionSecondx = 2;
var directionSecondy = -2;

var directionSecondSquarex = 2;
var directionSecondSquarey = -2;

var ballRadius = 10;

function drawBall() {
    contextBalls.beginPath();
    contextBalls.arc(firstBallx, firstBally, ballRadius, 0, Math.PI*2);
    contextBalls.fillStyle = "#3B5E13";
    contextBalls.fill();
    contextBalls.closePath();

    contextBalls.beginPath();
    contextBalls.arc(secondBallx, secondBally, ballRadius, 0, Math.PI*2);
    contextBalls.fillStyle = "#912B0F";
    contextBalls.fill();
    contextBalls.closePath();
}

function drawSquare() {
	contextSquares.beginPath();
    contextSquares.rect(firstSquarex, firstSquarey, 50, 50);
    contextSquares.fillStyle = "#3B5E13";
    contextSquares.fill();
    contextSquares.closePath();

    contextSquares.beginPath();
    contextSquares.rect(secondSquarex, secondSquarey, 50, 50);
    contextSquares.fillStyle = "#912B0F";
    contextSquares.fill();
    contextSquares.closePath();
}

function moveBalls() {
    contextBalls.clearRect(0, 0, canvasBalls.width, canvasBalls.height);
    drawBall();

    if(firstBallx + directionFirstx > canvasBalls.width-ballRadius || firstBallx + directionFirstx < ballRadius) {
        directionFirstx = -directionFirstx;
    }
    if(firstBally + directionFirsty > canvasBalls.height-ballRadius || firstBally + directionFirsty < ballRadius) {
        directionFirsty = -directionFirsty;
    }
    
    firstBallx += directionFirstx;
    firstBally += directionFirsty;
    
    if(secondBallx + directionSecondx > canvasBalls.width-ballRadius || secondBallx + directionSecondx < ballRadius) {
        directionSecondx =- directionSecondx;
    }
    if(secondBally + directionSecondy > canvasBalls.height-ballRadius || secondBally + directionSecondy < ballRadius) {
        directionSecondy =- directionSecondy;
    }
    
    secondBallx += directionSecondx;
    secondBally += directionSecondy;

    if (secondBallx + directionSecondx == firstBallx + directionFirstx) {
    	console.log('Balls Collision Detection');
        directionFirstx = -directionFirstx;
        directionSecondx =- directionSecondx;
    }
}

function moveSquares() {
	contextSquares.clearRect(0, 0, canvasSquare.width, canvasSquare.height);
    drawSquare();

    if (firstSquarex > canvasSquare.width-50 || firstSquarex + directionFirstSquarex < 0) {
        directionFirstSquarex =- directionFirstSquarex
    }
    if (firstSquarey > canvasSquare.height-50 || firstSquarey + directionFirstSquarey < 0) {
        directionFirstSquarey =- directionFirstSquarey
    }
    firstSquarex += directionFirstSquarex;
    firstSquarey += directionFirstSquarey;

    if (secondSquarex > canvasSquare.width-50 || secondSquarex + directionSecondSquarex < 0) {
        directionSecondSquarex =- directionSecondSquarex
    }
    if (secondSquarey > canvasSquare.height-50 || secondSquarey + directionSecondSquarey < 0) {
        directionSecondSquarey =- directionSecondSquarey
    }
    secondSquarex += directionSecondSquarex;
    secondSquarey += directionSecondSquarey;

    //if (firstSquarex-20 == secondSquarex+20) {
    //    console.log('Squares Collision Detection')
    //    directionFirstSquarex = -directionFirstSquarex;
    //    directionSecondSquarex =- directionSecondSquarex;
    //}
    //if (firstSquarex+20 == secondSquarex-20) {
    //    console.log('Squares Collision Detection')
    //    directionFirstSquarex = -directionFirstSquarex;
    //    directionSecondSquarex =- directionSecondSquarex;}

    if (secondSquarex < firstSquarex + 50 && firstSquarex < secondSquarex || firstSquarex < secondSquarex + 50 && secondSquarex < firstSquarex) {
        console.log('Squares Collision Detection')
        directionFirstSquarex = -directionFirstSquarex;
        directionSecondSquarex =- directionSecondSquarex;
    }

    if (secondSquarey > firstSquarey + 50 && firstSquarey < secondSquarey) {
        directionFirstSquarey =- directionFirstSquarey;
    }
}

setInterval(moveSquares, 10);
setInterval(moveBalls, 10);