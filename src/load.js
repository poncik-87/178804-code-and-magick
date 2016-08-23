'use strict';

define(function() {
  /**
   *загружает данные с помощью jsonp
   * @param {string} requestUrl
   * @param {function} callback
   */
  function load(requestUrl, callback) {
    window.__jsonpCallback = callback;

    var scriptElement = document.createElement('script');
    requestUrl += '__jsonpCallback';
    scriptElement.src = requestUrl;
    document.body.appendChild(scriptElement);
  }

  return load;
});
