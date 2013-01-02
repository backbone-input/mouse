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

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone', 'underscore', 'jquery'], factory);
    } else {
        // Browser globals
        factory(Backbone, _, $);
    }
}(function (Backbone, _, $) {

    "use strict";

    _.extend(Backbone.View.prototype, {
        state : {
            hover : false
        }
        
        events: {
            'mouseover': '_mouseover',
            'mousemove': '_mousemove'
        },
    
        _mouseover: function( e ) {
            this.state.hover = true;
        }
        
        _mousemove: function( e ) {
            this.mouse = {
                x : e.pageX, 
                y : e.pageY
            };
            if( this.update ) this.update();
        }
    
    });

    return Backbone;
}));