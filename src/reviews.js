'use strict';

/**
 * @param {string} requestAdress
 * @param {function} handlerFunc
 */
window.jsonpCall = function(requestAdress, handlerFunc) {
  window.__jsonpCallback = handlerFunc;
  requestAdress += '__jsonpCallback';

  var scriptElement = document.createElement('script');
  scriptElement.src = requestAdress;
  document.body.appendChild(scriptElement);
};

(function() {
  var reviews;
  var address = 'http://localhost:1506/api/reviews?callback=';

  window.jsonpCall(address, function(data) {
    reviews = data;
    console.log(reviews);
  });
})();


