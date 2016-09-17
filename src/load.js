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

    var promise = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', requestUrl);
      xhr.timeout = 2000;

      xhr.onload = function() {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(this.statusText);
        }
      };
      xhr.onerror = function() {
        reject(this.statusText);
      };
      xhr.ontimeout = function() {
        reject('Loading data has timed out.');
      };

      xhr.send();
    });

    promise.then(function(response) {
      callback(response);
    },
    function(error) {
      handleError(error);
    });
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
