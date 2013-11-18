var fakeweb = require('node-fakeweb'),
	config = require('../../config.js')();

fakeweb.allowNetConnect = false;
var api_key = "1234567890abcdefghijklmn";

exports.api_key = api_key;
exports.config = config;
exports.fakeweb = fakeweb;