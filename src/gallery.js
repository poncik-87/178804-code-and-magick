'use strict';

define(['./util', './domComponent'], function(util, DOMComponent) {
  /**
   *@constant
   *@type {string}
   */
  var INVISIBLE = 'invisible';

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
    this.element = document.querySelector('.overlay-gallery');
    this.controlLeftElement = document.querySelector('.overlay-gallery-control-left');
    this.controlRightElement = document.querySelector('.overlay-gallery-control-right');
    this.previewNumberCurrentElement = document.querySelector('.preview-number-current');
    this.previewNumberTotalElement = document.querySelector('.preview-number-total');
    this.closeElement = document.querySelector('.overlay-gallery-close');
    this.previewElement = document.querySelector('.overlay-gallery-preview');

    this.previewNumberTotalElement.innerHTML = this.pictures.length;

    this.remove = this.remove.bind(this);
    this._onControlLeftClicked = this._onControlLeftClicked.bind(this);
    this._onControlRightClicked = this._onControlRightClicked.bind(this);
  }

  util.inherit(Gallery, DOMComponent);

  /**
   * Показывает виджет
   * @param {number} index
   */
  Gallery.prototype.create = function(index) {
    this.element.classList.remove(INVISIBLE);

    this.closeElement.onclick = this.remove;
    this.controlLeftElement.onclick = this._onControlLeftClicked;
    this.controlRightElement.onclick = this._onControlRightClicked;

    this.setActivePicture(index);
    this._setControlsVisible();
  };

  /**
   * Скрывает виджет
   */
  Gallery.prototype.remove = function() {
    this.element.classList.add(INVISIBLE);

    this.closeElement.onclick = null;
    this.controlLeftElement.onclick = null;
    this.controlRightElement.onclick = null;
  };

  /**
   * Назначает картинку для отображения
   * @param {number} index
   */
  Gallery.prototype.setActivePicture = function(index) {
    if(index < 0 || index >= this.pictures.length) {
      return;
    }

    this.activePicture = index;

    var currentPicture = this.pictures[index];

    var prevImage = this.previewElement.querySelector('img');
    if(prevImage) {
      this.previewElement.removeChild(prevImage);
    }

    var image = new Image();
    image.onload = (function(evt) {
      this.previewElement.appendChild(evt.target);
    }).bind(this);
    image.src = currentPicture;

    this.previewNumberCurrentElement.innerHTML = index + 1;
  };

  /**
   * Назначает отображение управляющих кнопок
   */
  Gallery.prototype._setControlsVisible = function() {
    if(this.activePicture === 0) {
      this.controlLeftElement.classList.add(INVISIBLE);
    } else {
      this.controlLeftElement.classList.remove(INVISIBLE);
    }
    if(this.activePicture === this.pictures.length - 1) {
      this.controlRightElement.classList.add(INVISIBLE);
    } else {
      this.controlRightElement.classList.remove(INVISIBLE);
    }
  };

  /**
   * Листает картинку влево
   */
  Gallery.prototype._onControlLeftClicked = function() {
    if(this.activePicture > 0) {
      this.setActivePicture(this.activePicture - 1);
    }

    this._setControlsVisible();
  };

  /**
   * Листает картинку вправо
   */
  Gallery.prototype._onControlRightClicked = function() {
    if(this.activePicture < this.pictures.length - 1) {
      this.setActivePicture(this.activePicture + 1);
    }

    this._setControlsVisible();
  };

  return Gallery;
});
