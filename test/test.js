require('mocha');

var EdmodoAPI = require('../index'),
	should = require('should'),
	util = require('util');

require('./fixtures/fixtures');

var client = null;

describe('npm-package', function(){

	beforeEach(function(){
		client = new EdmodoAPI();
	});

	describe('initialization', function(){
		it('should create a new instance of the EdmodoAPI class', function(done){
			client.should.be.an.instanceOf(EdmodoAPI)

			done();
		});
	});

	// Add other tests here
});