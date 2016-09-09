'use strict';

define(function() {
  /**
   * @class
   * @classdesc Обертка данных отзыва
   * @param {Object} data
   */
  function ReviewDataItem(data) {
    this._authorName = data.author.name;
    this._authorPicture = data.author.picture;
    this._created = data.created;
    this._description = data.description;
    this._rating = data.rating;
    this._usefulness = data.review_usefulness;
  }

  /**
   * Получение данных об авторе
   */
  ReviewDataItem.prototype.getAuthorName = function() {
    return this._authorName;
  };

  /**
   * Получение картинки автора
   */
  ReviewDataItem.prototype.getAuthorPicture = function() {
    return this._authorPicture;
  };

  /**
   * Получение данных о дате создания
   */
  ReviewDataItem.prototype.getCreated = function() {
    return this._created;
  };

  /**
   * Получение данных об описании
   */
  ReviewDataItem.prototype.getDescription = function() {
    return this._description;
  };

  /**
   * Получение данных о рейтинге
   */
  ReviewDataItem.prototype.getRating = function() {
    return this._rating;
  };

  /**
   * Получение данных о полезности отзыва
   */
  ReviewDataItem.prototype.getUsefulness = function() {
    return this._usefulness;
  };

  /**
   * @param {string} authorName
   */
  ReviewDataItem.prototype.setAuthorName = function(authorName) {
    this._authorName = authorName;
  };

  /**
   * @param {string} authorPicture
   */
  ReviewDataItem.prototype.setAuthor = function(authorPicture) {
    this._authorPicture = authorPicture;
  };

  /**
   * @param {string} created
   */
  ReviewDataItem.prototype.setCreated = function(created) {
    this._author = created;
  };

  /**
   * @param {string} description
   */
  ReviewDataItem.prototype.setDescription = function(description) {
    this._description = description;
  };

  /**
   * @param {string} rating
   */
  ReviewDataItem.prototype.setRating = function(rating) {
    this._rating = rating;
  };

  /**
   * @param {string} usefulness
   */
  ReviewDataItem.prototype.setUsefulness = function(usefulness) {
    this._usefulness = usefulness;
  };

  return ReviewDataItem;
});
