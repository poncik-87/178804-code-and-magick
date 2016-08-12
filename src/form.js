'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();

var reviewName = document.querySelector('#review-name');
var reviewText = document.querySelector('#review-text');
var reviewFieldsName = document.querySelector('.review-fields-name');
var reviewFieldsText = document.querySelector('.review-fields-text');
var reviewFieldsHeader = document.querySelector('.review-fields');
var submitButton = document.querySelector('.review-submit');
var reviewMarks = document.querySelectorAll('.review-form-group-mark input[type=\"radio\"]');
var currentMark;

var checkFormRequires = function() {
  reviewText.required = currentMark < 3;

  if (reviewName.value !== '') {
    reviewFieldsName.classList.add('invisible');
  } else {
    reviewFieldsName.classList.remove('invisible');
  }
  if (reviewText.value !== '') {
    reviewFieldsText.classList.add('invisible');
  } else {
    reviewFieldsText.classList.remove('invisible');
  }
  if (reviewName.value !== '' && reviewText.value !== '') {
    reviewFieldsHeader.classList.add('invisible');
  } else {
    reviewFieldsHeader.classList.remove('invisible');
  }

  submitButton.disabled = reviewName.value === '' || (reviewText.required && reviewText.value === '');
};

reviewName.onchange = checkFormRequires;
reviewText.onchange = checkFormRequires;
for (var i = 0; i < reviewMarks.length; i++) {
  reviewMarks[i].onchange = function() {
    currentMark = this.value;
    checkFormRequires();
  };
}

reviewName.required = true;
checkFormRequires();
