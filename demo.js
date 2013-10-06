;(function ($) {
  'use strict';

  $('.case1').smack()
    .done(function () {
      $('.case1').siblings('.success').first().fadeIn('fast');
    });

  $('.case2').smack()
    .done(function () {
      $('.case2').siblings('.success').first().fadeIn('fast');
    });

  $(window).smack()
    .done(function () {
      $('.case3').siblings('.success').first().fadeIn('fast');
    });

})(window.$);