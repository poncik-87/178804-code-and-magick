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
  }

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
  };

  /**
   * @param {string} authorPicture
   */
  ReviewData.prototype.setAuthor = function(authorPicture) {
    this._authorPicture = authorPicture;
  };

  /**
   * @param {string} created
   */
  ReviewData.prototype.setCreated = function(created) {
    this._author = created;
  };

  /**
   * @param {string} description
   */
  ReviewData.prototype.setDescription = function(description) {
    this._description = description;
  };

  /**
   * @param {string} rating
   */
  ReviewData.prototype.setRating = function(rating) {
    this._rating = rating;
  };

  /**
   * @param {string} usefulness
   */
  ReviewData.prototype.setUsefulness = function(usefulness) {
    this._usefulness = usefulness;
  };

  /**
   * @param {string} usefulness
   */
  ReviewData.prototype.setQuizAnswer = function(quizAnswer) {
    this._quizAnswer = quizAnswer;
  };

  return ReviewData;
});

//TODO: сделать массив объектов подписчиков на события. объекты будут вида {название переменной: функция колбека}; сделать функцию, которая добавляет подписчика (объект с набором колбэков) и функцию которая удаляет подписчика. в сеттерах нужно будет проходить по массиву и если есть колбэк с ключом - название переменной, то вызывать его
