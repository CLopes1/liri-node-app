//Require your outside files and your NPM modules
require("dotenv").config();
var Spotify = require('node-spotify-api')
var request = require('request');
var Twitter = require('twitter')

// argv is "array-like"
var command = process.argv[2];
var variable = process.argv.splice(3).join(" ");

// Twitter Key
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//Spotify Key
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});


switch (command) {
  //Twitter call
  case 'my-tweets':
    client.get('statuses/user_timeline', { screen_name: variable }, function (error, tweets, response) {
      if (error) {
        console.log(error);
        //dadtellsjokes
      }

      else {
        for (var i = 0; i < 20; i++) {
          console.log('Tweet: ' + tweets[i].text);
          console.log('Time Stamp: ' + tweets[i].created_at);
          console.log("\n-------------\n");
        }
      }
    })
    break;

  //OMDB Call
  case 'movie-this':

  if (variable === "") {
    variable = "Mr. Nobody";
  }
    // OMDB API Request
    request('http://omdbapi.com/?apikey=trilogy&t=' + variable, function (error, response, body) {
      if (error) {
        console.log(error)
      }
      else {
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('Title:', JSON.parse(body).Title);
        console.log('Year:', JSON.parse(body).Year);
        console.log('IMDB Rating:', JSON.parse(body).imdbRating);
        console.log('Rotten Tomatoes Rating:', JSON.parse(body).Ratings[1].Value);
        console.log('Country:', JSON.parse(body).Country);
        console.log('Language:', JSON.parse(body).Language);
        console.log('Plot:', JSON.parse(body).Plot);
        console.log('Actors:', JSON.parse(body).Actors);
        console.log("\n-------------\n");
      }
    });
    break

  //Spotify Call
  case 'spotify-this-song':

    if (variable === "") {
      variable = "The Sign";
    }

    spotify.search({ type: 'track', query: variable }, function (err, data) {
      //console.log('data', data);
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      else {
        for (var i = 0; i < 20; i++) {
          console.log('Artist: ' + data.tracks.items[i].artists[0].name);
          console.log('Track: ' + data.tracks.items[i].name);
          console.log('Album: ' + data.tracks.items[i].album.name);
          console.log('Song Preview: ' + data.tracks.items[i].preview_url);
          console.log("\n-------------\n");
        }
      }

    });

    break;
}