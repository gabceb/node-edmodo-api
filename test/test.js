require('mocha');

var EdmodoAPI = require('../index'),
	should = require('should'),
	util = require('util');
	config = require('../config.js')();

require('./fixtures/fixtures');

var client = null;

describe('npm-package', function(){

	beforeEach(function(){
		client = new EdmodoAPI();
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
			client = new EdmodoAPI(true);

			client.should.have.property("url", config.production.endpoint);

			done();
		});
	});

	descript('')

	// Add other tests here
});