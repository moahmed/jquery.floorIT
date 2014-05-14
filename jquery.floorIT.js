/*!
 * jQuery lightweight plugin floorIT
 * Original author: @mohd mo.ahmed@hmi-tech.net
 * Licensed under the MIT license
 */
;(function( $ ) {
 
    $.fn.floorIT = function( options ) {
		
		var that = this;
		var settings = $.extend({
			maxRotate: 90
		}, options );
		
		return this.each(function() {
			
			var $this = $(this)
			$this.wrap('<div class="floorIT-warpper"></div>');
			
			var wrapper = $this.parent();
			
			wrapper.append('<div class="floorIT-overlay">TOP control</div>');
			wrapper.append('<div class="floorIT-overlay">BOTTOM control</div></div>');
			
			if (settings.maxRotate) {
				wrapper.mousemove(function(event){
					var x = event.pageX - wrapper.offset().left;
					var y = event.pageY - wrapper.offset().top;
					var w = wrapper.width();
					var h = wrapper.height();
					var m = settings.maxRotate;
					var g = 30;
					
					if (y<g||y>(w-g)||x<g||x>(h-g)) {
						wrapper.css('cursor','default');
						$this.css('transform', 'none');
					} else {
						wrapper.css('cursor','move');
						x = (m/(w-g)) * x;
						y = (m/(h-g)) * y;
						$this.css('transform','rotateY('+x+'deg) rotateX('+y+'deg)');
					}

				}).mouseleave(function(){
					$this.css('transform', 'none');
				});
			}
			
    	});
 
    };
 
}( jQuery ));
