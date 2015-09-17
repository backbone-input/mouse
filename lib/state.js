// extend existing params
var state = View.prototype.state || new Backbone.Model();

// defaults
state.set({
	hover : false,
	drag : false,
	pressing: false
});

