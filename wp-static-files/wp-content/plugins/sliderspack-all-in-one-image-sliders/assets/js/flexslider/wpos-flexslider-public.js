jQuery(document).ready(function($){    
	/* For FlexSlider */
	$( '.wp-spaios-flexslider-container' ).each(function( index ) {

		var designs = "<?php echo $design_type; ?>"
		var slider_id   = $(this).attr('id');
		var slider_conf = $.parseJSON( $(this).closest('.wp-spaios-slider-wrap').find('.wp-spaios-conf').text());

		if( typeof(slider_id) != 'undefined' && slider_id != '' ) {

			jQuery('#'+slider_id).flexslider({
				selector				: ".slides > .flex-slide",
				animation				: slider_conf.animation_flex,
				itemMargin				: parseInt(slider_conf.slide_margin_flex),
				animationLoop			: (slider_conf.loop) 				== "true" 	? true 	: false,
				itemWidth				: parseInt(slider_conf.slide_width_flex),
				minItems				: parseInt(slider_conf.slide_to_show_flex),
				maxItems				: parseInt(slider_conf.max_slide_to_show_flex),
				move					: parseInt(slider_conf.slide_to_scroll_flex),
				animationSpeed			: parseInt(slider_conf.speed),
				startAt					: parseInt(slider_conf.start_slide_flex),
				randomize				:(slider_conf.random_start_flex) 	== "true" 	? true 	: false,		
				touch					:true,
				directionNav			: (slider_conf.arrow) 				== "true" 	? true 	: false,
				controlNav				: (slider_conf.pagination) 			== "true" 	? true 	: false,
				slideshow				: (slider_conf.autoplay) 			== "true" 	? true 	: false,
				slideshowSpeed			: parseInt(slider_conf.autoplay_speed),	
				pauseOnHover			: (slider_conf.ticker_hover_flex) 	== "true" 	? true 	: false,
				pauseOnAction 			: true,
				smoothHeight			: (slider_conf.height_auto_flex) 	== "true" 	? true 	: false,
				start					: function(slider) {										
												slider.removeClass('wp-spaios-hidden');
										}	
			});
		}
	});

	$('.flex-direction-nav').addClass('designs');
});