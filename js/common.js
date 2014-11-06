head.ready(function() {

	var search = $('.js-search'),
			search_type = search.find('.search__type'),
			search_title = search.find('.search__title'),
			up = $('.js-up');

	// search
	search_title.on('click', function () {
		search_type.removeClass('is-active');
		$(this).parent().addClass('is-active');
	});	

	// up
	up.on('click', function () {
		$('html, body').animate({
			scrollTop: 0
		}, 500);
	});
	
});