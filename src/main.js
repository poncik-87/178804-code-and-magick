'use strict';

define(['./util', './form', './game', './gallery', './reviews'], function(util, form, Game, Gallery) {

  var game = initGame();
  initForm();
  initGallery();

  /**
   * инициализация модуля game
   * @return {Game}
   */
  function initGame() {
    var newGame = new Game(document.querySelector('.demo'));
    newGame.initializeLevelAndStart();
    newGame.setGameStatus(Game.Verdict.INTRO);

    return newGame;
  }

  /**
   * инициализация модуля form
   */
  function initForm() {
    var formOpenButton = document.querySelector('.reviews-controls-new');

    /** @param {MouseEvent} evt */
    formOpenButton.onclick = function(evt) {
      evt.preventDefault();

      form.open(function() {
        game.setGameStatus(Game.Verdict.PAUSE);
        game.setDeactivated(true);
      });
    };

    form.onClose = function() {
      game.setDeactivated(false);
    };
  }

  /**
   * инициализация модуля gallery
   */
  function initGallery() {
    var pictures = [];
    var photogalleryElement = document.querySelector('.photogallery');
    var photogalleryImageElements = photogalleryElement.querySelectorAll('.photogallery-image img');
    var i;

    for(i = 0; i < photogalleryImageElements.length; i++) {
      pictures.push(photogalleryImageElements[i].src);
      photogalleryImageElements[i].setAttribute('data-idx', i.toString());
    }

    var gallery = new Gallery(pictures);
    gallery.create();

    for(i = 0; i < photogalleryImageElements.length; i++) {
      photogalleryImageElements[i].onclick = imageElementClicked;
    }

    gallery.checkHash();

    /**
     * Вставляет в хэш адресной строки картинку
     */
    function imageElementClicked() {
      location.hash = '#photo' + util.getPathname(this.src);
    }
  }
});
