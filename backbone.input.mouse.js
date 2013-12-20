/* Backbone Input: Mouse
 * Source: https://github.com/backbone-input/mouse
 * Copyright © Makesites.org
 *
 * Initiated by Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function($, _, Backbone, APP) {

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;

	var Mouse = View.extend({

		options: {
			monitorMove: false,
			monitor: [] // possible values: "up", "down", "move", "over", "drag"
		},
		// use APP.Model if available?
		params: new Backbone.Model({
			mouse: { x: 0, y: 0 }
		}),

		state : {
			hover : false,
			drag : false
		},
		/* example events:*/
		events: {
			'mouseover' : '_mouseover',
			'mousemove' : '_mousemove', // enable this instead of the iniit
			'mousedown' : '_mousedown',
			'mouseup' : '_mouseup',
			// drag events
			'dragstart' : '_dragstart',
			'dragenter' : '_dragenter',
			'dragover' : '_dragover',
			'dragleave' : '_dragleave',
			'drop' : '_drop',
			'dragend' : '_dragend'
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
			// prerequisite
			var monitor = _.inArray("down", this.options.monitor);
			if( !monitor ) return;
			e.stopPropagation();
			//console.log("mouse pressed", e);
			if(this.mousedown) this.mousedown( e );
		},

		_mouseup: function( e ) {
			// prerequisite
			var monitor = _.inArray("up", this.options.monitor);
			if( !monitor ) return;
			e.stopPropagation();
			//console.log("mouse released", e);
			if(this.mouseup) this.mouseup( e );
		},

		_mouseover: function( e ) {
			// prerequisite
			var monitor = _.inArray("over", this.options.monitor);
			if( !monitor ) return;
			//console.log("mouseover");
			this.state.hover = true;
			if(this.mouseover) this.mouseover( e );
		},

		_mousemove: function( e ) {
			// prerequisite
			var monitor = this.options.monitorMove || _.inArray("move", this.options.monitor);
			if( !monitor ) return;
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
		},
		// drag events callbacks
		_dragstart: function( e ) {
			console.log("_dragstart");
			this.state.drag = true;
		},
		_dragenter: function( e ) {
			console.log("_dragenter");
		},
		_dragover: function( e ) {
			console.log("_dragover");
		},
		_dragleave: function( e ) {
			console.log("_dragleave");
		},
		_drop: function( e ) {
			console.log("_drop");
		},
		_dragend: function( e ) {
			console.log("_dragend");
			this.state.drag = false;
		}

	});

	// Helpers

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};

	//
	_.mixin({
		inArray: function(value, array){
			return array.indexOf(value) > -1;
		}
	});

	// fallbacks
	if( _.isUndefined( Backbone.Input ) ) Backbone.Input = {};
	Backbone.Input.Mouse = Mouse;

	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = Mouse;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			//define( "backbone.input.mouse", [], function () { return Mouse; } );
			//define( ['underscore', 'backbone'], function () { return Mouse; } );
			define( [], function () { return Mouse; } );
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		// update APP namespace
		if( isAPP ){
			APP.View = Mouse;
			APP.Input = APP.Input || {};
			APP.Input.Mouse = Backbone.Input.Mouse;
			// save namespace
			window.APP = APP;
		} else {
			// update Backbone namespace
			Backbone.View = Mouse;
		}
		// save Backbone namespace either way
		window.Backbone = Backbone;
	}


})(this.jQuery, this._, this.Backbone, this.APP);
