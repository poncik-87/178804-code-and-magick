'use strict';

module.exports = function(list, filterID) {
  /**
   * Вариант фильтра
   * @enum {string}
   */
  var Filter = {
    REVIEWS_ALL: 'reviews-all',
    REVIEWS_RECENT: 'reviews-recent',
    REVIEWS_GOOD: 'reviews-good',
    REVIEWS_BAD: 'reviews-bad',
    REVIEWS_POPILAR: 'reviews-popular'
  };

  var filteredList;

  switch(filterID) {
    case Filter.REVIEWS_ALL :
      filteredList = list;
      break;
    case Filter.REVIEWS_RECENT :
      filteredList = list.sort(function(a, b) {
        return descendingSortNumbers(a.created, b.created);
      });
      break;
    case Filter.REVIEWS_GOOD :
      filteredList = list.filter(
        function(item) {
          return item.rating >= 3;
        }).sort(
        function(a, b) {
          return descendingSortNumbers(a.rating, b.rating);
        });
      break;
    case Filter.REVIEWS_BAD :
      filteredList = list.filter(
        function(item) {
          return item.rating < 3;
        }).sort(
        function(a, b) {
          return descendingSortNumbers(a.rating, b.rating);
        });
      break;
    case Filter.REVIEWS_POPILAR :
      filteredList = list.sort(function(a, b) {
        return descendingSortNumbers(a.review_usefulness, b.review_usefulness);
      });
  }

  /**
   * @param {number} a
   * @param {number} b
   */
  function descendingSortNumbers(a, b) {
    a = a || 0;
    b = b || 0;

    return b - a;
  }

  return filteredList;
};
