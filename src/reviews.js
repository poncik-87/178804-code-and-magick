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

  var currentPage;
  var currentFilter;

  loadNextPage(true);

  controlMoreElement.addEventListener('click', function() {
    loadNextPage(false);
  });

  filterElement.addEventListener('change', function(evt) {
    if(evt.target.type === 'radio') {
      currentFilter = evt.target.id;
      loadNextPage(true);
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
  }

  /**
   *Скрывает кнопку подгрузки отзывов
   * @param {bool} hide
   */
  function hideControlMore(hide) {
    if(hide) {
      controlMoreElement.classList.add('invisible');
    } else {
      controlMoreElement.classList.remove('invisible');
    }
  }

  /**
   *Загрузка данных для следующей страницы
   * @param {bool} reset
   */
  function loadNextPage(reset) {
    if(reset) {
      element.innerHTML = '';
      currentPage = 0;
      hideControlMore(false);
    }

    var params = {
      from: currentPage * PAGE_SIZE,
      to: currentPage * PAGE_SIZE + PAGE_SIZE,
      filter: currentFilter
    };

    disableFilterElement(true);

    load.load(REVIEWS_URL, params, onLoad);
  }

  /**
   *Назначает контролам фильтра активность
   * @param {bool} disabled
   */
  function disableFilterElement(disabled) {
    for(var i = 0; i < filterElement.elements.length; i++) {
      filterElement.elements[i].disabled = disabled;
    }
  }

  /**
   *Обработка загруженных данных
   * @param {Object} data
   */
  function onLoad(data) {
    if(data.length) {
      createReviewElementList(data);
      currentPage++;
    } else {
      hideControlMore(true);
    }

    disableFilterElement(false);
  }
});
