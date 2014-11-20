head.ready(function() {

	var body = $('body'),
			search = $('.js-search'),
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

	function services () {
		var serv = $('.js-serv'),
				servmore = $('.js-servmore'),
				cart = $('.js-cart'),
				cart_list = cart.find('.cart__list'),
				cart_total = cart.find('.cart__total-value span');
		if (serv.length) {
			// serv
			serv.each(function () {
				var serv_this = $(this),
						serv_months = serv_this.find('.serv__months input'),
						serv_price = serv_this.find('.serv__price span'),
						serv_buy = serv_this.find('.serv__footer .btn');
				serv_months.on('change', function () {
					var price = $(this).data('price'),
							month = $(this).parent().find('.serv__month').html();
					serv_price.html(price);
				});
				serv_buy.on('click', function () {
					var title = $(this).data('title'),
							price = serv_price.html();
					if (serv_months.length) {
						var month = 0;
						serv_months.each(function () {
							if ($(this).is(':checked')) {
								month = $(this).next().find('.serv__month').html();
							};
						});
						cart_list.append('<div class="cart__item">' +
							'<div class="cart__row">'+
								'<div class="cart__sum"><span class="js-cart-money">' + price + '</span><button class="cart__del"></button></div>'+
								'<div class="cart__title">' + title + ' × ' + month + ' мес.</div>'+
							'</div>'+
						'</div>');
					}
					else {
						cart_list.append('<div class="cart__item">' +
							'<div class="cart__row">'+
								'<div class="cart__sum">' + price + '<button class="cart__del"></button></div>'+
								'<div class="cart__title">' + title + '</div>'+
							'</div>'+
						'</div>');
					}
					// total
					services_total();
				});	
			});
			// servmore
			servmore.each(function () {
				var servmore_this = $(this),
						servmore_price = servmore_this.find('.servmore__price span').html(),
						servmore_type = servmore_this.find('.servmore__type').html(),
						servmore_buy = servmore_this.find('.btn');
				servmore_buy.on('click', function () {
					cart_list.append('<div class="cart__item cart__item_more">'+
						'<div class="cart__row">'+
							'<div class="cart__price">' + servmore_price + '</div>'+
							'<div class="cart__title">' + servmore_type + '</div>'+
						'</div>'+
						'<div class="cart__row">'+
							'<div class="cart__sum"><span class="js-cart-money">' + servmore_price + '</span><button class="cart__del"></button></div>'+
							'<div class="cart__value">'+
								'<button class="cart__minus"></button>'+
								'<div class="cart__value-in"><span>1</span> шт.</div>'+
								'<button class="cart__plus"></button>'+
							'</div>'+
						'</div>'+
					'</div>');
					// total
					services_total();
				})
			});
			// value
			body.on('click', '.cart__plus', function () {
				var item = $(this).parents('.cart__item'),
						price = item.find('.cart__price').html(),
						price = parseInt(price),
						value = item.find('.cart__value-in span'),
						current = value.html(),
						current = parseInt(current),
						sum = item.find('.js-cart-money'),
						sum_value = sum.html(),
						sum_value = parseInt(sum_value);
				value.html(++current);
				sum.html(current*price);
				// total
				services_total();
			});
			body.on('click', '.cart__minus', function () {
				var item = $(this).parents('.cart__item'),
						price = item.find('.cart__price').html(),
						price = parseInt(price),
						value = item.find('.cart__value-in span'),
						current = value.html(),
						current = parseInt(current),
						sum = item.find('.js-cart-money'),
						sum_value = sum.html(),
						sum_value = parseInt(sum_value);
				if (current > 1) {
					value.html(--current);
					sum.html(current*price);
					// total
					services_total();
				};
			});
			// total
			function services_total () {
				var cart_money = $('.cart .js-cart-money'),
						total = 0;
				cart_money.each(function () {
					var money = $(this).html(),
							money = parseInt(money);
					total += money;
					return total;
				});
				cart_total.html(total);
			}
			// remove
			body.on('click', '.cart__del', function () {
				$(this).parents('.cart__item').remove();
				// total
				services_total();
			});
		};
	}
	services();
	
});