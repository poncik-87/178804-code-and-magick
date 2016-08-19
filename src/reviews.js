'use strict';

window.jsonpCall = function(requestAdress, handlerFunc) {
  window.__jsonpCallback = handlerFunc;

  var scriptElement = document.createElement('script');
  scriptElement.src = requestAdress;
};

(function() {
  var reviews;
  var addres = 'http://localhost:1506/api/reviews?callback=__jsonpCallback';
  var handler = function(data) {
    reviews = data;
    console.log(reviews);
  };

  window.jsonpCall(addres, handler);
})();


