head.ready(function() {

	var search = $('.js-search'),
			search_type = search.find('.search__type'),
			search_title = search.find('.search__title');

	// search
	search_title.on('click', function () {
		search_type.removeClass('is-active');
		$(this).parent().addClass('is-active');
	});	
	
});