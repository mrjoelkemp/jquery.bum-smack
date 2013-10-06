;(function ($) {
  'use strict';

  // Options:
  //  threshold: distance (percentage or pixels from bottom)
  $.fn.smack = function (options) {
    options = options || {};

    var $this     = $(this),
        deferred  = new $.Deferred(),
        // Detect if it's a percentage
        threshold = options.threshold || 0;

    $this.on('scroll.smack', function () {
      var scrollTop     = $this.scrollTop(),
          innerHeight   = $this[0] === window ? $this.height() : $this.innerHeight(),
          // ScrollHeight doesn't exist on the document nor window
          scrollHeight  = $this[0] === window ? $(document).height() : $this[0].scrollHeight,

          distanceFromBottom  = scrollTop + innerHeight,
          paddedBottom        = scrollHeight - threshold;

      if(distanceFromBottom >= paddedBottom) {
        $this.off('scroll.smack');
        deferred.resolve();
      }
    });

    return deferred.promise();
  };

})(window.jQuery);

// container = container || document;

// $(target).on('scroll.infinite', function() {
//   var scrolltrigger = 0.8,
//       scrollTop     = $(target).scrollTop(),
//       docheight     = $(container).height(),
//       winheight     = $(target).height();

//   // If we've hit the bottom
//   if  ((scrollTop / (docheight - winheight)) > scrolltrigger) {
//      callback.call();
//      // Stop more events from being fired
//      that.finite(target);
//   }