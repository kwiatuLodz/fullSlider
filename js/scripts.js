(function() {
	$('.full-slider').fullSlider({
		speed: 1,
		before: function(item) {
			console.log('before');
		},
		after: function(item) {
			console.log('after');
		}
	});
})();
