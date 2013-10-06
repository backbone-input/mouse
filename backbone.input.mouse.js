/*
 * Backbone Input: Mouse
 * Source: https://github.com/backbone-input/mouse
 *
 * Created by Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function($, _, Backbone, APP) {

	// support for Backbone APP() view if available...
	var View = ( typeof APP != "undefined" && !_.isUndefined( APP.View ) ) ? APP.View : Backbone.View;

	var MouseEnabled = View.extend({

		options: {
			monitor
		},

		state : {
			hover : false
		},
		/* example events:*/
		events: {
			'mouseover *' : '_mouseover',
			'mousemove *' : '_mousemove'
		},

		monitor: function( state ){

			switch( state ){
				case "move":
					this.el.addEventListener( 'mousemove', bind( this, this._mousemove ), false );
				break;
				case "click":
					this.el.addEventListener( 'mousedown', bind( this, this._mousedown ), false );
					this.el.addEventListener( 'mouseup',   bind( this, this._mouseup ), false );
				break;

			}


		},

		_mousedown: function( e ) {
			// set position of mouse
			this.mouse = {
				x : e.pageX,
				y : e.pageY
			};
			// use clientX instead of pageX?
			//console.log("mouse pressed");
			if(this.mousedown) this.mousedown( e );
		},

		_mouseup: function( e ) {
			//console.log("mouse released");
		},

		_mouseover: function( e ) {
			//console.log("mouseover");
			//console.log( e );
			this.state.hover = true;
		},

		_mousemove: function( e ) {
			this.mouse = {
				x : e.pageX,
				y : e.pageY
			};
		}

	});

	// Helpers

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};

	// fallbacks

	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = MouseEnabled;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			define( "backbone.input.mouse", [], function () { return MouseEnabled; } );
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		// update APP namespace
		if( typeof APP != "undefined" && !_.isUndefined( APP.View ) ){
			APP.View = MouseEnabled;
			window.APP = APP;
		} else {
			Backbone.View = MouseEnabled;
			window.Backbone = Backbone;
			//return Backbone;
		}
	}


})(this.jQuery, this._, this.Backbone, this.APP);
