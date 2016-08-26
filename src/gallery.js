'use strict';

define(function() {
  /**
   * @class
   * @classdesc Виджет галереи скриншотов
   * @param {Array} pictures
   */
  function Gallery(pictures) {
    if (Array.isArray(pictures)) {
      this.pictures = pictures;
    } else {
      this.pictures = [];
    }

    this.activePicture = 0;
    this.overlayGalleryElement = document.querySelector('.overlay-gallery');
    this.overlayGalleryControlLeftElement = document.querySelector('.overlay-gallery-control-left');
    this.overlayGalleryControlRightElement = document.querySelector('.overlay-gallery-control-right');
    this.previewNumberCurrentElement = document.querySelector('.preview-number-current');
    this.previewNumberTotalElement = document.querySelector('.preview-number-total');
    this.overlayGalleryCloseElement = document.querySelector('.overlay-gallery-close');
    this.overlayGalleryPreviewElement = document.querySelector('.overlay-gallery-preview');
  }

  /**
   * @param {number} index
   */
  Gallery.prototype.show = function(index) {
    this.overlayGalleryElement.classList.remove('invisible');

    var self = this;

    this.overlayGalleryCloseElement.onclick = function() {
      self.hide();
    };

    this.overlayGalleryControlLeftElement.onclick = function() {
      if(self.activePicture > 0) {
        self.setActivePicture(self.activePicture - 1);
      }
    };

    this.overlayGalleryControlRightElement.onclick = function() {
      if(self.activePicture < self.pictures.length - 1) {
        self.setActivePicture(self.activePicture + 1);
      }
    };

    this.setActivePicture(index);
    this.previewNumberTotalElement.innerHTML = this.pictures.length;
  };

  Gallery.prototype.hide = function() {
    this.overlayGalleryElement.classList.add('invisible');

    this.overlayGalleryCloseElement.onclick = null;
    this.overlayGalleryControlLeftElement.onclick = null;
    this.overlayGalleryControlRightElement.onclick = null;
  };

  /**
   * @param {number} index
   */
  Gallery.prototype.setActivePicture = function(index) {
    if(index < 0 || index >= this.pictures.length) {
      return;
    }

    this.activePicture = index;

    var currentPicture = this.pictures[index];

    var prevImage = this.overlayGalleryPreviewElement.querySelector('img');
    if(prevImage) {
      this.overlayGalleryPreviewElement.removeChild(prevImage);
    }

    var self = this;

    var image = new Image();
    image.onload = function(evt) {
      self.overlayGalleryPreviewElement.appendChild(evt.target);
    };
    image.src = currentPicture;

    this.previewNumberCurrentElement.innerHTML = index + 1;
  };

  return Gallery;
});
