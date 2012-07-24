/* 
 * jQuery Carousel Plugin created by Thomas Eynon
 * 
 ***************************************************
 * USAGE
 ***************************************************
 *
 *$('myInputBox').Carousel( params );
 *
 *Example:
 *$('#containerID').Carousel();
 * 
 */
(function($) {
	$.Carousel = { 
		index : 0
	}; 
	$.fn.Carousel = function(parameters) {
		var _this = this;
		this.elements = new Array();
		this.numPerPage = 4;
		this.page = 0;
		this.width = 0;
		this.height = "14px";
		this.leftButton = null;
		this.rightButton = null;
		this.innerBlock1 = null;
		this.innerBlock2 = null;
		this.innerBlock2_id = null;

		$.extend(_this, parameters);
		
		this.init = function() {
			var self = this;
			this.width = $(this).width();
			
			// Draw right and left arrow blocks
			
			this.leftButton = $("<div class=\"carousel_left\" style=\"-moz-user-select: none;-webkit-user-select: none; float: left; text-align: center; font-weight: bold; width: 20px; cursor: pointer;\">&lt;</div>").click(function() { self.slide("right"); });
			this.rightButton = $("<div class=\"carousel_right\" style=\"-moz-user-select: none;-webkit-user-select: none; float: right; text-align: center; font-weight: bold;  width: 20px; cursor: pointer;\">&gt;</div>").click(function() { self.slide("left"); });
		
			this.width -= $(this.leftButton).width() + $(this.rightButton).width();
			
			// Initialize the carousel elements.
			var showCss = {
				"float" : "left",
				"width" : Math.ceil(this.width / this.numPerPage),
				"text-align" : "center",
				"position" : "relative",
                                "overflow" : "hidden"
			}
			
			$('.carousel_item').each(function(index) {
				$(this).wrap("<div id=\"carousel_element_" + index + "\"></div>");
				self.elements[self.elements.length] = "carousel_element_" + index;
				$('#carousel_element_' + index).css(showCss);
			});
			
			// Wrap the elements.
			this.innerBlock1 = $("<div id='block1'></div>").css({
				"float" : "left",
				"width" : this.width - 20,
				"overflow" : "hidden",
				"white-space" : "nowrap"
			});
			this.innerBlock2 = $("<div id='Carousel_" + $.Carousel.index + "'></div>").css({
				"width" : Math.round(this.width / this.numPerPage) * this.elements.length,
				"overflow" : "hidden",
				"white-space" : "nowrap",
				"position" : "relative"
			});
			this.innerBlock2_id = "Carousel_" + $.Carousel.index;
			$.Carousel.index++;
			$(this).wrapInner($(this.innerBlock1).wrapInner($(this.innerBlock2)));
                        $(this.leftButton).css({ "line-height" : this.height });
                        $(this.rightButton).css({ "line-height" : this.height });
			$(this).prepend(this.leftButton);
			$(this).append(this.rightButton);
			
                        if (this.page + 1 >= this.elements.length / this.numPerPage) {
                            $(this).children(".carousel_right").hide();
                        }
                                
                        if (this.page -  1 <= 0) {
                            $(this).children(".carousel_left").hide();
                        }
                        
			$(this).css({ "white-space" : "nowrap", "overflow" : "hidden" });
			
			$(this).append("<br clear=\"all\" />");
		}
		
		this.slide = function(direction) {
			
			if (direction == "left") {
				if (this.page + 1 < this.elements.length / this.numPerPage) {
					this.page++;
					// Hide the current page.
					$("#" + this.innerBlock2_id).animate({ "left" : "-=" + this.width + "px" }, "slow");
				}
                                
                                // If no pages left, hide the right button.
                                if (this.page + 1 >= this.elements.length / this.numPerPage) {
                                    $(this).children(".carousel_right").hide();
                                }
                                if (this.page - 1 >= 0) {
                                    $(this).children(".carousel_left").show();
                                }
			}
			if (direction == "right") {
				// Hide the current page.
				if (this.page - 1 >= 0) {
					this.page--;
					//$('#' + this.id + '_page_' + this.page).hide("slide", { direction : "right" }, 1000);
					$("#" + this.innerBlock2_id).animate({ "left" : "+=" + this.width + "px" }, "slow");
				}
                                
                                if (this.page -  1 <= 0) {
                                    $(this).children(".carousel_left").hide();
                                }
                                
                                if (this.page + 1 < this.elements.length / this.numPerPage) {
                                    $(this).children(".carousel_right").show();
                                }
			}
		}
		
		this.init();
	}
})( jQuery );