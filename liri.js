var fs = require('fs');

var twitter = require('twitter');
var twitterKeys = require('./keys.js');

var client = new twitter({
  consumer_key: twitterKeys.twitterKeys.consumer_key,
  consumer_secret: twitterKeys.twitterKeys.consumer_secret,
  access_token_key: twitterKeys.twitterKeys.access_token_key,
  access_token_secret: twitterKeys.twitterKeys.access_token_secret
});

var searchCommand = process.argv[2];
var searchTerm = process.argv[3];
runLiri(searchCommand, searchTerm);

function runLiri(searchCommand, searchTerm){
	switch (searchCommand){
		case 'my-tweets':
			twitterPosts()
			break;
		case 'spotify-this-song':
			sptofySearch(searchTerm);
			break;
		case 'movie-this':
			movieInfo(searchTerm);
			break;
		case 'do-what-it-says':
			fileReader();
			break;
		default:
		console.log('Command Unknown!')
	};
};

function twitterPosts() {
	var params = {screen_name: 'rkhardeman', count: '20'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	tweets.forEach(function(element) {
		    console.log(element.created_at + ": " + element.text);
		});
	  }
	});
};