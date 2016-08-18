'use strict';

var __jsonpCallback;

window.jsonpCall = function(requestAdress, handlerFunc) {
  __jsonpCallback = handlerFunc;

  var scriptElement = document.createElement('script');
  scriptElement.src = requestAdress;
};

(function() {
  var reviews;
  var addres = 'http://localhost:1506/api/reviews?callback=__jsonpCallback';
  window.jsonpCall(addres, function(data) {
    reviews = data;
  });
});
