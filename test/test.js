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

	describe('Array helper functions', function(){
		it('to_params should be return the correct params from an array', function(done){
			var array = ["param1", "param2"];

			array.to_params().should.equal('["param1","param2"]');

			done();
		});
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

	describe('launchRequest', function(){
		it('should get the correct object back from the launchRequest request when environment is production', function(done){	
	      client.launchRequests("5c18c7", function(response, body){
	      	
	      	body.should.have.property('user_type', 'TEACHER');
	      	body.should.have.property('user_token', 'b020c42d1');
	      	body.should.have.property('first_name', 'Bob');
	      	body.should.have.property('last_name', 'Smith');
	      	body.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	body.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');
	      	
	      	done();
	      })
		});
	});

	describe('users request', function(){
		it('should get the correct object back from the users request', function(done){	
	      var users = ["b020c42d1","jd3i1c0pl"];

	      client.users(users, function(response, body){
	      	body.should.have.length(2);

	      	var user1 = body[0]

	      	user1.should.have.property('user_type', 'TEACHER');
	      	user1.should.have.property('user_token', 'b020c42d1');
	      	user1.should.have.property('first_name', 'Bob');
	      	user1.should.have.property('last_name', 'Smith');
	      	user1.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user1.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');

	      	var user2 = body[1]

	      	user2.should.have.property('user_type', 'STUDENT');
	      	user2.should.have.property('user_token', 'jd3i1c0pl');
	      	user2.should.have.property('first_name', 'Jane');
	      	user2.should.have.property('last_name', 'Student');
	      	user2.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user2.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');
	      	
	      	done();
	      })
		});
	});

	describe('groups request', function(){
		it('should get the correct object back from the groups request', function(done){	
	      var groups = [379557, 379562];

	      client.groups(groups, function(response, body){
	      	body.should.have.length(2);
	      	
	      	var group1 = body[0]

	      	group1.should.have.property('group_id', 379557);
	      	group1.should.have.property('title', 'Algebra');
	      	group1.should.have.property('member_count', 20);
	      	group1.should.have.property('owners')
	      	group1.should.have.property('start_level', '9th');
	      	group1.should.have.property('end_level', '9th');

	      	group1.owners.should.be.instanceof(Array).and.have.lengthOf(2);

	      	var group2 = body[1]

	      	group2.should.have.property('group_id', 379562);
	      	group2.should.have.property('title', 'Geometry');
	      	group2.should.have.property('member_count', 28);
	      	group2.should.have.property('owners');
	      	group2.should.have.property('start_level', '3rd');
	      	group2.should.have.property('end_level', '3rd');

	      	group2.owners.should.be.instanceof(Array).and.have.lengthOf(1);
	      	
	      	done();
	      })
		});
	});

	describe('groupsForUser request', function(){
		it('should get the correct object back from the groupsForUsers request', function(done){	
	      var userToken = "b020c42d1";

	      client.groupsForUser(userToken, function(response, body){
	      	
	      	body.should.be.instanceof(Array).and.have.lengthOf(2);

	      	var group1 = body[0]

	      	group1.should.have.property('group_id', 379557);
	      	group1.should.have.property('title', 'Algebra');
	      	group1.should.have.property('member_count', 20);
	      	group1.should.have.property('owners')
	      	group1.should.have.property('start_level', '9th');
	      	group1.should.have.property('end_level', '9th');

	      	group1.owners.should.be.instanceof(Array).and.have.lengthOf(2);

	      	var group2 = body[1]

	      	group2.should.have.property('group_id', 379562);
	      	group2.should.have.property('title', 'Geometry');
	      	group2.should.have.property('member_count', 28);
	      	group2.should.have.property('owners');
	      	group2.should.have.property('start_level', '3rd');
	      	group2.should.have.property('end_level', '3rd');

	      	group2.owners.should.be.instanceof(Array).and.have.lengthOf(1);
	      	
	      	done();
	      })
		});
	});

	describe('members request', function(){
		it('should get the correct object back from the members request', function(done){	
	      var group_id = 379557;

	      client.members(group_id, function(response, body){
	      	body.should.be.instanceof(Array).and.have.lengthOf(3);

	      	var user1 = body[0];

	      	user1.should.have.property('user_type', 'TEACHER');
	      	user1.should.have.property('user_token', 'b020c42d1');
	      	user1.should.have.property('first_name', 'Bob');
	      	user1.should.have.property('last_name', 'Smith');
	      	user1.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user1.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');

	      	var user2 = body[1];

	      	user2.should.have.property('user_type', 'TEACHER');
	      	user2.should.have.property('user_token', '693d5c765');
	      	user2.should.have.property('first_name', 'Tom');
	      	user2.should.have.property('last_name', 'Jefferson');
	      	user2.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user2.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');

	      	var user3 = body[2];

	      	user3.should.have.property('user_type', 'STUDENT');
	      	user3.should.have.property('user_token', 'jd3i1c0pl');
	      	user3.should.have.property('first_name', 'Jane');
	      	user3.should.have.property('last_name', 'Student');
	      	user3.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user3.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');
	      	
	      	done();
	      })
		});
	});

	describe('classmates request', function(){
		it('should get the correct object back from the classmates request', function(done){	
	      var userToken = "jd3i1c0pl";

	      client.classmates(userToken, function(response, body){

	      	body.should.be.instanceof(Array).and.have.lengthOf(2);

	      	var user1 = body[0];

	      	user1.should.have.property('user_type', 'STUDENT');
	      	user1.should.have.property('user_token', '83a8e614d');
	      	user1.should.have.property('first_name', 'Allison');
	      	user1.should.have.property('last_name', 'Student');
	      	user1.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user1.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');

	      	var user2 = body[1];

	      	user2.should.have.property('user_type', 'STUDENT');
	      	user2.should.have.property('user_token', '7968c39b7');
	      	user2.should.have.property('first_name', 'Mike');
	      	user2.should.have.property('last_name', 'Student');
	      	user2.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user2.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');
	      	
	      	done();
	      })
		});
	});

	describe('teachers request', function(){
		it('should get the correct object back from the teachers request', function(done){	
	      var userToken = "jd3i1c0pl";

	      client.teachers(userToken, function(response, body){

	      	body.should.be.instanceof(Array).and.have.lengthOf(2);

	      	var user1 = body[0];

	      	user1.should.have.property('user_type', 'TEACHER');
	      	user1.should.have.property('user_token', 'b020c42d1');
	      	user1.should.have.property('first_name', 'Bob');
	      	user1.should.have.property('last_name', 'Smith');
	      	user1.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user1.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');

	      	var user2 = body[1];

	      	user2.should.have.property('user_type', 'TEACHER');
	      	user2.should.have.property('user_token', '693d5c765');
	      	user2.should.have.property('first_name', 'Tom');
	      	user2.should.have.property('last_name', 'Jefferson');
	      	user2.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user2.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');
	      	
	      	done();
	      })
		});
	});

	describe('teachermates request', function(){
		it('should get the correct object back from the teachermates request', function(done){	
	      var userToken = "jd3i1c0pl";

	      client.teachermates(userToken, function(response, body){

	      	body.should.be.instanceof(Array).and.have.lengthOf(2);

	      	var user1 = body[0];

	      	user1.should.have.property('user_type', 'TEACHER');
	      	user1.should.have.property('user_token', 'b020c42d1');
	      	user1.should.have.property('first_name', 'Bob');
	      	user1.should.have.property('last_name', 'Smith');
	      	user1.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user1.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');

	      	var user2 = body[1];

	      	user2.should.have.property('user_type', 'TEACHER');
	      	user2.should.have.property('user_token', '693d5c765');
	      	user2.should.have.property('first_name', 'Tom');
	      	user2.should.have.property('last_name', 'Jefferson');
	      	user2.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user2.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');
	      	
	      	done();
	      })
		});
	});

	describe('teacherConnections request', function(){
		it('should get the correct object back from the teacherConnections request', function(done){	
	      var userToken = "jd3i1c0pl";

	      client.teacherConnections(userToken, function(response, body){

	      	body.should.be.instanceof(Array).and.have.lengthOf(1);

	      	var user1 = body[0];

	      	user1.should.have.property('user_type', 'TEACHER');
	      	user1.should.have.property('user_token', '693d5c765');
	      	user1.should.have.property('first_name', 'Tom');
	      	user1.should.have.property('last_name', 'Jefferson');
	      	user1.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	user1.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');
	      	
	      	done();
	      })
		});
	});

	describe('assignmentsComingDue request', function(){
		it('should get the correct object back from the assignmentsComingDue request', function(done){	
	      var userToken = "jd3i1c0pl";

	      client.assignmentsComingDue(userToken, function(response, body){

	      	body.should.be.instanceof(Array).and.have.lengthOf(1);

	      	var assignment = body[0];

	      	assignment.should.have.property('assignment_id', 4738052);
	      	assignment.should.have.property('assignment_title', 'Chapter 6 Homework');
	      	assignment.should.have.property('description', 'Do lots of practice problems ');
	      	assignment.should.have.property('due_date', '2011-10-11');

	      	// Recipients
	      	var recipients = assignment.recipients

	      	recipients.should.be.instanceof(Array).and.have.lengthOf(2);

	      	// Creator property
	      	var creator = assignment.creator;

	      	creator.should.have.property('user_type', 'TEACHER');
	      	creator.should.have.property('title', 'MR');
	      	creator.should.have.property('first_name', 'Bob');
	      	creator.should.have.property('last_name', 'Smith');
	      	creator.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
	      	creator.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');
	      	
	      	done();
	      })
		});
	});
});