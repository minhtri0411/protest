/*
 *  jquery-boilerplate - v4.0.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "myslider",
			defaults = {
				propertyName: "value",
				nav: true,
				pagination: true
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;

			this.slider_wapper = '';
			this._size = 0;
			this.current_item = 0;
			this.init();

			var self = this,
			btn_prev = $(this.element).find(".slider-controls .slide-prev"),
			btn_next = $(this.element).find(".slider-controls .slide-next"),
			btn_goto = $(this.element).find(".slider-paginate .node")

			btn_next.on('click', function() { // event next
					self.snext(self._size);
			});
			btn_prev.on('click', function() { // event prev
					self.sprev(self._size);
			});
			btn_goto.on('click', function() { // event goto: dùng cho phân trang
					var node_next = $(this).text() - 1;
					self.sgoto(node_next,self._size);
			});
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {
				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example bellow
				$(this.element).addClass("myslider")
				var html_content = $(this.element).html();
 				$(this.element).html ("<div class='slider_wapper'>"+html_content+"</div>");

				this.slider_wapper = $( this.element ).find(".slider_wapper");
				this._size = this.slider_wapper.children().length; // số lượng slide
				this.current_item = 0; //  vị trí slider đang được active (0: slide đầu tiên)
				this._child_active = this.slider_wapper.children().first(); // element slide đang được kích hoạt
				$(this._child_active).addClass("active"); // show slide đầu tiên khi vừa load xong

				if(this.settings.nav){
					this.addControl(); // thêm nút chuyển slider
				}
				if(this.settings.pagination){
					this.addPaginate(this._size); // thêm phân trang cho slider
				}
				this.slider_paginate = $( this.element ).find(".slider-paginate");
				$(this.slider_paginate).children().first().addClass("active");
			},
			addControl:function(){
				var html = "<div class='slider-controls'><span class='slide-prev'>Prev</span><span class='slide-next'>Next</span></div>";
				$( this.element ).append(html);
			},

			addPaginate:function(size){
				var html = "<div class='slider-paginate'>";
				for(var i = 1; i <= size; i++){
					html += "<span class='node'>"+i+"</span>";
				}
				html+="</div>";
				$( this.element ).append(html);
			},

			snext: function(size_sider) {
					this.current_item += 1;
					if(this.current_item >= size_sider){
						this.current_item = 0;
					}
					$( this.slider_wapper ).children().removeClass("active");
					$( this.slider_wapper ).children().eq( this.current_item ).addClass( "active" );
					$( this.slider_paginate ).children().removeClass("active");
					$( this.slider_paginate ).children().eq( this.current_item ).addClass( "active" );
			},

			sprev: function(size_sider) {
				this.current_item -= 1;
				if(this.current_item < 0){
					this.current_item = size_sider - 1;
				}
				$( this.slider_wapper ).children().removeClass("active");
				$( this.slider_wapper ).children().eq( this.current_item ).addClass( "active" );
				$( this.slider_paginate ).children().removeClass("active");
				$( this.slider_paginate ).children().eq( this.current_item ).addClass( "active" );
			},

			sgoto:function(index, size_sider) {
				if(index >= 0 && index < size_sider){
					this.current_item = index;
					$( this.slider_wapper ).children().removeClass("active");
					$( this.slider_wapper ).children().eq(index).addClass( "active" );
					$( this.slider_paginate ).children().removeClass("active");
					$( this.slider_paginate ).children().eq(index).addClass( "active" );
				}
			}

		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
