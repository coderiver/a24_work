head.ready(function() {

	var search = $('.js-search'),
			search_type = search.find('.search__type'),
			search_title = search.find('.search__title'),
			up = $('.js-up'),
			vote = $('.js-vote'),
			vote_in = vote.find('.vote__in'),
			vote_result = vote.find('.vote__result'),
			vote_btn = vote_in.find('.btn');

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

	// vote
	vote_btn.on('click', function () {
		vote_in.hide();
		vote_result.show();
	});
	
});