$(document).ready(function (e) {
  $('img[usemap]').rwdImageMaps();
});

$(document).ready(function ()
{           
    $('.NO-CACHE').attr('src',function () { return $(this).attr('src') + "?a=" + Math.random() });
});