define([
    'underscore',
    'backbone',
    'models/song',
    'views/songView'], function(_, backbone, Song, SongView){

        var initialize = function(){
            var song = new Song({ title: "Blue in Green", plays: 1100});

            var songView = new SongView({ el: "#container", model: song });
            songView.render();
        }
        
        return {
            initialize: initialize
        }
});


