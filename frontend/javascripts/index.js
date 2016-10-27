requirejs.config({
	baseUrl: './js',
});

requirejs([
	'domReady!',
	'jquery',
	'jquery-ui',
	'slick'

], function () {
	'use strict';

	$( ".accordion" ).accordion();
	$( ".accordion" ).accordion({
		collapsible: true,
		active: false
	});

	$('.slider').slick({
		autoplay: true,
		autoplaySpeed: 2500
	});
});


