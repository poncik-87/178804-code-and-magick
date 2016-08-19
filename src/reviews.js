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

  var reviews;
  var address = 'http://localhost:1506/api/reviews?callback=';
  var templateElement = document.querySelector('#review-template');
  var elementToClone;
  var reviewListElement = document.querySelector('.reviews-list');

  window.jsonpCall(address, function(data) {
    var reviewsFilter = document.querySelector('.reviews-filter');

    if ('content' in templateElement) {
      elementToClone = templateElement.content.querySelector('.review');
    } else {
      elementToClone = templateElement.querySelector('.review');
    }

    reviewsFilter.classList.add('invisible');

    reviews = data;
    reviews.forEach(function(review) {
      createReviewElement(review);
    });

    reviewsFilter.classList.remove('invisible');
  });

  /**
   *Создает разметку для отзыва по template элементу разметки
   * @param {Object} review
   */
  function createReviewElement(review) {
    var reviewElement = elementToClone.cloneNode(true);
    var author = reviewElement.querySelector('.review-author');
    var rating = reviewElement.querySelector('.review-rating');
    var text = reviewElement.querySelector('.review-text');

    author.title = review.author.name;
    text.innerHTML = review.description;

    var authorImage = new Image();

    authorImage.onload = function(evt) {
      author.src = evt.target.src;
      author.width = IMAGE_SIZE;
      author.height = IMAGE_SIZE;
    };
    authorImage.onerror = function() {
      reviewElement.classList.add('review-load-failure');
    };

    authorImage.src = review.author.picture;

    reviewListElement.appendChild(reviewElement);

    rating.style.width *= review.rating;

    return reviewElement;
  }
})();
