'use strict';

(function($) {

	$.fn.fullSlider = function() {
		
		if (this.length > 1) {
			this.each(function() {
				$(this).fullSlider();
			});
			return this;
		}
		
		var slider = $(this),
			items,
			inner,
			scrollWidth;
		
		var init = function() {
			
			console.log('init');
			
			if(!slider.length) {
				console.log('Error: slider no exists.');
				return;
			}
			
			inner = slider.find('.inner');
			
			if(!inner.length) {
				console.log('Error: slider structure no completed.');
				return;
			}
			
			items = slider.find('.item');
			
			if(!items.length) {
				console.log('Error: items no exists.');
				return;
			}
			
			setOffset();
		};
		
		init();
		
		function scroll(index) {
			slider.find('.scroll-bar').css({
				transform: 'translateX(-' + (inner.width()*index) + 'px)'
			});
		}
		
		function setOffset() {
			scrollWidth = inner.width() * items.length;
			items.width(inner.width());
			slider.find('.scroll-bar').width(scrollWidth);
		}
		
		slider.on('mousewheel DOMMouseScroll', function(event) {
			
			event.preventDefault();
			
			var e = event.originalEvent,
				item = items.parent().find('.active'),
				itemIndex = item.index();
			
			if (e.wheelDelta > 0 || e.detail < 0) {
		       itemIndex = item.index()-1;
		    }
		    
		    else {
		       itemIndex = item.index()+1;
		    }
		    
		    if(itemIndex < 0) {
		    	itemIndex = 0;
		    }
		    
			if(itemIndex > (items.length-1)) {
				itemIndex = items.length-1;
			}
			
			items
				.removeClass('active')
				.parent()
				.find('.item')
				.eq(itemIndex)
				.addClass('active');
				
			scroll(itemIndex);
		});
		
		items.click(function() {
			var that = $(this);
			items.removeClass('active');
			that.addClass('active');
			scroll(that.index());
		});
		
		$(window).resize(function(e) {
			setOffset();
			scroll(items.parent().find('.active').index());
		});
	};
})(jQuery);
