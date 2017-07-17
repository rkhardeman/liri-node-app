var fs = require('fs');
var request = require("request");

var twitter = require('twitter');
var spotifyNode = require('spotify');
var twitterKeys = require('./keys.js');
var spotifyKeys = require('./keys.js');

var searchCommand = process.argv[2];
var searchTerm = process.argv[3];
runLiri(searchCommand, searchTerm);

function runLiri(searchCommand, searchTerm){
	switch (searchCommand){
		case 'my-tweets':
			twitterPosts()
			break;
		case 'movie-this':
			movieInfo(searchTerm);
			break;
		case 'spotify-this-song':
			spotifySearch(searchTerm);
			break;
		case 'do-what-it-says':
			fileReader();
			break;
		default:
		console.log('Command Unknown!')
	};
};

function twitterPosts() {

	var client = new twitter({
	  consumer_key: twitterKeys.twitterKeys.consumer_key,
	  consumer_secret: twitterKeys.twitterKeys.consumer_secret,
	  access_token_key: twitterKeys.twitterKeys.access_token_key,
	  access_token_secret: twitterKeys.twitterKeys.access_token_secret
	});

	var params = {screen_name: 'rkhardeman', count: '20'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	tweets.forEach(function(element) {
		console.log(element.created_at + ": " + element.text);
		});
	  }
	});
};

function movieInfo(searchTerm){

		var movie = searchTerm;
		var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

		request(queryURL, (error, response, body) =>{
		
		console.log("Title: " + JSON.parse(body).Title);
	    console.log("Released: " + JSON.parse(body).Year);
	    console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
	    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	    console.log("Country Released: " + JSON.parse(body).Country);
	    console.log("Original Language: " + JSON.parse(body).Language);
	    console.log("Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
		});

};

function spotifySearch(searchTerm) {

	var spotify = spotifyNode({
		consumer_key: spotifyKeys.consumer_key,
		consumer_secret: spotifyKeys.consumer_secret,
	}); 

	spotify.search({ type: 'track', query: searchTerm}, function(err, data) {

    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
   		}
   		else {

   			var songData = data.tracks.items;

   			for (var i = 0; i < 1; i++){

   				var song = "===================================" + "\r\n" +
   							"Artist: " + songData[i].artists[0].name + "\r\n" +
  							"Title: " + songData[i].name + "\r\n" +
  							"Album: " + songData[i].album.name + "\r\n" +
  							"Preview Link: " + songData[i].preview_url + "\r\n" +
  							"===================================";
   							console.log(song);
   							log("\r\n %%%%%%%%%% \r\n" + song + "\r\n %%%%%%%%%%");
   			}
   		}
   	});
};