var person = {
    name: "Jonas",

    walk: function(){
        this.trigger("walking", {
            speed: 1,
            startTime: "08:00"
        });
    }
};

_.extend(person, Backbone.Events);

/*person.once("walking", function(e){ // event executes just one time
    console.log("Person is walking");
    console.log("Event Args", e);
});*/

person.on("walking", function(e){ // event executes just one time
    console.log("Person is walking");
    console.log("Event Args", e);
});

//person.off("walking"); // unsubscribe event

person.walk();
person.walk();
