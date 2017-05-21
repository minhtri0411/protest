$(".main_slider").myslider();
$(".slider-intro").myslider({
   nav: false
});
$(".slider-logo").myslider({
   pagination: false
});

/*----menu mobie----*/
var _wrapper = $('.wrapper');

var _wrapperOverlay = $('<div class="wrapper-overlay"></div>');
_wrapper.prepend(_wrapperOverlay);
// Add click handler on wrapper-overlay
$('.wrapper-overlay, .mobile-nav-close').click(function() {
	$(document.body).removeClass('navOpen');
});

$('#mmenu-toggle').click(function() {
	$(document.body).addClass('navOpen');
});
