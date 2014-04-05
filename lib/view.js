
	var Mouse = View.extend({

		options: {
			monitorMove: false,
			monitor: [] // possible values: "up", "down", "move", "over", "drag"
		},
		// use APP.Model if available?
		params: params,

		state : {
			hover : false,
			drag : false
		},
		/* example events:*/
		events: _.extend({}, View.prototype.events, {
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
		}),
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
			if (e.stopPropagation) e.stopPropagation();
			if( _.inDebug() ) console.log("mouse pressed", e);
			this.trigger("mousedown", e);
			if(this.mousedown) this.mousedown( e );
		},

		_mouseup: function( e ) {
			// prerequisite
			var monitor = _.inArray("up", this.options.monitor);
			if( !monitor ) return;
			if (e.stopPropagation) e.stopPropagation();
			if( _.inDebug() ) console.log("mouse released", e);
			this.trigger("mouseup", e);
			if(this.mouseup) this.mouseup( e );
		},

		_mouseover: function( e ) {
			// prerequisite
			var monitor = _.inArray("over", this.options.monitor);
			if( !monitor ) return;
			//console.log("mouseover");
			this.state.hover = true;
			//this.trigger("mouseover", e);
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
			if( _.inDebug() ) console.log("mousemove", this);
			if(this.mousemove) this.mousemove( e );
		},
		// drag events callbacks
		_dragstart: function( e ) {
			var monitor = _.inArray("drag", this.options.monitor);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_dragstart");
			//if (e.preventDefault) e.preventDefault();
			this.state.drag = true;
			//e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
			this.trigger("dragstart", e);
			this.trigger("drag", e);
		},
		_dragenter: function( e ) {
			var monitor = _.inArray("drag", this.options.monitor);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_dragenter");
			//if (e.preventDefault) e.preventDefault();
			this.trigger("dragenter", e);
			return false;
		},
		_dragover: function( e ) {
			var monitor = _.inArray("drag", this.options.monitor);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_dragover");
			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting.
			this.trigger("dragover", e);
		},
		_dragleave: function( e ) {
			var monitor = _.inArray("drag", this.options.monitor);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_dragleave");
			//if (e.preventDefault) e.preventDefault();
			this.trigger("dragleave", e);
		},
		_drop: function( e ) {
			var monitor = _.inArray("drag", this.options.monitor);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_drop");
			if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting.
			this.trigger("drop", e);
			return false;
		},
		_dragend: function( e ) {
			var monitor = _.inArray("drag", this.options.monitor);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_dragend");
			//if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting.
			this.trigger("dragend", e);
			this.state.drag = false;
		}

	});
