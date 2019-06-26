		
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

var bus = _.extend({}, Backbone.Events); // event bus

var vehicles = new Vehicles([
	new Car({ registrationNumber: "XLI887", color: "Blue" }),
	new Car({ registrationNumber: "ZNP123", color: "Blue" }),
	new Car({ registrationNumber: "XUV456", color: "Gray" })
]);

// JQuery
$("#container")
	.append(new NewVehicleView().render().$el)
	.append(new VehiclesView({ collection: vehicles }).render().$el);


