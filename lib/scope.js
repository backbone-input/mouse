/**
 * @name {{name}}
 * {{description}}
 *
 * Version: {{version}} ({{build_date}})
 * Homepage: {{homepage}}
 *
 * @author {{author}}
 * Initiated by: Makis Tracend (@tracend)
 *
 * @cc_on Copyright © Makesites.org
 * @license {{#license licenses}}{{/license}}
 */

(function(w, _, Backbone, APP) {

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;
	var $ = w.jQuery || w.Zepto || w.$;
	// FIX: jQuery pass dataTransfer property
	if( w.jQuery ) w.jQuery.event.props.push('dataTransfer');


{{{lib}}}


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


})(this.window, this._, this.Backbone, this.APP);
