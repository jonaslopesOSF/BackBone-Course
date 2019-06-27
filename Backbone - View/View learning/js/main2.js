var Song = Backbone.Model.extend({
    defaults: {
        listeners: 0
    }
});

var SongView = Backbone.View.extend({
    
    // handling with DOM events
    events: {
        "click": "onClick",
        "click .bookmark": "onClickBookmark",
    },

    onClick: function(){
        console.log("Listen Clicked")
    },

    onClickBookmark: function(e){
        e.stopPropagation();

        console.log("Bookmark Clicked")
    },

    /*onModelChange: function(){
        this.$el.addClass("someClass");
    },*/

    // Handling with model events
    initialize: function(){
        this.model.on("change", this.render, this)
    },

    render: function(){
        this.$el.html(this.model.get("title") + " " + "<button>Listen</button> <button class='bookmark'>Bookmark</button>");
        //this.$el.html(this.model.get("title") + " - Listeners: " + this.model.get("listeners"));

        return this;
    }
});
    
var song = new Song({ title: "Blue in Green" });

var songView = new SongView({ el: "#container", model: song });
songView.render();
