!function(o,e,t,r){{var n="undefined"!=typeof r&&"undefined"!=typeof r.View,i=n?r.View:t.View;o.jQuery||o.Zepto||o.$}o.jQuery&&o.jQuery.event.props.push("dataTransfer");var s=i.prototype.params||new t.Model;s.set({mouse:{x:0,y:0}});var a=i.extend({options:{monitorMove:!1,monitor:[]},params:s,state:{hover:!1,drag:!1},events:e.extend({},i.prototype.events,{mouseover:"_mouseover",mousemove:"_mousemove",mousedown:"_mousedown",mouseup:"_mouseup",dragstart:"_dragstart",dragenter:"_dragenter",dragover:"_dragover",dragleave:"_dragleave",drop:"_drop",dragend:"_dragend"}),_mousedown:function(o){var t=e.inArray("down",this.options.monitor);t&&(o.stopPropagation&&o.stopPropagation(),e.inDebug()&&console.log("mouse pressed",o),this.trigger("mousedown",o),this.mousedown&&this.mousedown(o))},_mouseup:function(o){var t=e.inArray("up",this.options.monitor);t&&(o.stopPropagation&&o.stopPropagation(),e.inDebug()&&console.log("mouse released",o),this.trigger("mouseup",o),this.mouseup&&this.mouseup(o))},_mouseover:function(o){var t=e.inArray("over",this.options.monitor);t&&(this.state.hover=!0,this.mouseover&&this.mouseover(o))},_mousemove:function(o){var t=this.options.monitorMove||e.inArray("move",this.options.monitor);t&&(this.params.set({mouse:{x:o.clientX,y:o.clientY}}),e.inDebug()&&console.log("mousemove",this),this.mousemove&&this.mousemove(o))},_dragstart:function(o){var t=e.inArray("drag",this.options.monitor);t&&(e.inDebug()&&console.log("_dragstart"),this.state.drag=!0,this.trigger("dragstart",o),this.trigger("drag",o))},_dragenter:function(o){var t=e.inArray("drag",this.options.monitor);if(t)return e.inDebug()&&console.log("_dragenter"),this.trigger("dragenter",o),!1},_dragover:function(o){var t=e.inArray("drag",this.options.monitor);t&&(e.inDebug()&&console.log("_dragover"),o.preventDefault&&o.preventDefault(),o.stopPropagation&&o.stopPropagation(),this.trigger("dragover",o))},_dragleave:function(o){var t=e.inArray("drag",this.options.monitor);t&&(e.inDebug()&&console.log("_dragleave"),this.trigger("dragleave",o))},_drop:function(o){var t=e.inArray("drag",this.options.monitor);if(t)return e.inDebug()&&console.log("_drop"),o.stopPropagation&&o.stopPropagation(),this.trigger("drop",o),!1},_dragend:function(o){var t=e.inArray("drag",this.options.monitor);t&&(e.inDebug()&&console.log("_dragend"),o.stopPropagation&&o.stopPropagation(),this.trigger("dragend",o),this.state.drag=!1)}});e.mixin({inArray:function(o,e){return e.indexOf(o)>-1},inDebug:function(){return"undefined"!=typeof DEBUG&&DEBUG}}),e.isUndefined(t.Input)&&(t.Input={}),t.Input.Mouse=a,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=a:"function"==typeof define&&define.amd&&define([],function(){return a}),"object"==typeof window&&"object"==typeof window.document&&(n?(r.View=a,r.Input=r.Input||{},r.Input.Mouse=t.Input.Mouse,window.APP=r):t.View=a,window.Backbone=t)}(this.window,this._,this.Backbone,this.APP);