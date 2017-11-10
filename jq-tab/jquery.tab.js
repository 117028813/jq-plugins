;(function ($) {
  'use strict';

  var Tab = function (ele, opts) {
    this.$element = ele; // this => Tab Object instance
    this.defaults = {
      eventType: 'click',
      callback: function (index) {
        console.log(index);
      }
    };
    this.options = $.extend({}, this.defaults, opts);
  }

  Tab.prototype = {
    tab: function () {
      var that = this;
      return this.$element.each(function () {
        var $obj = $(this); // 使用该插件的单个 DOM element
        $obj.find('.tab-header li').on(that.options.eventType, function () {
          $obj.find('.tab-header li').removeClass('active');
          $(this).addClass('active'); // 触发 eventType 的 DOM element
          $obj.find('.tab-content div').hide();
          $obj.find('.tab-content div').eq($(this).index()).show();
          that.options.callback($(this).index());
        })
      })
    }
  }

  $.fn.tab = function (options) {
    var tab = new Tab(this, options); // this => 使用该插件的jq元素对象集合
    return tab.tab();
  }
})(jQuery);