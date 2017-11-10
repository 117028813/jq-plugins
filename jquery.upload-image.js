;(function ($) {
  'use strict';

  var defaults = {
      imgContainer: '',
      itemClass: '',
      itemStr: '',
      maxNum: 5
  }

  $.fn.uploadImage = function (options) {
      var opts = $.extend({}, defaults, options)
      return this.each(function (i) { // this => 使用该插件的jq元素对象集合
          var $obj = $(this)
          this.onchange = function () { // this => 单个DOM元素
              if (opts.imgContainer.children(opts.itemClass).length >= opts.maxNum) {
                  return;
              } else {
                  var files = this.files
                  var reader = new FileReader()
                  reader.readAsDataURL(files[0])
                  reader.onload = function () {
                      var reg = /[^/]+(?=;base64,)/; // 匹配除了 '/' 的n个字符，后边必须紧跟 ';base64'， 匹配结果不包含 ';base64'
                      var get = ("data:image." + this.result.match(reg)[0]);
                      
                      $.post($.getlocalUrl() + '/GetMobileData/SavePicture', { photo: this.result, fileName: get, }, function (img) {
                          var imgStr = opts.itemStr
                          opts.imgContainer.prepend(imgStr)
                          opts.imgContainer.find(opts.itemClass).eq(i).find('img').attr('src', img)
                          opts.imgContainer.find('.icon-soucituguanbianniu').off().on('click', function () {
                          $(this).parent().remove()
                              if (opts.imgContainer.find(opts.itemClass).length < 5) {
                                  $obj.prop('disabled', false)
                              }
                          })
                          if (opts.imgContainer.find(opts.itemClass).length >= 5) {
                              $obj.prop('disabled', true)
                          }
                      });                            
                  }
              }
          }
      })
  }
})(jQuery);