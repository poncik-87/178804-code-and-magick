'use strict';

define(function() {
  /**
  *@constant
  *@type {number}
  */
  var ELEMENT_INDENT = 100;


  var ret = {
    /**
    * @param {HTMLElement} element
    * @return {bool}
    */
    isElementVisible: function(element) {
      var elementPosition = element.getBoundingClientRect();
      return elementPosition.bottom + ELEMENT_INDENT > 0 && elementPosition.top - ELEMENT_INDENT < window.innerHeight;
    },

    /**
    * @param {function} handler
    * @param {number} delay
    * @return {function}
    */
    throttle: function(handler, delay) {
      var throttleBlock = false;

      /**
       * Сбрасывает флаг по таймауту
       */
      function onTimeout() {
        throttleBlock = false;
      }

      return function() {
        if(!throttleBlock) {
          handler();

          throttleBlock = true;
          setTimeout(onTimeout, delay);
        }
      };
    }
  };

  return ret;
});
