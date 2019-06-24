var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
    model: Song
});

// Inserting direclty 
/*var songs = new Songs([
    new Song ({ title: "song 1" }),
    new Song ({ title: "song 2" }),
    new Song ({ title: "song 3" }),
]);*/

var songs = new Songs();

songs.add(new Song({ title: "Song 1",  genre: "Jazz", downloads: 110}), { at: 0 });

songs.push(new Song({ title: "Song 2", genre: "Jazz", downloads: 90}));

// var lastSong = songs.pop(); remove the song

var jazzSongs = songs.where({ genre: "Jazz" });

var firstJazzSong = songs.findWhere({ genre: "Jazz" }); // returns the first which matches

console.log("Jazz songs", jazzSongs);

console.log("First Jazz songs", firstJazzSong);

var filterSongs = songs.where({ genre: "Jazz", title: "Song 2" });
console.log("Filtered Songs", filterSongs);

var topDownloads = songs.filter(function(song){
    return song.get("downloads") > 100;
});
console.log("Top downloads", topDownloads);

songs.each(function(song){
    console.log(song);
});