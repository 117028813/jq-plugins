;(function ($) {
  'use strict';

  var defaults = {
    height: window.innerHeight,
    zoom: 12,
    Longitude: '',
    Latitude: '',
    lng: '',
    lat: '',
    labelContent: '',
    MobileNumber: ''
  }

  $.fn.qqmap = function (options) {
    var opts = $.extend({}, defaults, options)

    return this.each(function () {
      var obj = this
      $(this).height(opts.height)
      
      var qqMap = new qq.maps.Map(this, {
        center: new qq.maps.LatLng(opts.Latitude, opts.Longitude),
        zoom: opts.zoom,
        zoomControl: false,
        mapTypeControl: false,
      })
      new qq.maps.Marker({
        position: new qq.maps.LatLng(opts.Latitude, opts.Longitude),
        map: qqMap 
      })
      new qq.maps.Label({
        position: new qq.maps.LatLng(opts.Latitude, opts.Longitude),
        map: qqMap,
        content: opts.labelContent
      })

      $(this).prepend('<div class="lx-store-map-head"><div class="lx-store-map-back"><img src="img/back_arrows.png" alt=""></div><div class="lx-store-map-title"></div></div><div class="store-nav-phone"><a class="lx-detail-phone" href="">024-83839933</a></div><div class="store-nav">导航</div>');
      $('.lx-store-map-title').html(opts.labelContent);
      //设置电话号码
      $(this).find(".lx-detail-phone").html('电话：'+ opts.MobileNumber)
      // 返回按钮添加
      $('.lx-store-map-back').on('click', function () {
        $(obj).removeClass('active').empty();
        $('body').css('overflow-y', 'visible');
        $(obj).attr('style', 'transform:translateX(100%)')
      })
      $(obj).find('.store-nav').off().on('click', function () {
        var eword = opts.labelContent
        var epointx = opts.Longitude
        var epointy = opts.Latitude
        var spointx = opts.lng
        var spointy = opts.lat
        location.href = 'http://apis.map.qq.com/tools/routeplan/eword='+eword+'&epointx='+epointx+'&epointy='+epointy+'&spointx='+spointx+'&spointy='+spointy+'?key=TEVBZ-KM2KF-4B2JI-NREFZ-TPRQ5-MKBT3&referer=lx'
      })
    })
  }
})(jQuery);