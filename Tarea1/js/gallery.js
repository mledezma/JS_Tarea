// Constructor

/**
 * Basic slider.
 * @constructor
 * @galleryConfig Object Initial Configuration paramet 
 */

Gallery = function (galleryConfig) {
	this.srcArray = galleryConfig.srcArray;
	this.img = galleryConfig.img;
	this.imgAmount = galleryConfig.srcArray.length;
	this.index = 0;
	this.prevBtn = galleryConfig.prevBtn;
	this.nextBtn = galleryConfig.nextBtn;
	this.document = document;
}

// Gallery.Prototype

Gallery.prototype = {
	constructor: Gallery,

	init: function () {

		this.nextBtn.self = this;
		this.prevBtn.self = this;

		this.prevBtn.addEventListener('click', this.goPrev);
		this.nextBtn.addEventListener('click', this.goNext);
	},

	goNext: function () {
		this.self.index++;
		if (this.self.index === this.self.imgAmount) {
			this.self.index = 0;
		}
		this.self.img.src = this.self.srcArray[this.self.index]
		console.log(this.self.index)
	},

	goPrev: function () {
		this.self.index--;
		if (this.self.index < 0) {
			this.self.index = this.self.imgAmount-1;
		}
		this.self.img.src = this.self.srcArray[this.self.index]
		console.log(this.self.index)
	},
}