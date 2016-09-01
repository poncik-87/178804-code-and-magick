'use strict';

module.exports = function(list, filterID) {
  var filteredList;

  switch(filterID) {
    case 'reviews-all' :
      return list;
    case 'reviews-recent' :
      //сортировка по убыванию
      return list.sort(function(a, b) {
        var aDate = a.created || 0;
        var bDate = b.created || 0;

        return bDate - aDate;
      });
    case 'reviews-good' :
      filteredList = list.filter(function(item) {
        return item.rating >= 3;
      });

      //сортировка по убыванию
      return filteredList.sort(function(a, b) {
        var aRating = a.rating || 0;
        var bRating = b.rating || 0;

        return bRating - aRating;
      });
    case 'reviews-bad' :
      filteredList = list.filter(function(item) {
        return item.rating < 3;
      });

      //сортировка по убыванию
      return filteredList.sort(function(a, b) {
        var aRating = a.rating || 0;
        var bRating = b.rating || 0;

        return bRating - aRating;
      });
    case 'reviews-popular' :
      //сортировка по убыванию
      return list.sort(function(a, b) {
        var aUsefulness = a.review_usefulness || 0;
        var bUsefulness = b.review_usefulness || 0;

        return bUsefulness - aUsefulness;
      });
  }

  return list;
};
