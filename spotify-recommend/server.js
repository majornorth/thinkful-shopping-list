var unirest = require('unirest');
var express = require('express');
var events = require('events');

var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
    unirest.get('https://api.spotify.com/v1/' + endpoint)
           .qs(args)
           .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                }
                else {
                    emitter.emit('error', response.code);
                }
            });
    return emitter;
};

var app = express();
app.use(express.static('public'));

app.get('/search/:name', function(req, res) {
    var searchReq = new Promise(function(resolve) {
        var findArtist = getFromApi('search', {
            q: req.params.name,
            limit: 1,
            type: 'artist'
        });
        
        findArtist.on('end', function(item) {
            var artist = item.artists.items[0];
            resolve(artist);
        });
        
        findArtist.on('error', function(code) {
            res.sendStatus(code);
        });
    });
    
    searchReq.then(function(artist) {
        var artistsId = artist.id;
        var relatedArtistsEndpoint = 'artists/' + artistsId + '/related-artists/';
        var relatedArtists = getFromApi(relatedArtistsEndpoint, {});
        
        relatedArtists.on('end', function(item) {
            artist.related = item.artists;
            var artistRelated = artist.related;
            
            var promisesForTopTracks = artistRelated.map(function(artist){
                return new Promise(function(resolve, reject){
                    var relatedArtistId = artist.id;
                    var relatedArtistTopTracksEndpoint = 'artists/' + relatedArtistId + '/top-tracks/';
                    
                    // console.log(relatedArtistTopTracksEndpoint);
                    
                    var topTracks = getFromApi(relatedArtistTopTracksEndpoint, {
                        country: 'US'
                    });
                    
                    topTracks.on('end', function(item) {
                        // console.log("Artist tracks:", item.tracks);
                        artist.tracks = item.tracks;
                        resolve(artist);
                    });
                
                    topTracks.on('error', function(code) {
                        resolve(artist);
                        // res.sendStatus(code);
                    });
                });
            });
            
            Promise.all(promisesForTopTracks).then(function(artists){
                // console.log(artists);
                artist.related = artists;
                res.json(artist); 
            });
        });
        
        relatedArtists.on('error', function(code) {
            res.sendStatus(code);
        });
    });
});

app.listen(8080);