jQuery(document).ready(function($){
	/* For Carousel Slider */
	$( '.wp-spaios-swiper-wrapper' ).each(function( index ) {

		var image_wrp 	= $(this).find('.swiper-slide img');
		var img_height 	= $(this).attr('data-img-height');
		if(img_height) {
			image_wrp.css('height',img_height);
		}

		var slider_id   = $(this).attr('id');
		var slider_conf = $.parseJSON( $(this).closest('.wp-spaios-slider-wrap').find('.wp-spaios-conf').text());

		if( typeof(slider_id) != 'undefined' && slider_id != '' ) {	

			var swiper = new Swiper('#'+slider_id, {
				slidesPerView 		: parseInt(slider_conf.slide_to_show),
				slidesPerGroup 		: parseInt(slider_conf.slide_to_column),
				centeredSlides		: (slider_conf.centermode) == "true" 	? true 	: false,
				paginationHide 		: (slider_conf.pagination) == "true" 	? false : true,
				autoplay 			: (slider_conf.autoplay) == "true" ? parseInt(slider_conf.autoplay_speed) : '' ,
				spaceBetween 		: parseInt(slider_conf.space_between),
				speed 				: parseInt(slider_conf.speed),			
				loop				: (slider_conf.loop) == "true" 				? true 		: false,
				effect 				: (slider_conf.animation_swpr) == "fade" 	? 'fade' 	: 'slide',				
				direction			: (slider_conf.direction_swpr) == "vertical" 	? 'vertical' 	: 'horizontal',
				autoplayStopOnLast 	: (slider_conf.auto_stop) == "true" 			? true 			: false,
				pagination 			: '.swiper-pagination',
				paginationClickable : true,
				disableOnInteraction: false,
				nextButton 			: '.swiper-button-next',
				prevButton 			: '.swiper-button-prev',
				height 				: 500,
				autoHeight			: (slider_conf.height_auto_swiper) == "true" 			? true 			: false,
				breakpoints 		: {
										/* when window width is <= 320px */
										320: {
										  slidesPerView: parseInt(slider_conf.slide_show_mobile_swpr),
										},
										/* when window width is <= 480px */
										480: {
										  slidesPerView: parseInt(slider_conf.slide_show_tablet_swpr),
										},
										/* when window width is <= 640px */
										640: {
										  slidesPerView: parseInt(slider_conf.slide_show_ipad_swpr),
										}
				}
			});
		}
	});
});