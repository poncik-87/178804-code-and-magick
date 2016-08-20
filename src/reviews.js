'use strict';

/**
 * @param {string} requestAdress
 * @param {function} handlerFunc
 */
window.jsonpCall = function(requestAdress, handlerFunc) {
  window.__jsonpCallback = handlerFunc;
  requestAdress += '__jsonpCallback';

  var scriptElement = document.createElement('script');
  scriptElement.src = requestAdress;
  document.body.appendChild(scriptElement);
};

(function() {
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

  var reviews;
  var address = 'http://localhost:1506/api/reviews?callback=';
  var reviewTemplateElement = document.querySelector('#review-template');
  var elementToClone;
  var reviewListElement = document.querySelector('.reviews-list');
  var reviewsFilterElement = document.querySelector('.reviews-filter');

  if ('content' in reviewTemplateElement) {
    elementToClone = reviewTemplateElement.content.querySelector('.review');
  } else {
    elementToClone = reviewTemplateElement.querySelector('.review');
  }

  reviewsFilterElement.classList.add('invisible');

  window.jsonpCall(address, createReviewElementList);

  /**
   *Отображает все отзывы
   * @param {Object} data
   */
  function createReviewElementList(data) {
    reviews = data;
    reviews.forEach(function(review) {
      reviewListElement.appendChild(createReviewElement(review));
    });

    reviewsFilterElement.classList.remove('invisible');
  }

  /**
   *Создает отображение для отзыва
   * @param {Object} review
   * @return {HTMLElement}
   */
  function createReviewElement(review) {
    var reviewElement = elementToClone.cloneNode(true);
    var authorElement = reviewElement.querySelector('.review-author');
    var ratingElement = reviewElement.querySelector('.review-rating');
    var textElement = reviewElement.querySelector('.review-text');

    authorElement.title = review.author.name;
    textElement.innerHTML = review.description;
    ratingElement.style.width = RATING_STAR_SIZE * review.rating + 'px';

    var authorImage = new Image();

    authorImage.onload = function(evt) {
      authorElement.src = evt.target.src;
      authorElement.width = IMAGE_SIZE;
      authorElement.height = IMAGE_SIZE;
    };
    authorImage.onerror = function() {
      reviewElement.classList.add('review-load-failure');
    };

    authorImage.src = review.author.picture;

    return reviewElement;
  }
})();
