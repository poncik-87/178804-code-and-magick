'use strict';

define(function() {
  /**
  *@constant
  *@type {number}
  */
  var ELEMENT_INDENT = 100;

  var throttleBlock = false;

  var ret = {
    /**
    * @param {HTMLElement} element
    * @return {bool}
    */
    isElementVisible: function(element) {
      var elementPosition = element.getBoundingClientRect();
      return elementPosition.bottom + ELEMENT_INDENT > 0 && elementPosition.top - ELEMENT_INDENT < window.innerHeight;
    },

    throttle: function(callback, delay, context) {
      if(!throttleBlock) {
        callback.call(context);

        throttleBlock = true;
        setTimeout(function() {
          throttleBlock = false;
        }, delay);
      }
    }
  };

  return ret;
});
