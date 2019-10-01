jQuery(document).ready(function($){    
	/* For SliderJsSlider */
	$( '.wp-spaios-responsive-slider-container' ).each(function( index ) {

		var slider_id   = $(this).attr('id');
		var slider_conf = $.parseJSON( $(this).closest('.wp-spaios-slider-wrap').find('.wp-spaios-conf').text());

		if( typeof(slider_id) != 'undefined' && slider_id != '' ) {

			jQuery('#'+slider_id).slidesjs({

				width: parseInt(slider_conf.width_js),
				height: parseInt(slider_conf.height_js),
				start: parseInt(slider_conf.start_js),

				navigation: {
					active:(slider_conf.arrow) == "true" ? true 	: false,
					effect: slider_conf.effect_js	,
				},
				pagination: {
					active:(slider_conf.pagination) == "true"	? true 	: false,
					effect: slider_conf.effect_js,
				},
				 play: {
						active: (slider_conf.autoplay) == "true"	? true 	: false,
						effect: slider_conf.effect_js,
						interval: parseInt(slider_conf.autoplay_speed),
						auto: (slider_conf.autoplay) == "true"	? true 	: false,
						swap: true,
						pauseOnHover 	: (slider_conf.pauseon_over_js) == "true"  ? true : false,
						restartDelay: 2500,
					},
				effect: {
					slide: {
						speed: parseInt(slider_conf.speed)
					},
					fade: {
						speed: parseInt(slider_conf.speed),
						crossfade: true
					}
				},
			});
		}
	});
});