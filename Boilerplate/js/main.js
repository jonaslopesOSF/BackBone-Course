
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Song = Backbone.Model.extend({
    validate: function(attrs){
        if(!attrs.title)
            return "Title is required";
    },

    defaults:{
        genre: "Jazz"
    },
    
});

var song = new Song({
    artist: "Miles Davis",
    publishYear: 1959,
    genre: "Blues"
}); 

var Animal = Backbone.Model.extend({
    walk: function(){
        console.log("Animal walking...");
    }
});

var Dog = Animal.extend({ // inheritance here
    walk: function(){
        Animal.prototype.walk.apply(this)
        console.log("Dog walking...")
    }
}); 

var dog = new Dog();
dog.walk();

