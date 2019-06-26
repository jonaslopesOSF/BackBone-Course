		
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Vehicle = Backbone.Model.extend({

	idAttribute: "registrationNumber",

	urlRoot: "/api/vehicles",

	validate: function(attrs){
		if (!attrs.registrationNumber)
			return "Vehicle is not valid.";
	},

	start: function(){
		console.log("Vehicle started.");
	}
});

var Vehicles = Backbone.Collection.extend({
	Model: Vehicle
});

var Car = Vehicle.extend({
	start: function(){
		console.log("Car with registration number " + this.get("registrationNumber") + " started.");
	}
});

var Boat = Vehicle.extend({
	start: function(){
		console.log("Boat with registration number " + this.get("registrationNumber") + " started.");
	}
});

var VehicleView = Backbone.View.extend({
	tagName: "li",

	className: "vehicle",

	// page event, onclick in delete button
	events: {
		"click .delete": "onDelete",
	},

	onDelete: function(){
		this.remove();
	},

	render: function() {
		var source = $("#vehicleTemplate").html();
		var template = _.template(source);

		this.$el.html(template(this.model.toJSON()));
		this.$el.attr("data-color", this.model.get("color"));

		return this;
	},

});

var VehiclesView = Backbone.View.extend({
	id: "vehicles",

	tagName: "ul",

	initialize: function(){
		// subscribe in event
		bus.on("newVehicle", this.onNewVehicle, this);
	},

	// add the new vehicle in the list
	onNewVehicle: function(registrationNumber){
		console.log("Event captured, lets show in page");
		var car = new Car({ registrationNumber: registrationNumber });
		var vehicleView = new VehicleView({ model: car });
		this.$el.prepend(vehicleView.render().$el); // prepend add in the top
	},

	render: function(){
		this.collection.each(function(vehicle){
			var vehicleView = new VehicleView({ model: vehicle });
			this.$el.append(vehicleView.render().$el);
		}, this); // note the reference to this here. 
		// When you set the "this" pointer here (as the second argument to the 
	    // each method), you'll be able to access "this" inside the 
	    // callback function in the each method:
	    //
	    // this.$el.append(...)

		return this;
	},
});


// View to access the page and tag values and wait to an action of User
var NewVehicleView = Backbone.View.extend({
	
	// page event for add button
	events: {
		"click .add": "onAdd"
	},

	onAdd: function(){
		var input = this.$el.find(".registration-number"); // collect the value in input text

		var registrationNumber = input.val();
		bus.trigger("newVehicle", registrationNumber); // trigger the event
		console.log("Event triggered");

		input.val(""); // clear the input text
	},
	
	render: function(){
		var source = $("#newVehicleTemplate").html();
		var template = _.template(source);

		this.$el.html(template());

		return this;
	},

});

// view of navbar 
var HomeView = Backbone.View.extend({
	render: function(){
		this.$el.html("Home Page");

		return this;
	}
});

var AppRouter = Backbone.Router.extend({
	routes: {
		"": "viewHome",
		"cars": "viewCars",
		"boats": "viewBoats",
		"*other": "defaultRoute"
	},

	viewCars: function(){
		var cars = new Vehicles([
			new Car({ registrationNumber: "XLI887", color: "Blue" }),
			new Car({ registrationNumber: "ZNP123", color: "Blue" }),
			new Car({ registrationNumber: "XUV456", color: "Gray" })
		]);

		this.loadView(new VehiclesView({ collection: cars }));
	},

	viewBoats: function(){
		var boats = new Vehicles([
			new Boat({ registrationNumber: "AAA", color: "Blue" }),
			new Boat({ registrationNumber: "BBB", color: "Blue" }),
			new Boat({ registrationNumber: "CCC", color: "Gray" })
		]);

		this.loadView(new VehiclesView({ collection: boats }));
	},

	viewHome: function(){
		this.loadView(new HomeView());
	},

	// We use this method to prevent memory leaks. When you replace
	// the content of a DOM element with a new view, the old view is 
	// still in the memory. So, we need to remove it explicitly. 
	//
	// Here we use a private field (_currentView) to keep track of the
	// current view. 
	loadView: function(view){
		// If the currentView is set, remove it explicitly.
		if (this._currentView) {
			this._currentView.remove();
		}

		$("#container").html(view.render().$el);
		
		this._currentView = view;
	},

	defaultRoute: function(){
	}
});

var bus = _.extend({}, Backbone.Events);

var router = new AppRouter();
Backbone.history.start();

var NavView = Backbone.View.extend({
	events: {
		"click": "onClick"
	},

	onClick: function(e){
		var $li = $(e.target);
		router.navigate($li.attr("data-url"), { trigger: true });
	}
});

var navView = new NavView({ el: "#nav" });

