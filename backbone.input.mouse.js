/*
 * Backbone Mouse
 * - monitor mouse movements in your views
 *
 * Created by: Makis Tracend (@tracend)
 * (c) Makesites.org
 *
 * Released under the MIT License
 *
 */
 (function (factory) {

	"use strict";

	//if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
	//    define(['backbone', 'underscore', 'jquery'], factory);
	//} else {
		// Browser globals
		factory(Backbone, _, $);
	//}
}(function (Backbone, _, $) {

	"use strict";

	Backbone.View = Backbone.View.extend({

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
			console.log("mouseover");
			console.log( e );
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

	return Backbone;
}));