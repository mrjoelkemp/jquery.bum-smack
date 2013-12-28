;(function ($) {
  'use strict';

  // Options:
  //  threshold: distance (percentage or px distance from the bottom of the element)
  //  edge: 'top' or 'bottom' (which edge of the element to watch)
  $.fn.smack = function (options) {
    options = $.extend({}, {'edge': 'bottom'}, options);
    options = $.extend({}, {
        'threshold' : options.edge === 'top' ? 0 : 1,
        'deferred'  : new $.Deferred()
    }, options);

    var $this           = $(this),
        bumSmackOptions = $this.data('bum-smack') || {};

    bumSmackOptions[options.edge] = options;
    $this.data('bum-smack', bumSmackOptions);

    $this.on('scroll.smack', function () {
      var scrollTop     = $this.scrollTop(),
          // Keep these computed here in case the div changes dimensions at runtime
          innerHeight   = $this[0] === window ? $this.height() : $this.innerHeight(),
          // ScrollHeight doesn't exist on the document nor window
          scrollHeight  = $this[0] === window ? $(document).height() : $this[0].scrollHeight,

          distanceFromTop  = scrollTop + innerHeight,

          isPixelThresholdFromBottom, isPixelThresholdFromTop, thresholdFromTop;

      if (bumSmackOptions.bottom) {
        isPixelThresholdFromBottom = bumSmackOptions.bottom.threshold.toString().toLowerCase().indexOf('px') !== -1;
        // Threshold for either percentage and px from bottom
        thresholdFromTop           = isPixelThresholdFromBottom ? scrollHeight - parseInt(bumSmackOptions.bottom.threshold, 10) : Math.floor(scrollHeight * bumSmackOptions.bottom.threshold);

        if (distanceFromTop >= thresholdFromTop) {
            bumSmackOptions.bottom.deferred.resolve();
            bumSmackOptions.bottom = false;
        }
      }

      if (bumSmackOptions.top) {
        isPixelThresholdFromTop = bumSmackOptions.top.threshold.toString().toLowerCase().indexOf('px') !== -1;
        // Threshold for either percentage and px from top
        thresholdFromTop        = isPixelThresholdFromTop ? parseInt(bumSmackOptions.top.threshold, 10) : Math.floor(scrollHeight * bumSmackOptions.top.threshold);

        if (scrollTop <= thresholdFromTop) {
            bumSmackOptions.top.deferred.resolve();
            bumSmackOptions.top = false;
        }
      }

      $this.data('bum-smack', bumSmackOptions);

      if (!bumSmackOptions.top && !bumSmackOptions.bottom) {
        $this.off('scroll.smack');
      }

    });

    return options.deferred.promise();
  };

})(window.jQuery);
