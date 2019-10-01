jQuery(document).ready(function($){
	$( '.wp-spaios-pol-gallery-container' ).each(function( index ) {
		var slider_id   = $(this).attr('id');
		if( typeof(slider_id) != 'undefined' && slider_id != '' ) {
			new Photostack( document.getElementById( slider_id ), {
				callback : function( item ) {
					//console.log(item)
				}
			} );
		};
	});
});