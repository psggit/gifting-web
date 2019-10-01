jQuery(document).ready(function($){    
	/* For Carousel Slider */
	$( '.wp-spaios-swiper-3dcarousel-wrapper' ).each(function( index ) {

		var slider_id   = $(this).attr('id');
		var slider_conf = $.parseJSON( $(this).closest('.wp-spaios-slider-wrap').find('.wp-spaios-conf').text());
		// console.log(slider_conf.space_between_3d);
		if( typeof(slider_id) != 'undefined' && slider_id != '' ) {	

			var swiper = new Swiper('#'+slider_id, {
				paginationHide		: (slider_conf.pagination) 		== "true" 	? false 								: true,
				autoplay 			: (slider_conf.autoplay) 		== "true" 	? parseInt(slider_conf.autoplay_speed) 	: '',
				spaceBetween 		: parseInt(slider_conf.space_between_3d),
				speed 				: parseInt(slider_conf.speed),
				loop 				: (slider_conf.loop) 			== "true" 	? true 									: false,
				autoplayStopOnLast 	: (slider_conf.auto_stop) 		== "true" 	? true 									: false,
				pagination 			: '.swiper-pagination',
				paginationClickable : true,
				nextButton			: '.swiper-button-next',
				prevButton 			: '.swiper-button-prev',
				effect				: 'coverflow',
				centeredSlides		: (slider_conf.centermode_3d)	== "true" 	? true 									: false,
				slidesPerView 		: parseInt(slider_conf.slide_to_show_3d),
				slidesPerGroup 		: parseInt(slider_conf.slide_to_scroll_3d),
				coverflow 			: {
										rotate 			: 0,
										stretch 		: 0,
										depth 			: parseInt(slider_conf.depth),
										modifier  		: parseInt(slider_conf.modifier),
										slideShadows 	: false
									},
				breakpoints 		: {
										/* when window width is <= 320px */
										320: {
										  slidesPerView: parseInt(slider_conf.slide_show_mobile_3d),
										},
										/* when window width is <= 480px */
										480: {
										  slidesPerView: parseInt(slider_conf.slide_show_tablet_3d),
										},
										/* when window width is <= 640px */
										640: {
										  slidesPerView: parseInt(slider_conf.slide_show_ipad_3d),
										}
									}
			});
		}
	});
});