; (function ($) {
  'use strict';

  var defaults = {
    $content: $(document),
    amendHeight: 20,
    callback: function () {}
  };

  $.fn.scrollLoad = function (options) {
    var opts = $.extend({}, defaults, options);

    return this.each(function () {
      var obj = this;
      var $viewPort = $(this);
      var $content = opts.$content;
      $viewPort.on('scroll', function () {
        if ($viewPort.scrollTop() + $viewPort.height() + opts.amendHeight >= $content.height()) {
          opts.callback();
        }
      })
    })
  }
})(jQuery);
