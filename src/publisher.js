'use strict';

define(function() {
  /**
   * @class
   * @classdesc реализация механизма pub/sub
   */
  function Publisher() {
    this._subscribers = [];
  }

  /**
   * Очистка объекта
   */
  Publisher.prototype.remove = function() {
    this._subscribers = [];
  };

  /**
   * Добавление подписчика
   * @param { {param: callback[,param2: callback2 ...]} } subscriber
   */
  Publisher.prototype.addSubscriber = function(subscriber) {
    this._subscribers.push(subscriber);
  };

  /**
   * Удаление подписчика
   * @param { Object } subscriber
   */
  Publisher.prototype.removeSubscriber = function(subscriber) {
    var idx = this._subscribers.indexOf(subscriber);
    if(idx >= 0) {
      this._subscribers.splice(idx, 1);
    }
  };

  /**
   * Вызов колбека подписчиков
   * @param { string } param
   */
  Publisher.prototype._subscribersCall = function(param) {
    this._subscribers.forEach(function(subscriber) {
      if(typeof subscriber[param] === 'function') {
        subscriber[param]();
      }
    });
  };

  return Publisher;
});
