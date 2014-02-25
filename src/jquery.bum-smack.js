;(function ($) {
  'use strict';

  // Options:
  //  threshold: distance (percentage or px distance from the bottom of the element)
  //  edge: 'top' or 'bottom' (which edge of the element to watch)
  $.fn.smack = function (options) {
    // Default edge is bottom
    options = $.extend({}, {'edge': 'bottom'}, options);
    // Default is the absolute top of the screen or bottom of the screen
    // Override with any newly supplied options
    options = $.extend({}, {
      'threshold' : options.edge === 'top' ? 0 : 1,
      'deferred'  : new $.Deferred()
    }, options);

    var $this           = $(this),
        // If this element has been bound before, pull up its last options
        // Note: Since we only allow for a single smack binding,
        //    this means that if you had a previous (unsmacked) binding for 'top'
        //    and are now binding for the 'bottom', we'll still remember your
        //    'top' binding by pulling it from the data attribute on the bind for 'bottom'.
        bumSmackOptions = $this.data('bum-smack') || {};

    // Use the new options to replace the previous one
    bumSmackOptions[options.edge] = options;
    bumSmackOptions.scrollTop     = $this.scrollTop();
    $this.data('bum-smack', bumSmackOptions);

    // Only allow a single scroll event binding
    $this.off('scroll.smack').on('scroll.smack', function () {
      var scrollTop     = $this.scrollTop(),
          // Keep these computed here in case the div changes dimensions at runtime
          innerHeight   = $this[0] === window ? $this.height() : $this.innerHeight(),
          // ScrollHeight doesn't exist on the document nor window
          scrollHeight  = $this[0] === window ? $(document).height() : $this[0].scrollHeight,

          direction     = scrollTop > bumSmackOptions.scrollTop ? 'down' : (scrollTop < bumSmackOptions.scrollTop ? 'up' : false),

          distanceFromTop  = scrollTop + innerHeight,

          isPixelThresholdFromBottom, isPixelThresholdFromTop, thresholdFromTop, thresholdFromBottom;

      bumSmackOptions.scrollTop = scrollTop;

      if (direction === 'down' && bumSmackOptions.bottom) {
        isPixelThresholdFromBottom = bumSmackOptions.bottom.threshold.toString().toLowerCase().indexOf('px') !== -1;
        // Threshold for either percentage and px from bottom
        thresholdFromBottom        = isPixelThresholdFromBottom ? scrollHeight - parseInt(bumSmackOptions.bottom.threshold, 10) : Math.floor(scrollHeight * bumSmackOptions.bottom.threshold);

        if (distanceFromTop >= thresholdFromBottom) {
            bumSmackOptions.bottom.deferred.resolve();
            bumSmackOptions.bottom = false;
            $this.data('bum-smack', bumSmackOptions);
        }
      }

      if (direction === 'up' && bumSmackOptions.top) {
        isPixelThresholdFromTop = bumSmackOptions.top.threshold.toString().toLowerCase().indexOf('px') !== -1;
        // Threshold for either percentage and px from top
        thresholdFromTop        = isPixelThresholdFromTop ? parseInt(bumSmackOptions.top.threshold, 10) : Math.floor(scrollHeight * bumSmackOptions.top.threshold);

        if (scrollTop <= thresholdFromTop) {
            bumSmackOptions.top.deferred.resolve();
            bumSmackOptions.top = false;
            $this.data('bum-smack', bumSmackOptions);
        }
      }

      // If the configured smack for the edge has been met
      if (!bumSmackOptions.top && !bumSmackOptions.bottom) {
        $this.off('scroll.smack');
      }

    });

    return options.deferred.promise();
  };

})(window.jQuery);
