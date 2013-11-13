require('mocha');

var EdmodoAPI = require('../index'),
	should = require('should'),
	util = require('util');
	config = require('../config.js')();

require('./fixtures/fixtures');

var client = null;
var api_key = "1234567890abcdefghijklmn";
var invalid_api_key = "invalid_key";

describe('Node-Edmodo-API', function(){

	beforeEach(function(){
		client = new EdmodoAPI(api_key);
	});

	describe('initialization', function(){
		it('should create a new instance of the EdmodoAPI class with no parameters', function(done){
			client.should.be.an.instanceOf(EdmodoAPI)

			done();
		});

		it('should have a url set to sandbox if no environment is passed on initialization', function(done){
			client.should.have.property("url", config.sandbox.endpoint);

			done();
		});

		it('should have a url set to production if production env used', function(done){
			client = new EdmodoAPI(api_key, true);

			client.should.have.property("url", config.production.endpoint);

			done();
		});

		it('should throw an error if no API key is passed on initialization', function(done){
			(function(){ new EdmodoAPI() }).should.throwError('An Edmodo API key has to be passed');

			done();
		});

		it('should throw an error if the API key is passed as null on initialization', function(done){
			(function(){ new EdmodoAPI(null) }).should.throwError('An Edmodo API key has to be passed');

			done();
		});
	});

	describe('config', function(){
		it('should have a production endpoint', function(done){	
	      config.should.have.property("production");

	      done();
		});

	    it('should have a sandbox endopoint', function(done){
	      config.should.have.property("sandbox");

	      done();
	    });
	});
});