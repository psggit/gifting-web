jQuery(document).ready(function($){

	/* For OwlSlider */
	$( '.wp-spaios-owlslider-container' ).each(function( index ) {

		var slider_id   = $(this).attr('id');
		var slider_conf = $.parseJSON( $(this).closest('.wp-spaios-slider-wrap').find('.wp-spaios-conf').text());

		if( typeof(slider_id) != 'undefined' && slider_id != '' ) {

			jQuery('#'+slider_id).owlCarousel({
				nav						: (slider_conf.arrow) == "true" 					? true 			: false,
				dots 					: (slider_conf.pagination) == "true" 				? true 			: false,
				autoplay				: (slider_conf.autoplay) == "true" 					? true 			: false,
				autoplayTimeout 		: parseInt(slider_conf.autoplay_speed),
				margin					: parseInt(slider_conf.slide_margin_owl),
				loop					: (slider_conf.loop) == "true" 						? true 			: false,
				center					: (slider_conf.slide_center_owl) == "true" 			? true 			: false,
				items					: parseInt(slider_conf.slide_to_show_owl),
				slideBy					: parseInt(slider_conf.slide_to_scroll_owl),
				navSpeed				: parseInt(slider_conf.speed),
				dotsSpeed				: parseInt(slider_conf.speed),
				autoplaySpeed			: parseInt(slider_conf.speed),
				startPosition			: parseInt(slider_conf.start_slide_owl),
				autoWidth				: (slider_conf.slide_autowidth_owl) == "true" 		? true 			: false,
				touchDrag				: true,
				mouseDrag 				: (slider_conf.slide_freeDrag_owl) == "true" 		? true 			: false,
				stagePadding			: parseInt(slider_conf.slide_padding_owl),
				rtl						: (slider_conf.slide_rtl_owl) == "true" 			? true 			: false,
				navText					: ["Prev","Next"],
				navElement              : 'div',
				autoHeight	            : (slider_conf.height_auto_owl) == "true" 			? true 			: false,
				responsive   			: {
											0 		: {
														items: parseInt(slider_conf.slide_show_mobile_owl)
													},
											640 	: {
														items: parseInt(slider_conf.slide_show_tablet_owl)
													},
											768 	: {
														items: parseInt(slider_conf.slide_show_ipad_owl)
													},
											1024 	: {
														items: parseInt(slider_conf.slide_to_show_owl)
													},
			}	
			});
		}
	});

	// Set content div width same as image width
	var imgwidth = 0;
	$( '.wp-spaios-slider-wrap' ).each(function( index ) {
	    $('.owl-item').each(function (index, value) {
	        imgwidth = $(this).find('img').width();
	        $(this).find('.flex-caption').css('width', imgwidth);
	        $(this).find('.wp-spaios-content-wrp').css('width', imgwidth);
	    });
	});
});