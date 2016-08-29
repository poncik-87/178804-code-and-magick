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
    this.Element = document.querySelector('.overlay-gallery');
    this.ControlLeftElement = document.querySelector('.overlay-gallery-control-left');
    this.ControlRightElement = document.querySelector('.overlay-gallery-control-right');
    this.previewNumberCurrentElement = document.querySelector('.preview-number-current');
    this.previewNumberTotalElement = document.querySelector('.preview-number-total');
    this.CloseElement = document.querySelector('.overlay-gallery-close');
    this.PreviewElement = document.querySelector('.overlay-gallery-preview');

    this.previewNumberTotalElement.innerHTML = this.pictures.length;
  }

  /**
   * Показывает виджет
   * @param {number} index
   */
  Gallery.prototype.show = function(index) {
    this.Element.classList.remove('invisible');

    this.CloseElement.onclick = this.hide.bind(this);

    this.ControlLeftElement.onclick = (function() {
      if(this.activePicture > 0) {
        this.setActivePicture(this.activePicture - 1);
      }

      this._setControlsVisible();
    }).bind(this);

    this.ControlRightElement.onclick = (function() {
      if(this.activePicture < this.pictures.length - 1) {
        this.setActivePicture(this.activePicture + 1);
      }

      this._setControlsVisible();
    }).bind(this);

    this.setActivePicture(index);
    this._setControlsVisible();
  };

  /**
   * Скрывает виджет
   */
  Gallery.prototype.hide = function() {
    this.Element.classList.add('invisible');

    this.CloseElement.onclick = null;
    this.ControlLeftElement.onclick = null;
    this.ControlRightElement.onclick = null;
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

    var prevImage = this.PreviewElement.querySelector('img');
    if(prevImage) {
      this.PreviewElement.removeChild(prevImage);
    }

    var image = new Image();
    image.onload = (function(evt) {
      this.PreviewElement.appendChild(evt.target);
    }).bind(this);
    image.src = currentPicture;

    this.previewNumberCurrentElement.innerHTML = index + 1;
  };

  /**
   * Назначает отображение управляющих кнопок
   */
  Gallery.prototype._setControlsVisible = function() {
    if(this.activePicture === 0) {
      this.ControlLeftElement.classList.add('invisible');
    } else {
      this.ControlLeftElement.classList.remove('invisible');
    }
    if(this.activePicture === this.pictures.length - 1) {
      this.ControlRightElement.classList.add('invisible');
    } else {
      this.ControlRightElement.classList.remove('invisible');
    }
  }

  return Gallery;
});
