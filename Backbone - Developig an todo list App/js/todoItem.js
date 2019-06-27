
var TodoItem = Backbone.Model.extend({
    defaults: {
        completed: false
    },

    urlRoot: "https://jsonplaceholder.typicode.com/todos",

	validate: function(attrs){
		if (!attrs.title)
			return "Title is required, please insert a description";
    },
    
    toggle: function(){
        this.set("completed", !this.get("completed"));
    }
});
