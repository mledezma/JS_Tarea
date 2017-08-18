var galleryConfig = {
	srcArray: ['img/animal1.jpg', 'img/animal2.jpg', 'img/animal3.jpg', 'img/animal4.jpg', 'img/animal5.jpg', 'img/animal6.jpg', 'img/animal7.jpg', 'img/animal8.jpg' ,'img/animal9.jpg' ,'img/animal10.jpg'],
	img: document.getElementById('imgContainer'),
	prevBtn: document.getElementById('prevBtn'),
	nextBtn: document.getElementById('nextBtn'),
}

var gallery = new Gallery(galleryConfig);
gallery.init()
console.log(gallery);
