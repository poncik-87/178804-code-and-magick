'use strict';

define(function() {
  /**
   *загружает данные с помощью xhr
   * @param {string} requestUrl
   * @param {Object} parameters
   * @param {function} callback
   */
  function load(requestUrl, parameters, callback) {
    var from = parameters.from || 0;
    var to = parameters.to || Infinity;
    var filter = parameters.filter || 'reviews-all';
    requestUrl += '?from=' + from + '&to=' + to + '&filter=' + filter;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl);
    xhr.timeout = 2000;

    xhr.onload = function() {
      if (this.status === 200) {
        callback(JSON.parse(this.responseText));
      } else {
        handleError(this.statusText);
      }
    };
    xhr.onerror = function() {
      handleError(this.statusText);
    };
    xhr.ontimeout = function() {
      handleError('Loading data has timed out.');
    };

    xhr.send();
  }

  /**
   *обработка ошибки загрузки
   * @param {string} message
   */
  function handleError(message) {
    console.log('Error: ' + message);
  }

  return {load: load};
});
