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

    return Backbone;
}));