requirejs.config({
	baseUrl: './js',
});

requirejs([
	'domReady!',
	'jquery',
	'slick',
	'mediaelement-and-player'


], function () {
	'use strict';

	$('.main-slider').slick({
		dots: true,
		autoplay: true,
		autoplaySpeed: 2500
	});

	$('.vertical-slider').slick({
		vertical: true,
		slidesToShow: 5
	});

	$(".block-slider").slick({

		slidesToShow: 5,
		slidesToScroll: 1,


		responsive: [{

			breakpoint: 1500,
			settings: {
				slidesToShow: 4,
			}

			}, {

			breakpoint: 1300,
			settings: {
				slidesToShow: 3,
			}

			}, {

			breakpoint: 965,
			settings: {
				slidesToShow: 2,
			}

			}, {
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
			}
		}]
	});

	var menu = {
		init: function(){
			this.btnMenu();
		},
		btnMenu: function() {
			$('.btn-menu').on('click', function(){
				if(!$(this).hasClass('active-btn')){
					$(this).addClass('active-btn');
					$(this).next().slideDown('fast');
				} else {
					$(this).removeClass('active-btn');
					$(this).next().slideUp('fast');
				}
			});
		}
	};

	menu.init();

	var player = new MediaElementPlayer('.player1');


});


