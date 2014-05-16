/*!
 * jQuery lightweight plugin floorIT
 * Original author: @mohd mo.ahmed@hmi-tech.net
 * Licensed under the MIT license
 
 
 http://text-symbols.com/html/entities-and-descriptions/
 http://ikreator.com/special-characters/
 
 */
;(function( $ ) {
 
    $.fn.floorIT = function( options ) {
		
		var that = this;
		var settings = $.extend({
			maxRotateBy: 90, // max angle of rotation
			toolBarPos: 'top', // top, left, bottom, right
			colors: {
				red : '00ff00',
				blue : 'ff0000' ,
				green : '0000ff'
			},
			padRotate3D: 60
		}, options );
		
		return this.each(function() {
			
			var $this = $(this)
			$this.wrap('<div class="floorIT-warpper"></div>');
			
			var wrapper = $this.parent();
			
			wrapper.append('<div class="floorIT-overlay">'+
				'<ul class="floorIT-menu"><li>Colors<ul><li>Color 1</li><li>Color 2</li><li>Color 3</li></ul></li>'+
				'<li>Zoom</li><li>Turn</li><li>Rotate</li></ul></div>');
			wrapper.append('<div class="floorIT-overlay">'+
						   	'<span>Right</span> BOTTOM control <span>left</span>'+
						   '</div>');
			
			var $buts = wrapper.find('.floorIT-overlay span');
			
			$buts.css('cursor','pointer');
			
			$buts.click(function() {
								 
				var myrot = getRotationDegrees($this) 
				if (this.text == 'Right') myrot += 90;
				else  myrot -= 90;
				$this.css({
						'transform' : 'rotate('+myrot+'deg)'
				});
				console.log(myrot);				
				
			});
			
			if (settings.maxRotateBy) {
				wrapper.mousemove(function(event){
					var x = event.pageX - wrapper.offset().left;
					var y = event.pageY - wrapper.offset().top;
					var w = wrapper.width();
					var h = wrapper.height();
					var m = settings.maxRotateBy;
					var g = settings.padRotate3D;
					
					if (y<g||y>(w-g)||x<g||x>(h-g)) {
						wrapper.css('cursor','default');
						$this.css({
							'transition' : "all .8s ease-in-out",  
							'transform'  : 'none',
							//'z-index'    : 0
						});
						$this.css('z-index',0);
					} else {
						wrapper.css('cursor','move');
						x = (m/(w-g)) * x;
						y = (m/(h-g)) * y;
						$this.css({
							'transition' : "none",
							'transform'  : 'rotateY('+x+'deg) rotateX('+y+'deg)',
							//'z-index'    : 1000
						});
					}

				}).mouseleave(function(){
						$this.css({
							'transition' : "all .8s ease-in-out",  
							'transform'  : 'none',
							//'z-index'    : 0
						});
				});
			}
			
    	});
		
		// private functions
		function getRotationDegrees(obj) {
			var matrix = obj.css("-webkit-transform") ||
			obj.css("-moz-transform")    ||
			obj.css("-ms-transform")     ||
			obj.css("-o-transform")      ||
			obj.css("transform");
			if(matrix !== 'none') {
				var values = matrix.split('(')[1].split(')')[0].split(',');
				var a = values[0];
				var b = values[1];
				var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
			} else { var angle = 0; }
			return (angle < 0) ? angle +=360 : angle;
		} 
		
    };
 
}( jQuery ));
