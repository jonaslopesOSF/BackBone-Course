var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
    model: Song
});

var SongView = Backbone.View.extend({
    tagName: "li",
    /*className: "song",
    id: "1234",
    attributes: {
        "data-genre": "Jazz"
    },*/
    render: function(){
        this.$el.html(this.model.get("title"));
        this.$el.attr("id", this.model.id)

        return this;
    }
});

var SongsView = Backbone.View.extend({
    tagName: "ul",

    initialize: function() {
        this.model.on("add", this.onSongAdded, this);
        this.model.on("remove", this.onSongRemoved, this);
    },

    onSongAdded: function(song){
        var songView = new SongView({ model: song });
        
        this.$el.append(songView.render().$el);
    },

    onSongRemoved: function(song){
        //this.$el.find("li#" + song.id).remove()

        this.$("li#" + song.id).remove();
    },

    render: function(){
        var self = this;

        this.model.each(function(song){
            var songView = new SongView({ model: song });
            self.$el.append(songView.render().$el);
        });
    }
});

var songs = new Songs([
    new Song({ id: 1, title : "Blue in Green" }),
    new Song({ id: 2, title : "So What" }),
    new Song({ id: 3, title : "All Blues" }),
]);
    
//var song = new Song({ title: "Blue in Green" });

//var songView = new SongView();
//var songView = new SongView({ el: "#container", model: song });

var songsView = new SongsView({ el: "#container", model: songs });
songsView.render();

//$("#container").html(songView.render().$el); // is the same that this