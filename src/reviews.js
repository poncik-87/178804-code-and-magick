'use strict';

define(['./load', './review'], function(load, review) {
  /**
   *@constant
   *@type {string}
   */
  var REVIEWS_URL = 'http://localhost:1506/api/reviews?callback=';

  var reviewListElement = document.querySelector('.reviews-list');
  var reviewsFilterElement = document.querySelector('.reviews-filter');

  reviewsFilterElement.classList.add('invisible');

  load.load(REVIEWS_URL, createReviewElementList);

  /**
   *Отображает все отзывы
   * @param {Object} data
   */
  function createReviewElementList(reviews) {
    reviews.forEach(function(reviewItem) {
      reviewListElement.appendChild(review.createReviewElement(reviewItem));
    });

    reviewsFilterElement.classList.remove('invisible');
  }
});
