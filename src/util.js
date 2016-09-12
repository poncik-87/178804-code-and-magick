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
    },

    /**
     * Наследование через пустой конструктор
     * @param {Object} child
     * @param {Object} parent
     */
    inherit: function(child, parent) {
      var EmptyConstructor = function() {};
      EmptyConstructor.prototype = parent.prototype;
      child.prototype = new EmptyConstructor();
    },

    /**
     * Подмешивание методов объекта
     * @param {Object} toObjectProto
     * @param {Object} fromObjectProto
     * @param {Array <string>} exceptions
     */
    mixin: function(toObjectProto, fromObjectProto, exceptions) {
      var isExceptionsExist = Array.isArray(exceptions) && exceptions.length;

      for(var key in fromObjectProto) {
        if(!isExceptionsExist || exceptions.indexOf(key) < 0) {
          toObjectProto[key] = fromObjectProto[key];
        }
      }
    }
  };

  return ret;
});
