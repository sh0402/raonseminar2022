$('map').imageMapResize();

$(document).ready(function ()
{           
    $('.NO-CACHE img').attr('src',function () { return $(this).attr('src') + "?a=" + Math.random() });
});