'use strict';

define(function() {
  /**
   *загружает данные с помощью xhr
   * @param {string} requestUrl
   * @param {Object} parameters
   * @param {function} callback
   */
  function load(requestUrl, parameters, callback, onEmptyData) {
    var from = parameters.from || 0;
    var to = parameters.to || Infinity;
    var filter = parameters.filter || 'reviews-all';
    requestUrl += '?from=' + from + '&to=' + to + '&filter=' + filter;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl);

    xhr.onload = function() {
      var data = JSON.parse(this.responseText);
      if(data.length) {
        callback(data);
      } else {
        onEmptyData();
      }
    };
    xhr.onerror = function() {
      console.log('Error: review data is not loaded.');
    };

    xhr.send();
  }

  return {load: load};
});
