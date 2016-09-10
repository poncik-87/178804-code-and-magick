'use strict';

define(['./load', './review', './ReviewData'], function(load, Review, ReviewData) {
  /**
   *@constant
   *@type {string}
   */
  var REVIEWS_URL = '/api/reviews';

  /**
   *@constant
   *@type {string}
   */
  var REVIEWS_CURRENT_FILTER = 'reviewsCurrentFilter';

  /**
   *@constant
   *@type {number}
   */
  var PAGE_SIZE = 3;

  var element = document.querySelector('.reviews-list');
  var filterElement = document.querySelector('.reviews-filter');
  var controlMoreElement = document.querySelector('.reviews-controls-more');

  var currentPage;
  var reviewList = [];

  loadNextPage(true);

  controlMoreElement.addEventListener('click', function() {
    loadNextPage(false);
  });

  filterElement.addEventListener('change', function(evt) {
    if(evt.target.type === 'radio') {
      localStorage.setItem(REVIEWS_CURRENT_FILTER, evt.target.id);
      loadNextPage(true);
    }
  }, true);

  /**
   *Отображает все отзывы
   * @param {Array <Object>} data
   */
  function createReviewElementList(data) {
    data.forEach(function(dataItem) {
      var review = new Review(new ReviewData(dataItem));
      review.create(element);

      reviewList.push(review);
    });
  }

  /**
   *Удаляет все отзывы
   */
  function removeReviewElementList() {
    reviewList.forEach(function(review) {
      review.remove();
    });

    reviewList.splice(0, reviewList.length);
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
    var currentFilter = localStorage.getItem(REVIEWS_CURRENT_FILTER);

    if(reset) {
      removeReviewElementList();
      currentPage = 0;
      hideControlMore(false);

      if(currentFilter !== null) {
        var currentFilterElement = document.getElementById(currentFilter);
        if(currentFilterElement !== null) {
          currentFilterElement.checked = true;
        }
      }
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
   * @param {Array <Object>} data
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
