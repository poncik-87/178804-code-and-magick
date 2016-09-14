'use strict';

define(['./util', './domComponent'], function(util, DOMComponent) {
  /**
   *@constant
   *@type {string}
   */
  var INVISIBLE = 'invisible';

  /**
   *@constant
   *@type {string}
   */
  var HASH_PHOTO = '#photo';

  /**
   * @class
   * @classdesc Виджет галереи скриншотов
   * @param {Array <string>} pictures
   */
  function Gallery(pictures) {
    if (Array.isArray(pictures)) {
      this.pictures = pictures;
    } else {
      this.pictures = [];
    }

    this.activePicture = 0;
  }

  util.inherit(Gallery, DOMComponent);

  /**
   * Обработка создания виджета
   */
  Gallery.prototype.create = function() {
    this.hide = this.hide.bind(this);
    this._onControlLeftClicked = this._onControlLeftClicked.bind(this);
    this._onControlRightClicked = this._onControlRightClicked.bind(this);
    this._onHashChange = this._onHashChange.bind(this);

    this.element = document.querySelector('.overlay-gallery');
    this.controlLeftElement = document.querySelector('.overlay-gallery-control-left');
    this.controlRightElement = document.querySelector('.overlay-gallery-control-right');
    this.previewNumberCurrentElement = document.querySelector('.preview-number-current');
    this.previewNumberTotalElement = document.querySelector('.preview-number-total');
    this.closeElement = document.querySelector('.overlay-gallery-close');
    this.previewElement = document.querySelector('.overlay-gallery-preview');

    this.previewNumberTotalElement.innerHTML = this.pictures.length;

    this.closeElement.addEventListener('click', this.hide);
    this.controlLeftElement.addEventListener('click', this._onControlLeftClicked);
    this.controlRightElement.addEventListener('click', this._onControlRightClicked);
    window.addEventListener('hashchange', this._onHashChange);
  };

  /**
   * Обработка удаления виджета
   */
  Gallery.prototype.remove = function() {
    this.closeElement.removeEventListener('click', this.hide);
    this.controlLeftElement.removeEventListener('click', this._onControlLeftClicked);
    this.controlRightElement.removeEventListener('click', this._onControlRightClicked);
    window.removeEventListener('hashchange', this._onHashChange);

    this.element = null;
    this.controlLeftElement = null;
    this.controlRightElement = null;
    this.previewNumberCurrentElement = null;
    this.previewNumberTotalElement = null;
    this.closeElement = null;
    this.previewElement = null;

    this.hide = null;
    this._onControlLeftClicked = null;
    this._onControlRightClicked = null;
    this._onHashChange = null;
  };

  /**
   * Показывает виджет
   */
  Gallery.prototype.show = function() {
    this.element.classList.remove(INVISIBLE);
    this.setActivePicture();
  };

  /**
   * Скрывает виджет
   */
  Gallery.prototype.hide = function() {
    this.element.classList.add(INVISIBLE);
    location.hash = '';
  };

  /**
   * Назначает картинку для отображения
   */
  Gallery.prototype.setActivePicture = function() {
    var idx = this._getPictureIndex(location.hash);

    if(idx >= 0 && idx < this.pictures.length) {
      this.activePicture = idx;

      var currentPicture = this.pictures[idx];

      var prevImage = this.previewElement.querySelector('img');
      if(prevImage) {
        this.previewElement.removeChild(prevImage);
      }

      var image = new Image();
      image.onload = (function(evt) {
        this.previewElement.appendChild(evt.target);
      }).bind(this);
      image.src = currentPicture;

      this.previewNumberCurrentElement.innerHTML = idx + 1;

      this._setControlsVisible();
    }else {
      this.hide();
    }
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
      location.hash = HASH_PHOTO + util.getPathname(this.pictures[this.activePicture - 1]);
    }
  };

  /**
   * Листает картинку вправо
   */
  Gallery.prototype._onControlRightClicked = function() {
    if(this.activePicture < this.pictures.length - 1) {
      location.hash = HASH_PHOTO + util.getPathname(this.pictures[this.activePicture + 1]);
    }
  };

  /**
   * Обработка изменения хэша адресной строки
   */
  Gallery.prototype._onHashChange = function() {
    this.checkHash();
  };

  /**
   * Обработка значения хэша
   */
  Gallery.prototype.checkHash = function() {
    if(location.hash.match(/#photo\/(\S+)/)) {
      this.show();
    } else {
      this.hide();
    }
  };

  /**
   * Получить индекс картинки в массиве картинок
   * @param {string} path
   * @return {number}
   */
  Gallery.prototype._getPictureIndex = function(path) {
    var idx = -1;

    if (path.indexOf(HASH_PHOTO) === 0) {
      path = path.substr(HASH_PHOTO.length);
    }

    for(var i = 0; i < this.pictures.length; i++) {
      if(util.getPathname(this.pictures[i]) === path) {
        idx = i;
        break;
      }
    }

    return idx;
  };

  return Gallery;
});
