'use strict';

window.form = (function() {
  var browserCookies = require('browser-cookies');

  /**
   *@constant
   *@type {string}
   */
  var INVISIBLE = 'invisible';

  var formContainer = document.querySelector('.overlay-container');
  var formObject = document.querySelector('.review-form');
  var formCloseButton = document.querySelector('.review-form-close');
  var reviewName = document.querySelector('#review-name');
  var reviewText = document.querySelector('#review-text');
  var reviewMarks = document.querySelectorAll('.review-form-group-mark input[type=\"radio\"]');
  //текущее значение оценки отзыва
  var currentMark;
  var i;

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove(INVISIBLE);
      cb();
    },

    close: function() {
      formContainer.classList.add(INVISIBLE);

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  formObject.onsubmit = function() {
    setFormCookies();
    form.close();
    return false;
  };
  reviewName.oninput = checkFormRequires;
  reviewText.oninput = checkFormRequires;

  fillFormFromCookies();

  for (i = 0; i < reviewMarks.length; i++) {
    if (reviewMarks[i].checked) {
      currentMark = reviewMarks[i].value;
    }

    reviewMarks[i].onchange = function() {
      currentMark = this.value;
      checkFormRequires();
    };
  }

  reviewName.required = true;
  checkFormRequires();

  /**
   * Реагирование формы на пользовательские действия
   */
  function checkFormRequires() {
    /**
     *Определяет границу оценки, ниже которой обязателен отзыв
     *@constant
     *@type {number}
     */
    var THRESHOLD_MARK = 3;

    var reviewFieldsName = document.querySelector('.review-fields-name');
    var reviewFieldsText = document.querySelector('.review-fields-text');
    var reviewFieldsHeader = document.querySelector('.review-fields');
    var submitButton = document.querySelector('.review-submit');

    reviewText.required = currentMark < THRESHOLD_MARK;

    //скрытие лейблов, если соответствующие поля валидны
    if (reviewName.validity.valid) {
      reviewFieldsName.classList.add(INVISIBLE);
    } else {
      reviewFieldsName.classList.remove(INVISIBLE);
    }
    if (reviewText.validity.valid) {
      reviewFieldsText.classList.add(INVISIBLE);
    } else {
      reviewFieldsText.classList.remove(INVISIBLE);
    }
    if (formObject.checkValidity()) {
      reviewFieldsHeader.classList.add(INVISIBLE);
    } else {
      reviewFieldsHeader.classList.remove(INVISIBLE);
    }

    submitButton.disabled = !formObject.checkValidity();
  }
  /**
   * Заполнение начальных значений из cookies
   */
  function fillFormFromCookies() {
    var cookieMark = parseInt(browserCookies.get('review-mark'), 10);
    cookieMark = cookieMark && cookieMark <= reviewMarks.length ? cookieMark : 3;
    var reviewMark = document.querySelector('#review-mark-' + cookieMark);
    reviewMark.checked = true;

    var cookieName = browserCookies.get('review-name');
    reviewName.value = cookieName;
  }

  /**
   * Установка cookies для формы
   */
  function setFormCookies() {
    var expiresValue = getExpiresValue();
    browserCookies.set('review-mark', currentMark, {expires: expiresValue});
    browserCookies.set('review-name', reviewName.value, {expires: expiresValue});
  }
  /**
   * Значение времени жизни cookie
   * @return {string}
   */
  function getExpiresValue() {
    /**
     *День рождения Грейс Хоппер
     *@constant
     *@type {string}
     */
    var STR_KEY_DATE = '1906-01-09';
    /**
     *@constant
     *@type {number}
     */
    var MSEC_IN_DAY = 1000 * 60 * 60 * 24;
    /**
     *@constant
     *@type {number}
     */
    var DAYS_IN_YEAR = 365;

    var keyDate = new Date(STR_KEY_DATE);
    var currentDate = new Date();
    var period = currentDate - keyDate;
    var daysPeriod = Math.floor(period / MSEC_IN_DAY);
    var lastYearDaysPeriod = daysPeriod % DAYS_IN_YEAR;
    currentDate.setDate(currentDate.getDate() + lastYearDaysPeriod);

    return currentDate.toUTCString();
  }

  return form;
})();
