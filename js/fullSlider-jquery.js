'use strict';

(function($) {

	$.fn.fullSlider = function(params) {
		
		if (this.length > 1) {
			this.each(function() {
				$(this).fullSlider(params);
			});
			return this;
		}
		
		var slider = $(this),
			items,
			inner,
			scrollWidth,
			timer,
			options = $.extend({
				speed: .5,
				after: function() {},
				before: function() {}
			}, params);
		
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
			
			setStyle();
			setOffset();
		};
		
		
		init();
		
		
		function setStyle() {
			slider.find('.scroll-bar').css({
				transition: 'transform ' + options.speed + 's'
			});
			
			slider.find('.item').css({
				transition: 'all ' + options.speed + 's cubic-bezier(.68,-0.55,.27,1.55)'
			});
		}
		
		
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
			
			if(typeof options.before === 'function') {
				options.before(item);
			}
			
			items
				.removeClass('active')
				.parent()
				.find('.item')
				.eq(itemIndex)
				.addClass('active');
			
			scroll(itemIndex);
			
			if(typeof options.after === 'function') {
				
				clearTimeout(timer);
				
				timer = setTimeout(function() {
					options.after(items.parent().find('.item').eq(itemIndex));
				}, options.speed * 1000);
			}
		});
		
		items.click(function() {
			var that = $(this);
			
			if(typeof options.before === 'function') {
				options.before(items.parent().find('.active'));
			}
			
			items.removeClass('active');
			that.addClass('active');
			scroll(that.index());
			
			if(typeof options.after === 'function') {
				
				clearTimeout(timer);
				
				timer = setTimeout(function() {
					options.after(that);
				}, options.speed * 1000);
			}
		});
		
		$(window).resize(function(e) {
			setOffset();
			scroll(items.parent().find('.active').index());
		});
	};
})(jQuery);
