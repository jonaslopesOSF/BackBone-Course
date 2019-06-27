
var TodoItemsView = Backbone.View.extend({
	id: "todoItemsContainer",

	initialize: function(options){
		if (!(options && options.model))
			throw new Error("model is not specified. Specified one please");

		// listening for collection event
		this.model.on("add", this.onAddTodoItem, this);
		this.model.on("remove", this.onRemoveTodoItem, this);
	},

	onRemoveTodoItem: function(todoItem){
		this.$("li#" + todoItem.id).remove();
		console.log("Removed", todoItem);
	},

	// handling collection events
	onAddTodoItem: function(todoItem){
		var newItemView = new TodoItemView({ model: todoItem });
		this.$("#todoItems").append(newItemView.render().$el);
	},

	// listening for DOM events
	events: {
		"keypress #newTodoItem": "onKeyPress"
	},

	// add using enter
	onKeyPress: function(key){
		if(key.keyCode == 13) // 13 is enter code
			var $textBox = this.$("#newTodoItem");

			// Validating field empty
			if($textBox.val()){
				var todoItem = new TodoItem({ title: $textBox.val() });
				this.model.create(todoItem);
				
				//todoItem.save();
				//this.model.add(todoItem);

				$textBox.val("");
			}
	},

	render: function(){
		var self = this;

		var template = $("#todoItemsTemplate").html();
		var html = Mustache.render(template);
		this.$el.html(html);

		/*this.model.each(function(todoItem){
			var view = new TodoItemView({ model: todoItem });
			self.$el.append(view.render().$el);
		});*/ 
		// 'cause we use an rest api it render automatically

		return this;
	}
});