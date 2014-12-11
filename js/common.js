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
        sv_title = $('.el__title a'),
        sv_item = $('.el__item'),
        share = $('.js-share'),
        share_close = $('.js-share-close'),
        slider = $('.js-slider'),
        fields = $('input, textarea'),
        remove_disable = $('.js-remove-disable'),
        disable_input = $('.js-disable-input'),
        popup_close = $('.js-popup-close'),
        popup = $('.popup'),
        input_decimal = $('.js-input-decimal'),
        input_file = $('.js-input-file'),
        input_date = $('.js-input-date'),
        rating = $('.js-rating'),
        comm_reply = $('.js-comm-reply'),
        tempalte_socials = $('.js-template-socials'),
        add_socials = $('.js-add-socials'),
        actserv = $('.js-actserv'),
        actserv_item = actserv.find('.actserv__item'),
        actserv_head = actserv.find('.actserv__head'),
        textarea_editor = $('.js-textarea-editor'),
        template_work_place = $('.js-work-place-template'),
        work_place_list = $('.js-work-place-list'),
        mycomp_toggle = $('.js-mycomp-toggle'),
        contacts = $('.js-contacts'),
        template_contacts = $('.js-template-contacts'),
        print = $('.js-print');

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
    sv_item.on('click', function () {
        if (!$(this).hasClass('is-open')) {
            $(this).find('.js-el-toggle').trigger('click');
        }
    });
    sv_toggle.on('click', function (event) {
        event.stopPropagation();
        var item = $(this).parents('.el__item'),
                text_show = 'развернуть',
                text_hide = 'свернуть',
                el_open = $('.el__item.is-open'),
                el_hot_open = $('.el__item_hot.is-open');
        if (item.hasClass('el__item_hot')) {
            item.toggleClass('is-hot');
        }
        if ($(this).hasClass('is-active')) {
            $(this).find('span').text(text_show);
        }
        else {
            $(this).addClass('is-active');
            item.addClass('is-open');
            item.find('.el__in').show();
            $(this).find('span').text(text_hide);
        }
        el_open.removeClass('is-open');
        el_open.find('.el__in').hide();
        el_open.find('.el__toggle button').removeClass('is-active');
        el_open.find('.el__toggle button span').text(text_show);
        el_hot_open.addClass('is-hot');
    });
    sv_title.on('click', function (event) {
        event.stopPropagation();
        $(this).parents('.el__item').find('.js-el-toggle').trigger('click');
        return false;
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
        });
        el.find('.select__list li').bind('click', function(){
            var val = $(this).text();
            $(this).parent().prev().html(val);
            $(this).parent().next().val(val);
            $(this).parent().hide();
            $(this).parent().parent().removeClass('is-open');
            $(this).parent().parent().addClass('is-chousen');
            // validate
            validate_select(el);
        });
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
            cart_list = cart.find('.js-cart-list'),
            cart_list_more = cart.find('.js-cart-list-more'),
            cart_total = cart.find('.js-cart-total');

        if (serv.length) {
            // serv
            serv.each(function () {
                var serv_this = $(this),
                    serv_months = serv_this.find('.js-serv-months'),
                    serv_price = serv_this.find('.js-serv-price'),
                    serv_buy = serv_this.find('.js-serv-buy');
                // serv months
                serv_months.on('change', function () {
                    var price = $(this).data('price');
                        $(this).parent().find('.js-serv-months-value').html();
                    serv_price.html(price);
                });
                // serv buy
                serv_buy.on('click', function () {
                    // cart whow
                    services_cart_show();
                    var title = $(this).data('title'),
                        price = serv_price.html();
                    if (serv_months.length) {
                        var month = 0;
                        serv_months.each(function () {
                            if ($(this).is(':checked')) {
                                month = $(this).next().find('.js-serv-months-value').html();
                            };
                        });
                        var cart_item = '<div class="cart__item js-cart-item">' +
                                            '<div class="cart__row">'+
                                                '<div class="cart__sum"><span class="js-cart-money">' + price + '</span><button class="cart__del js-cart-del"></button></div>'+
                                                '<div class="cart__title">' + title + ' × ' + month + ' мес.</div>'+
                                            '</div>'+
                                        '</div>';
                        if (!cart_list.is(':empty')) {
                            cart_list.empty();
                            cart_list.append(cart_item);
                        } else {
                            cart_list.append(cart_item);
                        }
                    } else {
                        var cart_item = '<div class="cart__item js-cart-item">' +
                                            '<div class="cart__row">'+
                                                '<div class="cart__sum">' + price + '<button class="cart__del js-cart-del"></button></div>'+
                                                '<div class="cart__title">' + title + '</div>'+
                                            '</div>'+
                                        '</div>';
                        if (!cart_list.is(':empty')) {
                            cart_list.empty();
                            cart_list.append(cart_item);
                        } else {
                            cart_list.append(cart_item);
                        };
                    };
                    // total
                    services_total();
                });
            });
            // servmore
            $('.js-servmore-buy').on('click', function () {
                // cart show
                services_cart_show();
                var servmore_this = $(this),
                    servmore_price = servmore_this.parent().find('.js-servmore-price').html(),
                    servmore_type = servmore_this.parent().find('.js-servmore-title').html(),
                    servmore_data_item = servmore_this.data('item');
                if (!servmore_this.hasClass('is-added')) {
                    servmore_this.addClass('is-added');
                    // add servmore
                    servmore_add(servmore_data_item);
                }
                else {
                    $('.js-cart-item-' + servmore_data_item).find('.js-cart-plus').trigger('click');
                }

                // add servmore
                function servmore_add (el) {
                    cart_list_more.append('<div class="cart__item cart__item_more js-cart-item js-cart-item-' + el + ' js-cart-item-more">'+
                        '<div class="cart__row">'+
                            '<div class="cart__price js-cart-price">' + servmore_price + '</div>'+
                            '<div class="cart__title js-cart-title">' + servmore_type + '</div>'+
                        '</div>'+
                        '<div class="cart__row">'+
                            '<div class="cart__sum"><span class="js-cart-money">' + servmore_price + '</span><button class="cart__del js-cart-del" data-button="js-servmore-buy-' + el + '"></button></div>'+
                            '<div class="cart__value">'+
                                '<button class="cart__minus js-cart-minus"></button>'+
                                '<div class="cart__value-in"><span class="js-cart-value">1</span> шт.</div>'+
                                '<button class="cart__plus js-cart-plus"></button>'+
                            '</div>'+
                        '</div>'+
                    '</div>');
                }
                // total
                services_total();
            });
            // value
            body.on('click', '.js-cart-plus', function () {
                var item = $(this).parents('.js-cart-item'),
                    price = item.find('.js-cart-price').html(),
                    price = price.replace(/\s+/g, ''),
                    price = parseInt(price),
                    value = item.find('.js-cart-value'),
                    current = value.html(),
                    current = parseInt(current),
                    sum = item.find('.js-cart-money'),
                    sum_value = sum.html(),
                    sum_value = parseInt(sum_value);
                value.html(++current);
                var sum_finish = current*price,
                    sum_finish = '' + sum_finish + '';
                    sum_finish = sum_finish.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                sum.html(sum_finish);
                // total
                services_total();
                return false;
            });
            body.on('click', '.js-cart-minus', function () {
                var item = $(this).parents('.js-cart-item'),
                    price = item.find('.js-cart-price').html(),
                    price = price.replace(/\s+/g, ''),
                    price = parseInt(price),
                    value = item.find('.js-cart-value'),
                    current = value.html(),
                    current = parseInt(current),
                    sum = item.find('.js-cart-money'),
                    sum_value = sum.html(),
                    sum_value = parseInt(sum_value);
                if (current > 1) {
                    value.html(--current);
                    var sum_finish = current*price,
                        sum_finish = '' + sum_finish + '';
                        sum_finish = sum_finish.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                    sum.html(sum_finish);
                    // total
                    services_total();
                };
                return false;
            });
            // total
            function services_total () {
                var cart_money = $('.js-cart-money'),
                        total = 0;
                cart_money.each(function () {
                    var money = $(this).html(),
                        money = money.replace(/\s+/g, ''),
                        money = parseInt(money);
                    total += money;
                    return total;
                });
                total = '' + total + '';
                total = total.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                cart_total.html(total);
            }
            // cart show
            function services_cart_show () {
                if (!cart.hasClass('is-visible')) {
                    cart.addClass('is-visible');
                    cart.slideDown();
                };
            }
            // remove
            body.on('click', '.js-cart-del', function () {
                $(this).parents('.js-cart-item').remove();
                if ($(this).parents('.js-cart-item').hasClass('js-cart-item-more')) {
                    var servmore_buy = $(this).data('button');
                    $('.' + servmore_buy).removeClass('is-added');
                };
                // total
                services_total();
            });
        };
    }
    services();

    // remove disable state on button
    remove_disable.keyup(function () {
        var val = $(this).val(),
                btn = $(this).data('disable'),
                btn_el = $('.' + btn);
        if (val.length > 0) {
            btn_el.removeClass('is-disable');
            btn_el.removeAttr('disabled');
        }
        else {
            btn_el.addClass('is-disable');
            btn_el.attr('disabled', 'disabled');
        }
    });

    // disable input
    disable_input.change(function () {
        var input = $(this).data('input'),
            el = $('.' + input);
        el.parents('.field').toggleClass('is-disable');
        if (el.attr('disabled')) {
            el.removeAttr('disabled');
        }
        else {
            el.attr('disabled', 'disabled');
        }
    });

    // popup
    popup_close.on('click', function () {
        popup.fadeOut();
        body.removeClass('no-scroll');
        return false;
    });

    // input decimal
    input_decimal.keyup(function () {
        var value = $(this).val(),
            value = value.replace(/\s+/g, ''),
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        $(this).val(value);
    });

    // rating
    if (rating.length) {
        rating.each(function () {
            var good = $(this).find('.js-rating-good'),
                bad = $(this).find('.js-rating-bad');
            good.on('click', function () {
                if (!$(this).parent().hasClass('is-done')) {
                    $(this).parent().addClass('is-done');
                    var el = $(this).find('span'),
                        counter = el.html(),
                        counter = parseInt(counter);
                    el.html(++counter);
                };
            });
            bad.on('click', function () {
                if (!$(this).parent().hasClass('is-done')) {
                    $(this).parent().addClass('is-done');
                    var el = $(this).find('span'),
                        counter = el.html(),
                        counter = parseInt(counter);
                    el.html(++counter);
                };
            });
        });
    };

    // comm
    comm_reply.on('click', function () {
        $(this).parent().next().slideToggle();
        return false;
    });

    // add social links
    add_socials.on('click', function () {
        var template = tempalte_socials.html();
        tempalte_socials.before(template);
    });

    // validate
    function validate_select (el_select) {
        var el_parent = el_select.parents('.js-validate'),
            el_textarea = el_parent.find('.js-validate-textarea'),
            el_btn = el_parent.find('.js-validate-btn');
        if (el_textarea.length) {
            var el_textarea_val = el_textarea.val();
            if (el_textarea_val.length !== 0) {
                el_btn.removeClass('is-disable');
                el_btn.removeAttr('disabled');
            }
        }
        else {
            el_btn.removeClass('is-disable');
            el_btn.removeAttr('disabled');
        }
        
    }
    function validate_textarea () {
        var el_textarea = $('.js-validate-textarea'),
            el_parent = el_textarea.parents('.js-validate'),
            el_select = el_parent.find('.js-validate-select'),
            el_btn = el_parent.find('.js-validate-btn');
        el_textarea.keyup(function () {
            var el_textarea_val = $(this).val();
            if (el_select.hasClass('is-chousen')) {
                if (el_textarea_val.length !== 0) {
                    el_btn.removeClass('is-disable');
                    el_btn.removeAttr('disabled');
                }
                else {
                    el_btn.addClass('is-disable');
                    el_btn.attr('disabled', 'disabled');
                }
            };
        });
    }
    validate_textarea();

    // file
    input_file.change(function () {
        var value = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');
        $(this).parent().find('.js-input-file-val').html(value);
    });
    
    // actserv
    actserv_head.on('click', function () {
        if ($(this).hasClass('is-active')) {
            actserv_head.removeClass('is-active');
            actserv_head.next().hide();
        }
        else {
            actserv_head.removeClass('is-active');
            actserv_head.next().hide();
            $(this).addClass('is-active');
            $(this).next().show();
        }
    });

    // date
    if (input_date.length) {
        input_date.mask('00. 00. 0000');
    };

    // editor
    if (textarea_editor.length) {
        textarea_editor.each(function () {
            $(this).htmlarea({
                toolbar: ["orderedList", "unorderedList"],
                css: 'css/editor.css'
            });
        })
    };

    // work place
    body.on('click', '.js-work-place-add', function () {
        var item = template_work_place.html();
        work_place_list.append(item);
        var item_new = work_place_list.find('.js-work-place-item');
        item_new.find('.js-textarea-editor-new').htmlarea({
            toolbar: ["orderedList", "unorderedList"],
            css: 'css/editor.css'
        });
        select();
    });
    body.on('click', '.js-work-place-del', function () {
        $(this).parents('.js-work-place-item').remove();
    });

    // mycomp toggle
    mycomp_toggle.on('click', function () {
        $(this).parent().next().toggle();
        $(this).toggleClass('is-active');
    }); 

    // contacts
    body.on('click', '.js-contacts-add', function () {
        var item = template_contacts.html();
        contacts.append(item);
    });
    body.on('click', '.js-contacts-del', function () {
        $(this).parents('.js-contacts-item').remove();
    });

    // print
    print.on('click', function () {
        var el = $(this).attr('href');
        $(el).print({
            globalStyles: false,
            mediaPrint: false,
            stylesheet: 'css/print.css',
            iframe: true,
            noPrintSelector: '.js-no-print',
            append : '<div style="margin-top: 20px; padding: 10px; border-top: 2px solid #000; text-align: center;">«Резюме с сайта rabota.a42.ru»<div>'
        });
        return false;
    });
    

});