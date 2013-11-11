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
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;

	var MouseEnabled = View.extend({

		options: {
			monitorMove: false
		},
		// use APP.Model if available?
		params: new Backbone.Model({
			mouse: { x: 0, y: 0 }
		}),

		state : {
			hover : false
		},
		/* example events:*/
		events: {
			'mouseover' : '_mouseover',
			'mousemove' : '_mousemove', // enable this instead of the iniit
			'mousedown' : '_mousedown',
			'mouseup' : '_mouseup'
		},
		// Deprecated:
		/*
		monitor: function(){

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
		*/
		_mousedown: function( e ) {
			e.stopPropagation();
			//console.log("mouse pressed", e);
			if(this.mousedown) this.mousedown( e );
		},

		_mouseup: function( e ) {
			e.stopPropagation();
			//console.log("mouse released", e);
			if(this.mouseup) this.mouseup( e );
		},

		_mouseover: function( e ) {
			//console.log("mouseover");
			this.state.hover = true;
			if(this.mouseover) this.mouseover( e );
		},

		_mousemove: function( e ) {
			// prerequisite
			if( !this.options.monitorMove ) return;
			// set position of mouse
			this.params.set({
				mouse : {
					x : e.clientX,
					y : e.clientY
				}
			});
			// use pageX instead of clientX?
			//console.log("mousemove", this);
			if(this.mousemove) this.mousemove( e );
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
		if( isAPP ){
			APP.View = MouseEnabled;
			window.APP = APP;
		} else {
			Backbone.View = MouseEnabled;
			window.Backbone = Backbone;
			//return Backbone;
		}
	}


})(this.jQuery, this._, this.Backbone, this.APP);
