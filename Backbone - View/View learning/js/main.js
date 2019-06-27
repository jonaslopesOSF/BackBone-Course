var Song = Backbone.Model.extend({
    defaults: {
        listeners: 0
    }
});

// using templates
var SongView = Backbone.View.extend({

    render: function(){
        var source = $("#songTemplate").html();
		var template = _.template(source);
        //var template = _.template($("#songTemplate").html());
        
        var html = template(this.model.toJSON()); 
        this.$el.html(html);

        return this;
    }
});
    
var song = new Song({ title: "Blue in Green", plays: 1100});

var songView = new SongView({ el: "#container", model: song });
songView.render();
