jQuery(document).ready(function($){    
	/* For bxSlider */
	$( '.wp-spaios-bxslider-container' ).each(function( index ) {

		var slider_id   = $(this).attr('id');
		var slider_conf = $.parseJSON( $(this).closest('.wp-spaios-slider-wrap').find('.wp-spaios-conf').text());

		if( typeof(slider_id) != 'undefined' && slider_id != '' ) {

			jQuery('#'+slider_id).bxSlider({
			mode					: (slider_conf.mode_bx),
			slideMargin				: parseInt(slider_conf.slide_margin_bx),
			infiniteLoop			: (slider_conf.loop) == "true" 						? true 			: false,
			slideWidth				: parseInt(slider_conf.slide_width_bx),
			minSlides				: parseInt(slider_conf.slide_to_show_bx),
			maxSlides				: parseInt(slider_conf.max_slide_to_show_bx),
			moveSlides				: parseInt(slider_conf.slide_to_scroll_bx),
			speed					: parseInt(slider_conf.speed),
			touchEnabled			: false,
			ticker					:(slider_conf.ticker_bx) == "true" 					? true 			: false,
			tickerHover				:(slider_conf.ticker_hover_bx) == "true" 			? true 			: false,
			responsive				:true,
			startSlide				: parseInt(slider_conf.start_slide_bx),
			adaptiveHeight			:(slider_conf.height_start_bx) == "true" 			? true 			: false,
			randomStart				:(slider_conf.random_start_bx) == "true" 			? true 			: false,
			captions				:(slider_conf.caption) == "true" 					? true 			: false,
			controls				: (slider_conf.arrow) == "true" 					? true 			: false,
			pager					: (slider_conf.pagination) == "true" 				? true 			: false,
			auto					:(slider_conf.autoplay) == "true" 					? true 			: false,
			pause					: parseInt(slider_conf.autoplay_speed),
			onSliderLoad			: function(){
										jQuery(".wp-spaios-bxslider-container").css("visibility", "visible");			
									}
			});
		}
	});
});