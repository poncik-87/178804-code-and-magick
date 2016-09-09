'use strict';

define(['./util', './domComponent'], function(util, DOMComponent) {
  /**
   *@constant
   *@type {number}
   */
  var IMAGE_SIZE = 124;
  /**
   *@constant
   *@type {number}
   */
  var RATING_STAR_SIZE = 40;

  var reviewTemplateElement = document.querySelector('#review-template');
  var elementToClone;

  if ('content' in reviewTemplateElement) {
    elementToClone = reviewTemplateElement.content.querySelector('.review');
  } else {
    elementToClone = reviewTemplateElement.querySelector('.review');
  }

  /**
   * @class
   * @classdesc Виджет отзыва
   * @param {Object} data
   */
  function Review(data) {
    this.data = data;

    this._quizAnswerhandler = this._quizAnswerhandler.bind(this);
  }

  util.inherit(Review, DOMComponent);

  /**
   *Создание разметки и добавление обработчиков
   */
  Review.prototype.create = function(parentNode) {
    this.element = this._createReviewElement();
    parentNode.appendChild(this.element);

    this._reviewQuizAnswers = this.element.querySelectorAll('.review-quiz-answer');
    this.element.addEventListener('click', this._quizAnswerhandler);
  };

  /**
   *Очистка данных виджета
   */
  Review.prototype.remove = function() {
    this.element.parentNode.removeChild(this.element);

    this.element.removeEventListener(this._quizAnswerhandler);
  };

  /**
   *Создает отображение для отзыва
   * @return {HTMLElement}
   */
  Review.prototype._createReviewElement = function() {
    var reviewElement = elementToClone.cloneNode(true);
    var authorElement = reviewElement.querySelector('.review-author');
    var ratingElement = reviewElement.querySelector('.review-rating');
    var textElement = reviewElement.querySelector('.review-text');

    authorElement.title = this.data.author.name;
    textElement.innerHTML = this.data.description;
    ratingElement.style.width = RATING_STAR_SIZE * this.data.rating + 'px';

    var authorImage = new Image();

    authorImage.onload = function(evt) {
      authorElement.src = evt.target.src;
      authorElement.width = IMAGE_SIZE;
      authorElement.height = IMAGE_SIZE;
    };
    authorImage.onerror = function() {
      reviewElement.classList.add('review-load-failure');
    };

    authorImage.src = this.data.author.picture;

    return reviewElement;
  };

  /**
  * @param {MouseEvent} evt
  */
  Review.prototype._quizAnswerhandler = function(evt) {
    for(var i = 0; i < this._reviewQuizAnswers.length; i++) {
      this._reviewQuizAnswers[i].classList.remove('review-quiz-answer-active');
    }

    evt.target.classList.add('review-quiz-answer-active');
  };

  return Review;
});

