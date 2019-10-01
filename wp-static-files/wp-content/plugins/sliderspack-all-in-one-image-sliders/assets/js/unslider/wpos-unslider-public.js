jQuery(document).ready(function($){    
	/* For unslider */
	$( '.wp-spaios-unslider-container' ).each(function( index ) {

		var slider_id   = $(this).attr('id');
		var slider_conf = $.parseJSON( $(this).closest('.wp-spaios-slider-wrap').find('.wp-spaios-conf').text());
		if( typeof(slider_id) != 'undefined' && slider_id != '' ) {

			jQuery('#'+slider_id).unslider({				
				animation		: slider_conf.mode_un,
				autoplay		: (slider_conf.autoplay) == "true" 		? true 	: false,
				delay			: parseInt(slider_conf.autoplay_speed),
				arrows			: (slider_conf.arrow) == "true" 		? true 	: false,
				nav				: (slider_conf.pagination) == "true" 	? true 	: false,
				speed			: parseInt(slider_conf.speed),
				animateHeight	: (slider_conf.height_auto_un) == "true" 	? true 	: false,
			});
		}
	});
});