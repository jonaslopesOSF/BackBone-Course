
var TodoItems = Backbone.Collection.extend({
	model: TodoItem,
	
	url: "https://jsonplaceholder.typicode.com/todos",
});