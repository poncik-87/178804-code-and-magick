'use strict';

var __jsonpCallback;
var reviews;
var addres = 'http://localhost:1506/api/reviews?callback=__jsonpCallback';
jsonpCall(addres, function(data) {
  reviews = data;
});

function jsonpCall(requestAdress, handlerFunc) {
  __jsonpCallback = function(data) {
    handlerFunc(data);
  }

  var scriptElement = document.createElement("script");
  scriptElement.src = requestAdress;
}
