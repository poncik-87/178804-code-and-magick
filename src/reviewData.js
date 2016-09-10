'use strict';

define(function() {
  /**
   * @class
   * @classdesc Обертка данных отзыва
   * @param {Object} data
   */
  function ReviewData(data) {
    this._authorName = data.author.name;
    this._authorPicture = data.author.picture;
    this._created = data.created;
    this._description = data.description;
    this._rating = data.rating;
    this._usefulness = data.review_usefulness;
    this._quizAnswer = '';
    this._subscribers = [];
  }

  /**
   * Очистка объекта
   */
  ReviewData.prototype.remove = function() {
    this._subscribers.splice(0, this._subscribers.length);
  };

  /**
   * Добавление подписчика
   * @param { {param: callback[,param2: callback2 ...]} } subscriber
   */
  ReviewData.prototype.addSubscriber = function(subscriber) {
    this._subscribers.push(subscriber);
  };

  /**
   * Удаление подписчика
   * @param { Object } subscriber
   */
  ReviewData.prototype.removeSubscriber = function(subscriber) {
    var idx = this._subscribers.indexOf(subscriber);
    if(idx >= 0) {
      this._subscribers.splice(idx, 1);
    }
  };

  /**
   * Вызов колбека подписчиков
   * @param { string } param
   */
  ReviewData.prototype._subscribersCall = function(param) {
    this._subscribers.forEach(function(subscriber) {
      if(subscriber[param]) {
        subscriber[param]();
      }
    });
  };

  /**
   * Получение данных об авторе
   */
  ReviewData.prototype.getAuthorName = function() {
    return this._authorName;
  };

  /**
   * Получение картинки автора
   */
  ReviewData.prototype.getAuthorPicture = function() {
    return this._authorPicture;
  };

  /**
   * Получение данных о дате создания
   */
  ReviewData.prototype.getCreated = function() {
    return this._created;
  };

  /**
   * Получение данных об описании
   */
  ReviewData.prototype.getDescription = function() {
    return this._description;
  };

  /**
   * Получение данных о рейтинге
   */
  ReviewData.prototype.getRating = function() {
    return this._rating;
  };

  /**
   * Получение данных о полезности отзыва
   */
  ReviewData.prototype.getUsefulness = function() {
    return this._usefulness;
  };

  /**
   * Получение данных об оценке отзыва пользователем
   */
  ReviewData.prototype.getQuizAnswer = function() {
    return this._quizAnswer;
  };

  /**
   * @param {string} authorName
   */
  ReviewData.prototype.setAuthorName = function(authorName) {
    this._authorName = authorName;

    this._subscribersCall('authorName');
  };

  /**
   * @param {string} authorPicture
   */
  ReviewData.prototype.setAuthorPicture = function(authorPicture) {
    this._authorPicture = authorPicture;

    this._subscribersCall('authorPicture');
  };

  /**
   * @param {string} created
   */
  ReviewData.prototype.setCreated = function(created) {
    this._author = created;

    this._subscribersCall('created');
  };

  /**
   * @param {string} description
   */
  ReviewData.prototype.setDescription = function(description) {
    this._description = description;

    this._subscribersCall('description');
  };

  /**
   * @param {string} rating
   */
  ReviewData.prototype.setRating = function(rating) {
    this._rating = rating;

    this._subscribersCall('rating');
  };

  /**
   * @param {string} usefulness
   */
  ReviewData.prototype.setUsefulness = function(usefulness) {
    this._usefulness = usefulness;

    this._subscribersCall('usefulness');
  };

  /**
   * @param {string} usefulness
   */
  ReviewData.prototype.setQuizAnswer = function(quizAnswer) {
    this._quizAnswer = quizAnswer;

    this._subscribersCall('quizAnswer');
  };

  return ReviewData;
});
