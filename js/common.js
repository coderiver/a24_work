head.ready(function() {

	var search = $('.js-search'),
			search_type = search.find('.search__type'),
			search_title = search.find('.search__title'),
			up = $('.js-up'),
			vote = $('.js-vote'),
			vote_in = vote.find('.vote__in'),
			vote_result = vote.find('.vote__result'),
			vote_btn = vote_in.find('.btn'),
			sv_toggle = $('.js-el-toggle'),
			share = $('.js-share'),
			share_close = $('.js-share-close'),
			slider = $('.js-slider'),
			fields = $('input, textarea');

	// ie9 placeholder
	if (fields.length) {
		fields.placeholder();
	};

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

	// sv
	sv_toggle.on('click', function () {
		var item = $(this).parents('.el__item'),
				text_show = 'развернуть',
				text_hide = 'свернуть';
		if (item.hasClass('el__item_hot')) {
			item.toggleClass('is-hot');
		}
		if ($(this).hasClass('is-active')) {
			$(this).find('span').text(text_show);
		}
		else {
			$(this).find('span').text(text_hide);
		}
		$(this).toggleClass('is-active');
		item.toggleClass('is-open');
		item.find('.el__in').toggle();
	});

	// share
	share.on('click', function () {
		$(this).next().show();
		return false;
	});
	share_close.on('click', function () {
		$(this).parent().hide();
	});

	//select
	function select() {
		var el = $('.js-select');
		el.find('.select__head').on('click', function(){		
			if ($(this).parent().hasClass('is-open')) {
				$(this).parent().removeClass('is-open');
				$(this).next().hide();
			}
			else {
				el.removeClass('is-open');
				el.find('.select__list').hide();
				$(this).parent().addClass('is-open');
				$(this).next().show();
			}
		})
		el.find('.select__list li').bind('click', function(){
			var val = $(this).text();
			$(this).parent().prev().html(val);
			$(this).parent().next().val(val);
			$(this).parent().hide();
			$(this).parent().parent().removeClass('is-open');
		})
		el.click(function(event){
			event.stopPropagation();
		});
		$(document).click(function() {
			el.find('.select__list').hide();
			el.removeClass('is-open');
		});
	}
	select();

	// slider
	if (slider.length) {
		slider.each(function () {
			var slider_this = $(this),
					slider_prev = slider_this.find('.slider__prev'),
					slider_next = slider_this.find('.slider__next'),
					slider_list = slider_this.find('.slider__list'),
					slider_item = slider_list.find('.slider__item'),
					slider_caption = slider_this.find('.slider__caption');
			slider_list.cycle({
				timeout: 0,
				fx: 'scrollHorz',
				prev: slider_prev,
				next: slider_next,
				slides: slider_item,
				caption: slider_caption,
				captionTemplate: '{{slideNum}} из {{slideCount}}'
			});
		});
	};
	
});