'use strict';

window.form = (function() {
  /**
   *@constant
   *@type {string}
   */
  var INVISIBLE = 'invisible';
  /**
   *@constant
   *@type {number}
   */
  var THRESHOLD_MARK = 3;

  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var reviewName = document.querySelector('#review-name');
  var reviewText = document.querySelector('#review-text');
  var reviewFieldsName = document.querySelector('.review-fields-name');
  var reviewFieldsText = document.querySelector('.review-fields-text');
  var reviewFieldsHeader = document.querySelector('.review-fields');
  //var submitButton = document.querySelector('.review-submit');
  var reviewMarks = document.querySelectorAll('.review-form-group-mark input[type=\"radio\"]');
  var currentMark;

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

  reviewName.oninput = checkFormRequires;
  reviewText.oninput = checkFormRequires;
  for (var i = 0; i < reviewMarks.length; i++) {
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
    if (reviewName.validity.valid && reviewText.validity.valid) {
      reviewFieldsHeader.classList.add(INVISIBLE);
    } else {
      reviewFieldsHeader.classList.remove(INVISIBLE);
    }

    //submitButton.disabled = formContainer.validity.valid;
  }

  return form;
})();
