// extend existing params
var params = View.prototype.params || new Backbone.Model();

// defaults
params.set({
	mouse: { x: 0, y: 0 }
});