;(function ($) {
  'use strict';

  // Options:
  //  threshold: distance (percentage or px distance from the bottom of the element)
  $.fn.smack = function (options) {
    options = options || {};

    var $this     = $(this),
        deferred  = new $.Deferred(),
        threshold = options.threshold || 1;

    $this.on('scroll.smack', function () {
      var scrollTop     = $this.scrollTop(),
          // Keep these computed here in case the div changes dimensions at runtime
          innerHeight   = $this[0] === window ? $this.height() : $this.innerHeight(),
          // ScrollHeight doesn't exist on the document nor window
          scrollHeight  = $this[0] === window ? $(document).height() : $this[0].scrollHeight,

          distanceFromTop  = scrollTop + innerHeight,

          isPixelThreshold = threshold.toString().toLowerCase().indexOf('px') !== -1,

          // Threshold for either percentage and px from bottom
          thresholdFromTop = isPixelThreshold ? scrollHeight - parseInt(threshold, 10) : Math.floor(scrollHeight * threshold);

      if (distanceFromTop >= thresholdFromTop) {
        $this.off('scroll.smack');
        deferred.resolve();
      }
    });

    return deferred.promise();
  };

})(window.jQuery);