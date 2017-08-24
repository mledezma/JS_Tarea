var alpha = 0;
var container = document.getElementById('container');
var itemContainer = container.getElementsByClassName('item-container')[0];
var items = 5;
var counter = 0;
var itemsCounter = [];
var containerWidth = 800;
var containerHeight = 800;

var r1 = containerWidth - 300;
var r2 = containerHeight - 200;
var itemDegreeSeparation = 360/(items-10);

function init() {
  for (var i = 0; i < items; i++) {
    callImgs();
  }
  animate();
};

function callImgs() {
  var div = document.createElement('div');
  div.classList.add('box');
  itemContainer.appendChild(div);
  itemsCounter.push(div);
}

function animate() {
  alpha += 0.5;
  for (var i = 0; i < itemsCounter.length; i++) {
    var itemDeg = alpha + (itemDegreeSeparation * i)
    var sin = 0.5+(Math.sin(degToRad(itemDeg))*0.5)
    var cos = 0.5+(Math.cos(degToRad(itemDeg))*0.5)

    var itemObject = itemsCounter[i];
    var yPos = sin * r1;
    var xPos = cos * r2;
    itemObject.style.left = xPos + 'px';
    itemObject.style.top = yPos + 'px';
    itemObject.style.zIndex = r2 * yPos;

    if (yPos < containerHeight/2) {
      itemObject.style.transition = 'all 1s linear';
      itemObject.style.transform = 'scale(0.5,0.5)';
    }else if(yPos > containerHeight/2){
      itemObject.style.transition = 'all 1s linear';
      itemObject.style.transform = 'scale(1,1)';
    }

  }
  requestAnimationFrame(animate);
}

function degToRad(input) {
  return input*(Math.PI/180);
}

init();
