'use strict';

define(['./load', './review'], function(load, Review) {
  /**
   *@constant
   *@type {string}
   */
  var REVIEWS_URL = '/api/reviews';

  /**
   *@constant
   *@type {number}
   */
  var PAGE_SIZE = 3;

  var element = document.querySelector('.reviews-list');
  var filterElement = document.querySelector('.reviews-filter');
  var controlMoreElement = document.querySelector('.reviews-controls-more');

  var currentPage = 0;
  var currentFilter;

  controlMoreElement.classList.remove('invisible');
  loadNextPage();

  controlMoreElement.addEventListener('click', loadNextPage);

  filterElement.addEventListener('change', function(evt) {
    if(evt.target.type === 'radio') {
      element.innerHTML = '';
      currentFilter = evt.target.id;
      currentPage = 0;
      loadNextPage();
    }
  }, true);

  /**
   *Отображает все отзывы
   * @param {Object} data
   */
  function createReviewElementList(reviews) {
    reviews.forEach(function(reviewItem) {
      var review = new Review(reviewItem);
      element.appendChild(review.element);
    });

    disableFilterElement(false);
  }

  /**
   *Скрывает кнопку подгрузки отзывов
   */
  function hideControlMore() {
    controlMoreElement.classList.add('invisible');
  }

  /**
   *Загрузка следующей страницы отзывов
   */
  function loadNextPage() {
    var params = {
      from: currentPage * PAGE_SIZE,
      to: currentPage * PAGE_SIZE + PAGE_SIZE,
      filter: currentFilter
    };

    disableFilterElement(true);

    load.load(REVIEWS_URL, params, createReviewElementList, hideControlMore);

    currentPage++;
  }

  /**
   *Назначает контролам фильтра активность
   * @param {bool} enabled
   */
  function disableFilterElement(disabled) {
    for(var i = 0; i < filterElement.elements.length; i++) {
      filterElement.elements[i].disabled = disabled;
    }
  }
});
