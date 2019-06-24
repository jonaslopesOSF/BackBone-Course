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

var carrinho = new Car({
    registrationNumber : "XLI887",
    color: "Blue",
});

// testing

carrinho.unset("registrationNumber");

if(!carrinho.isValid());
    console.log(carrinho.validationError);

carrinho.set("registrationNumber" , "XLI887");

if(!carrinho.isValid());
    console.log(carrinho.validationError);

carrinho.start();
