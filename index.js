var util = require('util'),
	request = require('request'),
	events = require('events'),
	_und = require('underscore'),
	_und_s = require('underscore.string'),
	config = require('./config.js')();

// Helper functions
Array.prototype.to_params = function(){
	var params = '[';

	for(var i = 0; i < this.length; i++)
	{
		// TO DO: Refactor this method
		if (typeof this[i] === 'string') {
    		params += '"' + this[i] + '"';
		}
		else {
			params += this[i];
		}
		

		if(i != this.length - 1)
		{
			params += ",";
		}
	}

	return params + "]";
}

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

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.users = function users(userIds, callback){
	
	// HACK HACK: Same hack used by jQuery to detect arrays cross platforms. See http://stackoverflow.com/a/2763063/1664346
	if(toString.call(userIds) !== "[object Array]")
	{
		userIds = [userIds];
	}

	var uri = this.resource_uri("users");
	var qs = { api_key : this.apiKey, user_tokens : userIds.to_params() };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.groups = function groups(groups, callback){
	
	// HACK HACK: Same hack used by jQuery to detect arrays cross platforms. See http://stackoverflow.com/a/2763063/1664346
	if(toString.call(groups) !== "[object Array]")
	{
		groups = [groups];
	}

	var uri = this.resource_uri("groups");
	var qs = { api_key : this.apiKey, group_ids : groups.to_params() };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.groupsForUser = function groups_for_user(userToken, callback){
	
	var uri = this.resource_uri("groupsForUser");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.members = function members(groupId, callback){
	
	var uri = this.resource_uri("members");
	var qs = { api_key : this.apiKey, group_id : groupId };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.classmates = function classmates(userToken, callback){
	
	var uri = this.resource_uri("classmates");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

// Private methods

EdmodoAPI.prototype.request = function(uri, qs, callback){
	request({uri : uri, qs : qs, json : true }, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			callback(response, body);
		}
		else{
			throw new Error("Something went wrong. Error: " + JSON.stringify(error) + "Response: " + JSON.stringify(response));
		}
	});
};

EdmodoAPI.prototype.resource_uri = function(resource){
	format = ".json";

	return this.url + "/" + resource + format;
};

