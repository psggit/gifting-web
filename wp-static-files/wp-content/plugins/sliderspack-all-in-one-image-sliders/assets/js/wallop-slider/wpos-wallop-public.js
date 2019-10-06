jQuery(document).ready(function($){   

	/* Wallop unslider */
	$( '.wp-spaios-wallop-container' ).each(function( index ) {

		var slider_id   	= $(this).attr('id');
		var current_object  = $(this);
		var slider_conf 	= $.parseJSON( $(this).closest('.wp-spaios-slider-wrap').find('.wp-spaios-conf').text());
		if( typeof(slider_id) !== 'undefined' && slider_id != '' ) {

			var wallopEl 		= document.querySelector('#'+slider_id);
			var wallop 			= new Wallop(wallopEl);
			var count 			= wallop.allItemsArrayLength;
			var start 			= wallop.currentItemIndex;
    		var end 			= count+1;
			var current_dot 	= $(this).find('.Wallop-dot');
			var paginationDots 	= Array.prototype.slice.call(current_dot);

			paginationDots.forEach(function (dotEl, index) {
				dotEl.addEventListener('click', function() {
					wallop.goTo(index);
				});
			});

			/* Listen to wallop change and update classes */
			wallop.on('change', function(event) {
			  current_object.find('.Wallop-dot--current').removeClass('Wallop-dot--current');		
			  addClass(paginationDots[event.detail.currentItemIndex], 'Wallop-dot--current');
			});

			// Helpers
			function addClass(element, className) {
			  if (!element) { return; }
			  element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
			}
		}
	});
});