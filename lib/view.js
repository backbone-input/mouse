
	var Mouse = View.extend({

		options: {
			monitorMove: false,
			monitor: [], // add "mouse" to initiate monitoring
			mouse: {
				states: ["up", "down", "move", "over", "drag"] // available states
			}
		},

		params: params.clone(),

		state: state.clone(),

		// enable these instead of _monitorX methods
		events: _.extend({}, View.prototype.events, {
			//'mouseover' : '_mouseover',
			//'mousemove' : '_mousemove',
			//'mousedown' : '_mousedown',
			//'mouseup' : '_mouseup',
			// drag events
			'dragstart' : '_dragstart',
			'dragenter' : '_dragenter',
			'dragover' : '_dragover',
			'dragleave' : '_dragleave',
			'drop' : '_drop',
			'dragend' : '_dragend'
		}),
		//
		initialize: function( options ){
			// fallbacks
			options = options || {};
			// extending options
			this.options = _.extend({}, this.options, options );
			// check monitor options
			var monitor = this.options.monitorMouse || _.inArray("mouse", this.options.monitor);
			if( monitor ){
				this.monitorMouse();
			}

			return View.prototype.initialize.call( this, options );
		},

		// interface method
		monitorMouse: function( flag ){
			// fallbacks
			flag = flag || true;
			// branch out
			if( flag ){
				// internal logic
				this._monitorMouseOn();
				// trigger event
				this.trigger('monitor-mouse-on');
			} else {
				// internal logic
				this._monitorMouseOff();
				// trigger event
				this.trigger('monitor-mouse-off');
			}

		},

		// internal logic
		_monitorMouseOn: function(){
			// prerequisite
			if( !this.el ) return;
			// variables
			var states = this.options.mouse.states || [];
			var el = $(this.el).get(0);

			if( _.inArray("move", states) ){
				el.addEventListener( 'mousemove', _.bind( this._mousemove, this ), false );
			}
			if( _.inArray("down", states) ){
				el.addEventListener( 'mousedown', _.bind( this._mousedown, this ), false );
			}
			if( _.inArray("up", states) ){
				el.addEventListener( 'mouseup',   _.bind( this._mouseup, this ), false );
			}
			// update state 
			this.state.set('mouse', states);
		},

		_monitorMouseOff: function(){
			// prerequisite
			if( !this.el ) return;
			// variables
			var states = this.state.get('mouse') || [];
			var el = $(this.el).get(0);

			if( _.inArray("move", states) ){
				el.removeEventListener( 'mousemove', _.bind( this._mousemove, this ), false );
			}
			if( _.inArray("down", states) ){
				el.removeEventListener( 'mousedown', _.bind( this._mousedown, this ), false );
			}
			if( _.inArray("up", states) ){
				el.removeEventListener( 'mouseup',   _.bind( this._mouseup, this ), false );
			}
			// remove state 
			this.state.set('mouse', false);
		},

		// events
		_mousedown: function( e ) {
			// prerequisite
			var monitor = _.inArray("mouse", this.options.monitor) && _.inArray("down", this.options.mouse.states);
			if( !monitor ) return;
			if (e.stopPropagation) e.stopPropagation();
			if( _.inDebug() ) console.log("mouse pressed", e);
			// set state
			this.state.set("pressing", true);
			this.trigger("mousedown", e);
			if(this.mousedown) this.mousedown( e );
		},

		_mouseup: function( e ) {
			// prerequisite
			var monitor = _.inArray("mouse", this.options.monitor) && _.inArray("up", this.options.mouse.states);
			if( !monitor ) return;
			if (e.stopPropagation) e.stopPropagation();
			if( _.inDebug() ) console.log("mouse released", e);
			// set state
			this.state.set("pressing", false);
			this.trigger("mouseup", e);
			if(this.mouseup) this.mouseup( e );
		},

		_mouseover: function( e ) {
			// prerequisite
			var monitor = _.inArray("mouse", this.options.monitor) && _.inArray("over", this.options.mouse.states);
			if( !monitor ) return;
			//console.log("mouseover");
			this.state.set("hover", true);
			//this.trigger("mouseover", e);
			if(this.mouseover) this.mouseover( e );
		},

		_mousemove: function( e ) {
			// prerequisite
			var monitor = (this.options.monitorMove || _.inArray("mouse", this.options.monitor) ) && _.inArray("move", this.options.mouse.states);
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
			var monitor = _.inArray("mouse", this.options.monitor) && _.inArray("drag", this.options.mouse.states);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_dragstart");
			//if (e.preventDefault) e.preventDefault();
			this.state.set("drag", true);
			//e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
			this.trigger("dragstart", e);
			this.trigger("drag", e);
		},
		_dragenter: function( e ) {
			var monitor = _.inArray("mouse", this.options.monitor) && _.inArray("drag", this.options.mouse.states);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_dragenter");
			//if (e.preventDefault) e.preventDefault();
			this.trigger("dragenter", e);
			return false;
		},
		_dragover: function( e ) {
			var monitor = _.inArray("mouse", this.options.monitor) && _.inArray("drag", this.options.mouse.states);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_dragover");
			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting.
			this.trigger("dragover", e);
		},
		_dragleave: function( e ) {
			var monitor = _.inArray("mouse", this.options.monitor) && _.inArray("drag", this.options.mouse.states);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_dragleave");
			//if (e.preventDefault) e.preventDefault();
			this.trigger("dragleave", e);
		},
		_drop: function( e ) {
			var monitor = _.inArray("mouse", this.options.monitor) && _.inArray("drag", this.options.mouse.states);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_drop");
			if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting.
			this.trigger("drop", e);
			return false;
		},
		_dragend: function( e ) {
			var monitor = _.inArray("mouse", this.options.monitor) && _.inArray("drag", this.options.mouse.states);
			if( !monitor ) return;
			if( _.inDebug() ) console.log("_dragend");
			//if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting.
			this.trigger("dragend", e);
			this.state.set("drag", false);
		}

	});
