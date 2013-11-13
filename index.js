var util = require('util'),
	request = require('request'),
	events = require('events'),
	_und = require('underscore'),
	_und_s = require('underscore.string'),
	config = require('./config.js')();

var _my = null;

var debug;

if (/\bverbose\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    console.error('DEBUG: %s', util.format.apply(util, arguments))
  }
} else {
  debug = function() {}
}

var EdmodoAPI = function(apiKey, productionEnv){
	
	if(!apiKey)
	{
		throw new Error("An Edmodo API key has to be passed");
	}

	this.apiKey = apiKey;

	if(productionEnv)
	{
		this.url = config.production.endpoint;
	}
	else
	{
		this.url = config.sandbox.endpoint;
	}
};

module.exports = EdmodoAPI;

EdmodoAPI.prototype.launchRequests = function launRequests(launchRequest, callback){
	var uri = this.resource_uri("launchRequests");
	var qs = { api_key : this.apiKey, launch_key : launchRequest};

	request({uri : uri, qs : qs, json : true }, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			callback(response, body);
		}
		else{
			throw new Error("Something went wrong. Error: " + error + "Response: " + response);
		}
	});
};

EdmodoAPI.prototype.resource_uri = function(resource){
	format = ".json";

	return this.url + "/" + resource + format;
};

