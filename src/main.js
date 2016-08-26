'use strict';

define(['./form', './game', './gallery', './reviews'], function(form, Game, Gallery) {
  var game = new Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(Game.Verdict.INTRO);

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

  var pictures = [];
  var photogalleryElement = document.querySelector('.photogallery');
  var photogalleryImageElements = photogalleryElement.querySelectorAll('.photogallery-image img');
  var i;

  for(i = 0; i < photogalleryImageElements.length; i++) {
    pictures.push(photogalleryImageElements[i].src);
    photogalleryImageElements[i].setAttribute('data-idx', i.toString());
  }

  var gallery = new Gallery(pictures);

  for(i = 0; i < photogalleryImageElements.length; i++) {
    photogalleryImageElements[i].onclick = function(evt) {
      var index = Number(evt.target.getAttribute('data-idx'));
      gallery.show(index);
    };
  }
});
