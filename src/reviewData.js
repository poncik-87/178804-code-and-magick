'use strict';

define(['./util', './publisher'], function(util, Publisher) {
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

    //подмешиваем функционал pub/sub
    Publisher.call(this);
  }

  //подмешиваем функционал pub/sub
  util.mixin(ReviewData.prototype, Publisher.prototype);

  /**
   * Получение данных об авторе
   * @return {string}
   */
  ReviewData.prototype.getAuthorName = function() {
    return this._authorName;
  };

  /**
   * Получение картинки автора
   * @return {string}
   */
  ReviewData.prototype.getAuthorPicture = function() {
    return this._authorPicture;
  };

  /**
   * Получение данных о дате создания
   * @return {string}
   */
  ReviewData.prototype.getCreated = function() {
    return this._created;
  };

  /**
   * Получение данных об описании
   * @return {string}
   */
  ReviewData.prototype.getDescription = function() {
    return this._description;
  };

  /**
   * Получение данных о рейтинге
   * @return {string}
   */
  ReviewData.prototype.getRating = function() {
    return this._rating;
  };

  /**
   * Получение данных о полезности отзыва
   * @return {string}
   */
  ReviewData.prototype.getUsefulness = function() {
    return this._usefulness;
  };

  /**
   * Получение данных об оценке отзыва пользователем
   * @return {string}
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
   * @param {string} quizAnswer
   */
  ReviewData.prototype.setQuizAnswer = function(quizAnswer) {
    this._quizAnswer = quizAnswer;

    this._subscribersCall('quizAnswer');
  };

  return ReviewData;
});
