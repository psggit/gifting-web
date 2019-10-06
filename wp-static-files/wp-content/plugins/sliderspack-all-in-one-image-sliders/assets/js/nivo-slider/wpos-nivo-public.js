jQuery(document).ready(function($){
	$( '.wp-spaios-nivoslider-container' ).each(function( index ) {
		var slider_id   = $(this).attr('id');
		var slider_conf = $.parseJSON( $(this).closest('.wp-spaios-slider-wrap').find('.wp-spaios-conf').text());

		if( typeof(slider_id) != 'undefined' && slider_id != '' ) {

			jQuery('#'+slider_id).nivoSlider({
				effect 			: slider_conf.effect_nivo,
				manualAdvance	: (slider_conf.autoplay) 			== "true" 	? false : true,
				animSpeed		: parseInt(slider_conf.speed),
				pauseTime		: parseInt(slider_conf.autoplay_speed),
				startSlide		: parseInt(slider_conf.start_nivo),
				directionNav	: (slider_conf.arrow) 				== "true" 	? true 	: false,
				controlNav		: (slider_conf.pagination) 			== "true" 	? true 	: false,
				pauseOnHover	: (slider_conf.pauseon_over_nivo) 	== "true" 	? true 	: false,
				randomStart 	: (slider_conf.random_start_nivo) 	== "true" 	? true 	: false,
				captionOpacity 	: 1,
				afterLoad 		: function(){$('#'+slider_id+' .nivo-caption').css("left","0")},
				beforeChange	: function(){$('#'+slider_id+' .nivo-caption').css("left","0")},
				afterChange		: function(){$('#'+slider_id+' .nivo-caption').css("left","0")}
			});
		}
	});
});