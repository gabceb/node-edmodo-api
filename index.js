var util = require('util'),
	request = require('request'),
	events = require('events'),
	_und = require('underscore'),
	_und_s = require('underscore.string'),
	moment = require('moment'),
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
		else if(typeof this[i] == 'object'){
			params += JSON.stringify(this[i]);
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

// GET Requests

EdmodoAPI.prototype.launchRequests = function launRequests(launchRequest, callback){
	
	var uri = this.resource_uri("launchRequests", "json");
	var qs = { api_key : this.apiKey, launch_key : launchRequest};

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.users = function users(userIds, callback){
	
	// HACK HACK: Same hack used by jQuery to detect arrays cross platforms. See http://stackoverflow.com/a/2763063/1664346
	if(toString.call(userIds) !== "[object Array]")
	{
		userIds = [userIds];
	}

	var uri = this.resource_uri("users", "json");
	var qs = { api_key : this.apiKey, user_tokens : userIds.to_params() };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.groups = function groups(groups, callback){
	
	// HACK HACK: Same hack used by jQuery to detect arrays cross platforms. See http://stackoverflow.com/a/2763063/1664346
	if(toString.call(groups) !== "[object Array]")
	{
		groups = [groups];
	}

	var uri = this.resource_uri("groups", "json");
	var qs = { api_key : this.apiKey, group_ids : groups.to_params() };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.groupsForUser = function groups_for_user(userToken, callback){
	
	var uri = this.resource_uri("groupsForUser", "json");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.members = function members(groupId, callback){
	
	var uri = this.resource_uri("members", "json");
	var qs = { api_key : this.apiKey, group_id : groupId };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.classmates = function classmates(userToken, callback){
	
	var uri = this.resource_uri("classmates", "json");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.teachers = function teachers(userToken, callback){
	
	var uri = this.resource_uri("teachers", "json");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.teachermates = function teachermates(userToken, callback){
	
	var uri = this.resource_uri("teachermates", "json");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.teacherConnections = function teacherConnections(userToken, callback){
	
	var uri = this.resource_uri("teacherConnections", "json");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.assignmentsComingDue = function assignmentsComingDue(userToken, callback){
	
	var uri = this.resource_uri("assignmentsComingDue", "json");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.gradesSetByAppForUser = function gradesSetByAppForUser(userToken, callback){
	
	var uri = this.resource_uri("gradesSetByAppForUser", "json");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.gradesSetByAppForGroup = function gradesSetByAppForGroup(groupId, callback){
	
	var uri = this.resource_uri("gradesSetByAppForGroup", "json");
	var qs = { api_key : this.apiKey, group_id : groupId };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.badgesAwarded = function badgesAwarded(userToken, callback){
	
	var uri = this.resource_uri("badgesAwarded", "json");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.eventsByApp = function eventsByApp(userToken, callback){
	
	var uri = this.resource_uri("eventsByApp", "json");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.parents = function parents(userToken, callback){
	
	var uri = this.resource_uri("parents", "json");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.children = function children(userToken, callback){
	
	var uri = this.resource_uri("children", "json");
	var qs = { api_key : this.apiKey, user_token : userToken };

	this.request(uri, qs, callback);
};

EdmodoAPI.prototype.profiles = function profiles(userTokens, callback){
	
	// HACK HACK: Same hack used by jQuery to detect arrays cross platforms. See http://stackoverflow.com/a/2763063/1664346
	if(toString.call(userTokens) !== "[object Array]")
	{
		userTokens = [userTokens];
	}

	var uri = this.resource_uri("profiles", "json");
	var qs = { api_key : this.apiKey, user_tokens : userTokens.to_params() };

	this.request(uri, qs, callback);
};

// POST requests

// Options params:
//
// userToken: String
// content: String
// recipients: Array of Objects
// attachments: Array of Objects 
EdmodoAPI.prototype.userPost = function userPost(options, callback){
	
	// Default parameters
	options.content = options.content || "";
	options.recipients = options.recipients || [];
	options.attachments = options.attachments || [];

	var uri = this.resource_uri("userPost");

	var qs = { api_key : this.apiKey, user_token : options.userToken, content : options.content, recipients : options.recipients, attachments : options.attachments };

	this.request(uri, qs, callback, "POST");
};

// Options params:
//
// userToken: String
// content : String
// assignment_id: Integer
// attachments: Array of Objects 
EdmodoAPI.prototype.turnInAssignment = function turnInAssignment(options, callback){
	
	// Default parameters
	options.content = options.content || "";
	options.attachments = options.attachments || [];

	var uri = this.resource_uri("turnInAssignment");

	var qs = { api_key : this.apiKey, user_token : options.userToken, content : options.content, assignment_id : options.assignment_id, attachments : options.attachments };

	this.request(uri, qs, callback, "POST");
};

// Options params:
//
// badgeTitle: String
// description : String
// imageUrl: String
EdmodoAPI.prototype.registerBadge = function registerBadge(options, callback){
	
	// Default parameters
	options.badgeTitle = options.badgeTitle || "";
	options.description = options.description || "";
	options.imageUrl = options.imageUrl || "";

	var uri = this.resource_uri("registerBadge");

	var qs = { api_key : this.apiKey, badge_title : options.badgeTitle, description : options.description, image_url : options.imageUrl };

	this.request(uri, qs, callback, "POST");
};

// Options params:
//
// badgeId : Integer
// badgeTitle: String
// description : String
// imageUrl: String
EdmodoAPI.prototype.updateBadge = function updateBadge(options, callback){
	
	// Default parameters
	options.badgeTitle = options.badgeTitle || "";
	options.description = options.description || "";
	options.imageUrl = options.imageUrl || "";

	var uri = this.resource_uri("updateBadge");

	var qs = { api_key : this.apiKey, badge_id : options.badgeId, badge_title : options.badgeTitle, description : options.description, image_url : options.imageUrl };

	this.request(uri, qs, callback, "POST");
};

// Options params:
//
// badgeId : Integer
// userToken : String
EdmodoAPI.prototype.awardBadge = function awardBadge(options, callback){
	
	var uri = this.resource_uri("awardBadge");

	var qs = { api_key : this.apiKey, user_token : options.userToken, badge_id : options.badgeId };

	this.request(uri, qs, callback, "POST");
};

// Options params:
//
// badgeId : Integer
// userToken : String
EdmodoAPI.prototype.revokeBadge = function revokeBadge(options, callback){
	
	var uri = this.resource_uri("revokeBadge");

	var qs = { api_key : this.apiKey, user_token : options.userToken, badge_id : options.badgeId };

	this.request(uri, qs, callback, "POST");
};

// Options params:
//
// groupId : Integer
// title : String
// total : Integer
EdmodoAPI.prototype.newGrade = function newGrade(options, callback){
	
	// Default parameters
	options.title = options.title || "";

	var uri = this.resource_uri("newGrade");

	var qs = { api_key : this.apiKey, group_id : options.groupId, title : options.title, total : options.total };

	this.request(uri, qs, callback, "POST");
};

// Options params:
//
// gradeId : Integer
// userToken : String
// score : Integer
EdmodoAPI.prototype.setGrade = function setGrade(options, callback){

	var uri = this.resource_uri("setGrade");

	var qs = { api_key : this.apiKey, grade_id : options.gradeId, user_token : options.userToken, score : options.score };

	this.request(uri, qs, callback, "POST");
};

// Options params:
//
// user_token : String
// description : String
// start_date : Date
// end_date : Date
// recipients : Array of Objects
EdmodoAPI.prototype.newEvent = function newEvent(options, callback){

	// Default parameters
	options.description = options.description || "";
	options.startDate = moment(options.startDate).format("YYYY-MM-DD");
	options.endDate = moment(options.endDate).format("YYYY-MM-DD");

	var uri = this.resource_uri("newEvent");

	var qs = { api_key : this.apiKey, user_token : options.userToken, description : options.description, start_date : options.startDate, end_date : options.endDate, recipients : options.recipients.to_params() };

	this.request(uri, qs, callback, "POST");
};

// Options params:
//
// user_token : String
// publisher_owned : Integer
// resource : Object
EdmodoAPI.prototype.addToLibrary = function addToLibrary(options, callback){

	var uri = this.resource_uri("addToLibrary");

	var qs = { api_key : this.apiKey, user_token : options.userToken, publisher_owned : options.publisherOwned, resource : JSON.stringify(options.resource) };

	this.request(uri, qs, callback, "POST");
};

// Private methods

EdmodoAPI.prototype.request = function(uri, qs, callback, method){

	// Default to GET method
	method = method || "GET";

	request(uri, {qs : qs, json : true, method : method }, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			callback(response, body);
		}
		else{
			throw new Error("Something went wrong. Error: " + JSON.stringify(error) + "Response: " + JSON.stringify(response));
		}
	});
};

EdmodoAPI.prototype.resource_uri = function(resource, format){
	
	if(format) {
		format = "." + format;
	}
	else {
		format = "";
	}

	return this.url + "/" + resource + format;
};

