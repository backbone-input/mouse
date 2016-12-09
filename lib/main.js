/**
 * @name {{name}}
 * {{description}}
 *
 * Version: {{version}} ({{build_date}})
 * Homepage: {{homepage}}
 *
 * @author {{author}}
 * Initiated by Makis Tracend (@tracend)
 *
 * @cc_on Copyright © Makesites.org
 * @license {{#license licenses}}{{/license}}
 */

(function (lib) {

	//"use strict";

	// Support module loaders
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define('backbone.input.mouse', ['jquery', 'underscore', 'backbone'], lib);
	} else if ( typeof module === "object" && module && typeof module.exports === "object" ){
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = lib;
	} else {
		// Browser globals
		// - getting the available query lib
		var $ = window.jQuery || window.Zepto || window.vQuery;
		lib($, window._, window.Backbone);
	}

}(function ($, _, Backbone) {

	// support for Backbone APP() view if available...
	var APP = APP || window.APP || null;
	var isAPP = ( APP !== null );
	var View = ( isAPP && typeof APP.View !== "undefined" ) ? APP.View : Backbone.View;

	// FIX: jQuery pass dataTransfer property
	if( window && window.jQuery ){
		var jQuery = window.jQuery;
		if (jQuery.event.addProp) {
			jQuery.event.addProp('dataTransfer');
		} else {
			// reference: https://html.spec.whatwg.org/multipage/interaction.html#dndevents
			['dragstart', 'drag', 'dragenter', 'dragleave', 'dragover', 'drop', 'dragend'].forEach(function(eventName){
				jQuery.event.fixHooks[eventName] = {
					props: ['dataTransfer']
				};
			});
			/*
			// assume ES6 support?
			['dragstart', 'drag', 'dragenter', 'dragleave', 'dragover', 'drop', 'dragend'].forEach(eventName => {
				jQuery.event.fixHooks[eventName] = {
					props: ['dataTransfer']
				};
			});
			*/
		}
	}


{{{lib}}}


	// update Backbone namespace regardless
	Backbone.Input = Backbone.Input ||{};
	Backbone.Input.Mouse = Mouse;
	// update APP namespace
	if( isAPP ){
		APP.Input = APP.Input || {};
		APP.Input.Mouse = Mouse;
	}

	// If there is a window object, that at least has a document property
	if( typeof window === "object" && typeof window.document === "object" ){
		window.Backbone = Backbone;
		// update APP namespace
		if( isAPP ){
			window.APP = APP;
		}
	}

	// Support module loaders
	return Mouse;

}));
