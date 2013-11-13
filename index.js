var util = require('util'),
	request = require('request'),
	events = require('events'),
	_und = require('underscore'),
	_und_s = require('underscore.string'),
	config = require('./config.js');

var _my = null;

var debug;

if (/\bverbose\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    console.error('DEBUG: %s', util.format.apply(util, arguments))
  }
} else {
  debug = function() {}
}

var EdmodoAPI = function(url){
	this.url = url;
	
};

EdmodoAPI.prototype = new events.EventEmitter;

module.exports = EdmodoAPI;

EdmodoAPI.prototype.fetch = function(){
	var self = this;

	request({uri : this.url, json : true }, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			self.original_response = body;
			
			// Do something here

			self.emit("fetch");
		}
		else{
			self.emit("error", error, response.statusCode );
		}
	});
};