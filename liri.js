require("dotenv").config();
var Spotify = require('node-spotify-api')
var request = require('request');
var Twitter = require('twitter')



var variable = process.argv[3]
var input = process.argv[2]



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


switch (input) {
  //Twitter call
  case 'my-tweets':
    client.get('statuses/user_timeline', { screen_name: 'dadtellsjokes' }, function (error, tweets, response) {
      if (error) {
        console.log(error);
      }

      else {
        for (var i = 0; i < 20; i++) {
          console.log(tweets[i].text);
        }
      }
    })
    break;

  //OMDB Call
  case 'movie-this':
    // OMDB API Request
    request('http://omdbapi.com/?apikey=trilogy&t=' + variable, function (error, response, body) {
      if (error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', JSON.parse(body));
    });
    break;

  //Spotify Call
  case 'spotify-this-song':
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

}