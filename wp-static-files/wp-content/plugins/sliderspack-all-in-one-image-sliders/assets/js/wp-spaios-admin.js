jQuery( document ).ready(function( $ ) {

	/* Select Images OR Post Type Js */
	var post_gallery 		= $("input[name$='_spaios_check_post_gallery']:checked").val();
	if(post_gallery == 'gallery') {
		$(".wp-spaios-gallery-media-image").show();
		$(".wp-spaios-posttype-settings").hide();
		$('.wp-spaios-acf-gallery').hide();
		$('.wp-spaios-link-target').show();
		$('.swiperslider_caption').show();

		var slider_autoplay = $("input[name$='_spaios_autoplay']:checked").val();
		//alert(slider_autoplay);
		if(slider_autoplay == 'true'){
			var style = jQuery( '#slider-type' ).val();	
			if(style == 'wallop-slider' || style == 'polaroids-gallery') {
				$(".wallop_autoplay_speed").hide();	
				$(".wallop_slider_speed").hide();	
			} else {
				$(".wallop_autoplay_speed").show();	
				$(".wallop_slider_speed").show();	
			}
		} else {
			$(".wallop_autoplay_speed").hide();
		}
	} else if(post_gallery == 'post') {
		$(".wp-spaios-gallery-media-image").hide();
		$(".wp-spaios-posttype-settings").show();
		$('.swiperslider_caption').hide();
		$('.wp-spaios-acf-gallery').hide();
		$('.wp-spaios-link-target').show();

		/* Select Post Content Js */
		var ptype_content 	= $("input[name$='_spaios_slide_ptype_content']:checked").val();
		var style 			= jQuery( '#slider-type' ).val();
		if(style == 'polaroids-gallery') {
			$(".wp-spaios-scattered-sett").hide();
		} else {
			if( ptype_content == 'true' ) {
				$(".wp-spaios-ptypereadmore-settings").show();
				$(".wp-spaios-postwordlimit-settings").show();

				/* Select Readmore Button Js*/
				var content_readmore_btn = $("input[name$='_spaios_slide_ptype_readmorebtn']:checked").val();
					if(content_readmore_btn == 'true') {
						$(".wp-spaios-readmoretext-settings").show();
					} else {
						$(".wp-spaios-readmoretext-settings").hide();
					}
			} else {
				$(".wp-spaios-ptypereadmore-settings").hide();
				$(".wp-spaios-postwordlimit-settings").hide();
				$(".wp-spaios-readmoretext-settings").hide();
			}
		}

		var slider_autoplay = $("input[name$='_spaios_autoplay']:checked").val();
		
		/*if(style == 'polaroids-gallery') {
			$('.wp-spaios-scattered-sett').hide();
		} else {
			$('.wp-spaios-scattered-sett').show();
		}*/

		if(slider_autoplay == 'true') {
			if(style == 'wallop-slider' || style == 'polaroids-gallery'){
				$(".wallop_autoplay_speed").hide();	
				$(".wallop_slider_speed").hide();	
			} else {
				$(".wallop_autoplay_speed").show();	
				$(".wallop_slider_speed").show();	
			}
		} else {
			$(".wallop_autoplay_speed").hide();
		}
	} else {
		$('.wp-spaios-acf-gallery').show();
		$(".wp-spaios-gallery-media-image").hide();
		$(".wp-spaios-posttype-settings").hide();
		$('.wp-spaios-link-target').hide();
		$('.swiperslider_caption').show();

		var slider_autoplay = $("input[name$='_spaios_autoplay']:checked").val();

		if(slider_autoplay == 'true'){
			var style = jQuery( '#slider-type' ).val();
			if(style == 'wallop-slider' || style == 'polaroids-gallery') {
				$(".wallop_autoplay_speed").hide();	
				$(".wallop_slider_speed").hide();	
			} else {
				$(".wallop_autoplay_speed").show();	
				$(".wallop_slider_speed").show();	
			}
		} else {
			$(".wallop_autoplay_speed").hide();
		}
	}

	/* Hide / show setting on change */
	jQuery( "#slider-type" ).change(function() {
		var style = jQuery( this ).val();
		var post_gallery = $("input[name=_spaios_check_post_gallery]:checked").val();

		$('[id^="slider-setting"]').hide();
		if( style == 'bxslider' ) {
			$('.wp-spaios-bxslider-settings').show();
		} else if( style == 'flexslider' ) {
			$('.wp-spaios-flexslider-settings').show();
		} else if( style == 'owl-slider' ) {
			$('.wp-spaios-owlslider-settings').css('display','block');
		} else if( style == 'slidesjs' ) {
			$('.wp-spaios-slidejs-slider-settings').css('display','block');
		} else if( style == 'nivo-slider' ) {
			$('.wp-spaios-nivo-slider-settings').css('display','block');
		} else if( style == '3dslider' ) {
			$('.wp-spaios-3d-slider-settings').css('display','block');
		} else if( style == 'swiperslider' ) {
			$('.wp-spaios-swiper-slider-settings').css('display','block');
		/*}else if(style == 'polaroids-gallery'){
			$('.wp-spaios-flexslider-settings').css('display','block'); */
		} else if( style == 'wallop-slider' ) {
			$('.wp-spaios-wallop-slider-settings').css('display','block');
		} else if( style == 'un-slider' ) {
			$('.wp-spaios-un-slider-settings').css('display','block');
		} else {
			$('#slider-setting').css('display','none');
		}

		if( style == 'polaroids-gallery' ) {
			$('[id^="common_setting"]').hide();
		} else {
			$('[id^="common_setting"]').show();
		}

		if( style == 'wallop-slider' || style == 'polaroids-gallery' ){
			$('.wallop_autoplay').hide();
			$('.wallop_autoplay_speed').hide();
			$('.wallop_slider_speed').hide();
			$('.wallop_loop').hide();
		} else {
			$('.wallop_autoplay').show();
			$('.wallop_autoplay_speed').show();
			$('.wallop_slider_speed').show();
			$('.wallop_loop').show();
		}

		if( style == 'un-slider' || style == 'slidesjs' || style == 'nivo-slider' || style == 'polaroids-gallery' ) {
			$('.nivo_loop').hide();
			$('.slidesjs_loop').hide();
			$('.unslider_loop').hide();
		} else {
			$('.nivo_loop').show();
			$('.slidesjs_loop').show();
			$('.unslider_loop').show();
		}

		/* Select Post type Js*/
		if( post_gallery == 'gallery' || post_gallery == 'acf-gallery') {
			$('.swiperslider_caption').show();
			$('.wp-spaios-scattered-sett').hide();
		} else {
			$('.swiperslider_caption').hide();
			if(style == 'polaroids-gallery') {
				$('.wp-spaios-scattered-sett').hide();
			} else {
				$('.wp-spaios-scattered-sett').show();
			}
		}

		/* Select Autoplay Js */
		var slider_autoplay = $("input[name$='_spaios_autoplay']:checked").val();    
		if( slider_autoplay == 'true' ) {
			if(style == 'wallop-slider' || style == 'polaroids-gallery'){
				$(".wallop_autoplay_speed").hide();	
				$(".wallop_slider_speed").hide();	
			} else {
				$(".wallop_autoplay_speed").show();
				$(".wallop_slider_speed").show();
			}
		} else {
			$(".wallop_autoplay_speed").hide();
		}
	});	

	/* Click Event Post Type */
	$("input[name$='_spaios_check_post_gallery']").click(function() {
		var post_gallery = $(this).val();
		if(post_gallery == 'gallery'){
			$(".wp-spaios-gallery-media-image").show();
			$(".wp-spaios-posttype-settings").hide();
			$('.wp-spaios-acf-gallery').hide();
			$('.wp-spaios-link-target').show();
			$('.swiperslider_caption').show();

		} else if(post_gallery == 'post') {
			$(".wp-spaios-gallery-media-image").hide();
			$(".wp-spaios-posttype-settings").show();
			$('.swiperslider_caption').hide();
			$('.wp-spaios-acf-gallery').hide();
			$('.wp-spaios-link-target').show();

			/* Select Post Content */
			var ptype_content 	= $("input[name$='_spaios_slide_ptype_content']:checked").val();
			var style 			= jQuery( '#slider-type' ).val();
			
			if(style == 'polaroids-gallery') {
				$('.wp-spaios-scattered-sett').hide();
			} else {
				if( ptype_content == 'true' ){
					$(".wp-spaios-ptypereadmore-settings").show();
					$(".wp-spaios-postwordlimit-settings").show();

					/* Select Readmore Button */
					var content_readmore_btn = $("input[name$='_spaios_slide_ptype_readmorebtn']:checked").val();
					if(content_readmore_btn == 'true'){
						$(".wp-spaios-readmoretext-settings").show();
					} else {
						$(".wp-spaios-readmoretext-settings").hide();
					}
				} else {
					$(".wp-spaios-ptypereadmore-settings").hide();
					$(".wp-spaios-postwordlimit-settings").hide();
					$(".wp-spaios-readmoretext-settings").hide();
				}
			}

			/*if(style == 'polaroids-gallery') {
				$('.wp-spaios-scattered-sett').hide();
			} else {
				$('.wp-spaios-scattered-sett').show();
			}*/
		} else {
			$('.wp-spaios-acf-gallery').show();
			$(".wp-spaios-gallery-media-image").hide();
			$(".wp-spaios-posttype-settings").hide();
			$('.wp-spaios-link-target').hide();
			$('.swiperslider_caption').show();
		}
	});

	/* Click Event Post Content */
	$("input[name$='_spaios_slide_ptype_content']").click(function() {
		var ptype_content = $(this).val();
		if(ptype_content == 'true') {
			$(".wp-spaios-ptypereadmore-settings").show();
			$(".wp-spaios-postwordlimit-settings").show();

			/* Select Readmore Button */
			var content_readmore_btn = $("input[name$='_spaios_slide_ptype_readmorebtn']:checked").val();
			if(content_readmore_btn == 'true') {
				$(".wp-spaios-readmoretext-settings").show();
			} else {
				$(".wp-spaios-readmoretext-settings").hide();
			}
		} else {
			$(".wp-spaios-ptypereadmore-settings").hide();
			$(".wp-spaios-postwordlimit-settings").hide();
			$(".wp-spaios-readmoretext-settings").hide();
		}
	});

	/* Click Event Readmore Button */
	$("input[name$='_spaios_slide_ptype_readmorebtn']").click(function() {
		var content_readmore_btn = $(this).val();
		if(content_readmore_btn == 'true'){
			$(".wp-spaios-readmoretext-settings").show();
		} else {
			$(".wp-spaios-readmoretext-settings").hide();
		}
	});

	/* Click Event Autoplay */
	$("input[name$='_spaios_autoplay']").click(function() {	
		var slider_autoplay = $(this).val();
		if(slider_autoplay == 'true'){
			$(".wallop_autoplay_speed").show();	
		} else {
			$(".wallop_autoplay_speed").hide();
		}
	});

	/* Media Uploader */
	$( document ).on( 'click', '.wp-spaios-img-uploader', function() {

		var imgfield, showfield;
		imgfield			= jQuery(this).prev('input').attr('id');
		showfield 			= jQuery(this).parents('td').find('.wp-spaios-imgs-preview');
		var multiple_img	= jQuery(this).attr('data-multiple');
		multiple_img 		= (typeof(multiple_img) != 'undefined' && multiple_img == 'true') ? true : false;

		if( typeof wp == "undefined" || WpSpaiosAdmin.new_ui != '1' ) { // check for media uploader

			tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');

			window.original_send_to_editor = window.send_to_editor;
			window.send_to_editor = function(html) {

				if(imgfield)  {

					var mediaurl = $('img',html).attr('src');
					$('#'+imgfield).val(mediaurl);
					showfield.html('<img src="'+mediaurl+'" />');
					tb_remove();
					imgfield = '';

				} else {
					window.original_send_to_editor(html);
				}
			};
				return false;

		} else {

			var file_frame;
			/*window.formfield = ''; */

			/*new media uploader */
			var button = jQuery(this);

			/* If the media frame already exists, reopen it. */
			if ( file_frame ) {
				file_frame.open();
			  return;
			}

			if( multiple_img == true ) {

				/* Create the media frame. */
				file_frame = wp.media.frames.file_frame = wp.media({
					title: button.data( 'title' ),
					button: {
						text: button.data( 'button-text' ),
					},
					multiple: true  /* Set to true to allow multiple files to be selected */
				});

			} else {

				/* Create the media frame. */
				file_frame = wp.media.frames.file_frame = wp.media({
					frame: 'post',
					state: 'insert',
					title: button.data( 'title' ),
					button: {
						text: button.data( 'button-text' ),
					},
					multiple: false  /* Set to true to allow multiple files to be selected */
				});
			}

			file_frame.on( 'menu:render:default', function(view) {
				/* Store our views in an object. */
				var views = {};

				/* Unset default menu items */
				view.unset('library-separator');
				view.unset('gallery');
				view.unset('featured-image');
				view.unset('embed');

				/* Initialize the views in our view object. */
				view.set(views);
			});

			/* When an image is selected, run a callback. */
			file_frame.on( 'select', function() {

				/* Get selected size from media uploader */
				var selected_size = $('.attachment-display-settings .size').val();
				var selection = file_frame.state().get('selection');

				selection.each( function( attachment, index ) {

					attachment = attachment.toJSON();

					/* Selected attachment url from media uploader */
					var attachment_id = attachment.id ? attachment.id : '';
					if( attachment_id && attachment.sizes && multiple_img == true ) {

						var attachment_url 			= attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;
						var attachment_edit_link	= attachment.editLink ? attachment.editLink : '';

						showfield.append('\
							<div class="wp-spaios-img-wrp">\
								<div class="wp-spaios-img-tools wp-spaios-hide">\
									<span class="wp-spaios-tool-icon wp-spaios-edit-img dashicons dashicons-edit" title="'+WpSpaiosAdmin.img_edit_popup_text+'"></span>\
									<a href="'+attachment_edit_link+'" target="_blank" title="'+WpSpaiosAdmin.attachment_edit_text+'"><span class="wp-spaios-tool-icon wp-spaios-edit-attachment dashicons dashicons-visibility"></span></a>\
									<span class="wp-spaios-tool-icon wp-spaios-del-tool wp-spaios-del-img dashicons dashicons-no" title="'+WpSpaiosAdmin.img_delete_text+'"></span>\
								</div>\
								<img class="wp-spaios-img" src="'+attachment_url+'" alt="" />\
								<input type="hidden" class="wp-spaios-attachment-no" name="wp_spaios_img[]" value="'+attachment_id+'" />\
							</div>\
								');
						showfield.find('.wp-spaios-img-placeholder').hide();
					}
				});
			});

			/* When an image is selected, run a callback. */
			file_frame.on( 'insert', function() {

				/* Get selected size from media uploader */
				var selected_size = $('.attachment-display-settings .size').val();

				var selection = file_frame.state().get('selection');
				selection.each( function( attachment, index ) {
					attachment = attachment.toJSON();

					/* Selected attachment url from media uploader */
					var attachment_url = attachment.sizes[selected_size].url;

					/* place first attachment in field */
					$('#'+imgfield).val(attachment_url);
					showfield.html('<img src="'+attachment_url+'" />');
				});
			});

			/* Finally, open the modal */
			file_frame.open();
		}
	});

	/* Remove Single Gallery Image */
	$(document).on('click', '.wp-spaios-del-img', function(){
		
		$(this).closest('.wp-spaios-img-wrp').fadeOut(300, function(){ 
			$(this).remove();
			
			if( $('.wp-spaios-img-wrp').length == 0 ){
				$('.wp-spaios-img-placeholder').show();
			}
		});
	});

	/* Remove All Gallery Image */
	$(document).on('click', '.wp-spaios-del-gallery-imgs', function() {

		var ans = confirm('Are you sure to remove all images from this gallery!');

		if(ans){
			$('.wp-spaios-gallery-imgs-wrp .wp-spaios-img-wrp').remove();
			$('.wp-spaios-img-placeholder').fadeIn();
		}
	});

	/* Image ordering (Drag and Drop) */
	$('.wp-spaios-gallery-imgs-wrp').sortable({
		items: '.wp-spaios-img-wrp',
		cursor: 'move',
		scrollSensitivity:40,
		forcePlaceholderSize: true,
		forceHelperSize: false,
		helper: 'clone',
		opacity: 0.8,
		placeholder: 'wp-spaios-gallery-placeholder',
		containment: '.wp-spaios-post-sett-table',
		start:function(event,ui){
			ui.item.css('background-color','#f6f6f6');
		},
		stop:function(event,ui){
			ui.item.removeAttr('style');
		}
	});

	/* Open Attachment Data Popup */
	$(document).on('click', '.wp-spaios-img-wrp .wp-spaios-edit-img', function(){

		$('.wp-spaios-img-data-wrp').show();
		$('.wp-spaios-popup-overlay').show();
		$('body').addClass('wp-spaios-no-overflow');
		$('.wp-spaios-img-loader').show();

		var current_obj 	= $(this);
		var attachment_id 	= current_obj.closest('.wp-spaios-img-wrp').find('.wp-spaios-attachment-no').val();

		var data = {
						action      	: 'wp_spaios_get_attachment_edit_form',
						attachment_id   : attachment_id
					};
		$.post(ajaxurl,data,function(response) {
			var result = $.parseJSON(response);
			
			if( result.success == 1 ) {
				$('.wp-spaios-img-data-wrp  .wp-spaios-popup-body-wrp').html( result.data );
				$('.wp-spaios-img-loader').hide();
			}
		});
	});

	/* Close Popup */
	$(document).on('click', '.wp-spaios-popup-close', function(){
		wp_spaios_hide_popup();
	});

	/* `Esc` key is pressed */
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			wp_spaios_hide_popup();
		}
	});

	/* Save Attachment Data */
	$(document).on('click', '.wp-spaios-save-attachment-data', function(){
		var current_obj = $(this);
		current_obj.attr('disabled','disabled');
		current_obj.parent().find('.spinner').css('visibility', 'visible');

		var data = {
						action      	: 'wp_spaios_save_attachment_data',
						attachment_id   : current_obj.attr('data-id'),
						form_data		: current_obj.closest('form.wp-spaios-attachment-form').serialize()
					};
		$.post(ajaxurl,data,function(response) {
			var result = $.parseJSON(response);
			
			if( result.success == 1 ) {
				current_obj.closest('form').find('.wp-spaios-success').html(result.msg).fadeIn().delay(3000).fadeOut();
			} else if( result.success == 0 ) {
				current_obj.closest('form').find('.wp-spaios-error').html(result.msg).fadeIn().delay(3000).fadeOut();
			}
			current_obj.removeAttr('disabled','disabled');
			current_obj.parent().find('.spinner').css('visibility', '');
		});
	});
});

/* Function to hide popup */
function wp_spaios_hide_popup() {
	jQuery('.wp-spaios-img-data-wrp').hide();
	jQuery('.wp-spaios-popup-overlay').hide();
	jQuery('body').removeClass('wp-spaios-no-overflow');
	jQuery('.wp-spaios-img-data-wrp  .wp-spaios-popup-body-wrp').html('');
}