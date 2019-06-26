
var Vehicle = Backbone.Model.extend({
    registrationNumber: "registrationNumber",
    urlRood: "/api/vehicles",

    validate: function(attrs){
        if(attrs.registrationNumber == null || attrs.registrationNumber == undefined)
            return "Vehicle invalid!";
    },

    start: function(){
        console.log("Vehicle Started");
    }
});

var Car = Vehicle.extend({
	start: function(){
		console.log("Car with registration number " +  this.get("registrationNumber") + " started");
    },
});

var Vehicles = Backbone.Collection.extend({
	model: Vehicle
});

var vehicles = new Vehicles([
	new Car ({ registrationNumber: "XLI887", colour: "Blue" }),
	new Car ({ registrationNumber: "ZNP123", colour: "Blue" }),
	new Car ({ registrationNumber: "XUV456", colour: "Gray" }),
]);

var blueCars = vehicles.where({ colour: "Blue" });
console.log("Blue cars:", blueCars);

var findCar = vehicles.findWhere({ registrationNumber: "XLI887" });
console.log("Finded car:", findCar);

vehicles.remove(findCar);

var jsonVehicles = vehicles.toJSON();
console.log("collection in json:", JSON.stringify(jsonVehicles));

vehicles.each(function (vehicle){
	console.log(vehicle);
});

vehicles.each(function(vehicle){
	vehicle.start();
});