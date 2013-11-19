require('mocha');

var EdmodoAPI = require('../index'),
	should = require('should'),
	util = require('util');
	config = require('../config.js')();

require('./fixtures/get-fixtures');
require('./fixtures/post-fixtures');

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

	describe('GET requests', function(){
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

		describe('gradesSetByAppForUser request', function(){
			it('should get the correct object back from the gradesSetByAppForUser request', function(done){	
		      var userToken = "jd3i1c0pl";

		      client.gradesSetByAppForUser(userToken, function(response, body){

		      	body.should.be.instanceof(Array).and.have.lengthOf(1);

		      	var grade = body[0];

		      	grade.should.have.property('grade_id', 3695);
		      	grade.should.have.property('title', 'Super Project');
		      	grade.should.have.property('group_id', 379557);
		      	grade.should.have.property('score', '8');
		      	grade.should.have.property('total', '10');
		      	
		      	done();
		      })
			});
		});

		describe('gradesSetByAppForGroup request', function(){
			it('should get the correct object back from the gradesSetByAppForGroup request', function(done){	
		      var groupId = 379557;

		      client.gradesSetByAppForGroup(groupId, function(response, body){

		      	body.should.be.instanceof(Array).and.have.lengthOf(1);

		      	var grade = body[0];

		      	grade.should.have.property('grade_id', 3695);
		      	grade.should.have.property('title', 'Super Project');
		      	grade.should.have.property('group_id', 379557);
		      	grade.should.have.property('average_score', 7);
		      	grade.should.have.property('graded_count', 15);
		      	grade.should.have.property('total', '10');
		      	
		      	done();
		      })
			});
		});

		describe('badgesAwarded request', function(){
			it('should get the correct object back from the badgesAwarded request', function(done){	
		      var userToken = "jd3i1c0pl";

		      client.badgesAwarded(userToken, function(response, body){

		      	body.should.be.instanceof(Array).and.have.lengthOf(1);

		      	var grade = body[0];

		      	grade.should.have.property('badge_id', 6580);
		      	grade.should.have.property('image_url', 'http://edmodobadges.s3.amazonaws.com/1234.jpg');
		      	grade.should.have.property('title', 'Good Job');
		      	grade.should.have.property('description', 'You did a good job!');
		      	grade.should.have.property('times_awarded', 1);
		      	
		      	done();
		      })
			});
		});

		describe('eventsByApp request', function(){
			it('should get the correct object back from the eventsByApp request', function(done){	
		      var userToken = "b020c42d1";

		      client.eventsByApp(userToken, function(response, body){

		      	body.should.be.instanceof(Array).and.have.lengthOf(1);

		      	var event1 = body[0];

		      	event1.should.have.property('event_id', 621119);
		      	event1.should.have.property('description', 'Pizza party tomorrow');
		      	event1.should.have.property('start_date', '2011-12-07');
		      	event1.should.have.property('end_date', '2011-12-07');

		      	var recipients = event1.recipients;

		      	recipients.should.be.instanceof(Array).and.have.lengthOf(2);

		      	recipients[0].should.have.property('user_token', 'b020c42d1');
		      	recipients[1].should.have.property('group_id', 379557);
		      	
		      	done();
		      })
			});
		});

		describe('parents request', function(){
			it('should get the correct object back from the parents request', function(done){	
		      var userToken = "jd3i1c0pl";

		      client.parents(userToken, function(response, body){

		      	body.should.be.instanceof(Array).and.have.lengthOf(1);

		      	var parent = body[0];

		      	parent.should.have.property('user_type', 'PARENT');
		      	parent.should.have.property('user_token', '5e9c0e0f5');
		      	parent.should.have.property('first_name', 'Mary');
		      	parent.should.have.property('last_name', 'Smith');
		      	parent.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
		      	parent.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');
		      	
		      	done();
		      })
			});
		});

		describe('children request', function(){
			it('should get the correct object back from the children request', function(done){	
		      var userToken = "5e9c0e0f5";

		      client.children(userToken, function(response, body){

		      	body.should.be.instanceof(Array).and.have.lengthOf(1);

		      	var child = body[0];

		      	child.should.have.property('user_type', 'STUDENT');
		      	child.should.have.property('user_token', 'jd3i1c0pl');
		      	child.should.have.property('first_name', 'Jane');
		      	child.should.have.property('last_name', 'Student');
		      	child.should.have.property('avatar_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar.png');
		      	child.should.have.property('thumb_url', 'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png');
		      	
		      	done();
		      })
			});
		});

		describe('profiles request', function(){
			it('should get the correct object back from the profiles request', function(done){	
		      var userToken = "b020c42d1";

		      client.profiles(userToken, function(response, body){

		      	body.should.be.instanceof(Array).and.have.lengthOf(1);

		      	var profile = body[0];

		      	profile.should.have.property('user_token', 'b020c42d1');

		      	var school = profile.school;

		      	school.should.have.property('edmodo_school_id', 123456);
		      	school.should.have.property('nces_school_id', 'ABC987654');
		      	school.should.have.property('name', 'Edmodo High');
		      	school.should.have.property('address', '60 E. 3rd Avenue, #390');
		      	school.should.have.property('city', 'San Mateo');
		      	school.should.have.property('state', 'CA');
		      	school.should.have.property('zip_code', '94401');
		      	school.should.have.property('country_code', 'US');
		      	
		      	done();
		      })
			});
		});

		describe('POST requests', function(){

			describe('userPost', function(){
				it('should get the correct object back from the userPost request', function(done){
			      
			      var userToken = "b020c42d1";
			      var recipients = [{"user_token":"b020c42d1"},{"user_token":"693d5c765"},{"group_id":379557}];
			      var content = "This is my test message";
			      var attachments = [{"type":"link","title":"A link","url":"http://www.edmodo.com"},{"type":"embed","title":"An embed with an optional thumbnail url","thumb_url":"http://images.edmodo.com/images/logos/edmodo_134x43.png"}]; 

			      var options = {userToken : userToken, content : content, recipients : recipients.to_params(), attachments : attachments.to_params() };
 
			      client.userPost(options, function(response, body){
 			      	body.should.have.property('status', 'success');
 			      	
 			      	done();
 			      });
 				});
			});

			describe('turnInAssignment', function(){
				it('should get the correct object back from the turnInAssignment request', function(done){	
			      
			      var userToken = "83a8e614d";
			      var assignment_id = 4738052;
			      var content = "Here is my assignment submission";
			      var attachments = [{"type":"link","title":"A link","url":"http://www.edmodo.com"}];

			      var options = {userToken : userToken, assignment_id : assignment_id, content : content, attachments : attachments.to_params() };

			      client.turnInAssignment(options, function(response, body){
			      	body.should.have.property('status', 'success');
			      	
			      	done();
			      });
				});
			});

			describe('registerBadge', function(){
				it('should get the correct object back from the registerBadge request', function(done){	
			      
			      var badgeTitle = "Good Job";
			      var description = "You did a good job";
			      var imageUrl = "http://www.edmodo.com/badge_image.png";
			      
			      var options = { badgeTitle : badgeTitle, description : description, imageUrl : imageUrl };

			      client.registerBadge(options, function(response, body){
			      	body.should.have.property('badge_id', 6580);
			      	
			      	done();
			      });
				});
			});

			describe('updateBadge', function(){
				it('should get the correct object back from the updateBadge request', function(done){	
			      
			      var badgeId = 6580;
			      var badgeTitle = "Very Good Job";
			      var description = "You did a very good job";
			      var imageUrl = "http://www.edmodo.com/new_badge_image.png";
			      
			      var options = { badgeId : badgeId, badgeTitle : badgeTitle, description : description, imageUrl : imageUrl };

			      client.updateBadge(options, function(response, body){
			      	body.should.have.property('status', 'success');
			      	
			      	done();
			      });
				});
			});

			describe('awardBadge', function(){
				it('should get the correct object back from the awardBadge request', function(done){	
			      
			      var userToken = "jd3i1c0pl";
			      var badgeId = 6580;
			      
			      var options = { badgeId : badgeId, userToken : userToken };

			      client.awardBadge(options, function(response, body){
			      	
			      	body.should.have.property('success', 1);
			      	body.should.have.property('times_awarded', 1);
			      	
			      	done();
			      });
				});
			});

			describe('revokeBadge', function(){
				it('should get the correct object back from the revokeBadge request', function(done){	
			      
			      var userToken = "jd3i1c0pl";
			      var badgeId = 6580;
			      
			      var options = { badgeId : badgeId, userToken : userToken };

			      client.revokeBadge(options, function(response, body){
			      	
			      	body.should.have.property('success', 1);
			      	body.should.have.property('times_awarded', 0);
			      	
			      	done();
			      });
				});
			});

			describe('newGrade', function(){
				it('should get the correct object back from the newGrade request', function(done){	
			      
			      var groupId = 379557;
			      var title = "Super Project";
			      var total = 10;
			      
			      var options = { groupId : groupId, title : title, total : total };

			      client.newGrade(options, function(response, body){
			      	
			      	body.should.have.property('grade_id', 3694);
			      	
			      	done();
			      });
				});
			});

			describe('setGrade', function(){
				it('should get the correct object back from the setGrade request', function(done){	
			      
			      var gradeId = 3694;
			      var userToken = "jd3i1c0pl";
			      var score = 3;
			      
			      var options = { gradeId : gradeId, userToken : userToken, score : score };

			      client.setGrade(options, function(response, body){
			      	
			      	body.should.have.property('user_token', "83a8e614d");
			      	body.should.have.property('score', '3');
			      	body.should.have.property('total', '10');
			      	
			      	done();
			      });
				});
			});

			describe('newEvent', function(){
				it('should get the correct object back from the newEvent request', function(done){	
			      
			      var userToken = "b020c42d1";
			      var description = "Pizza party tomorrow";
			      var startDate = new Date(2014,0,1);
			      var endDate = new Date(2015,0,1);
			      var recipients = [{"user_token":"b020c42d1"},{"group_id":379557}];
			      
			      var options = { userToken : userToken, description : description, startDate : startDate, endDate : endDate, recipients : recipients };

			      client.newEvent(options, function(response, body){
			      	
			      	body.should.have.property('event_id', 621119);
			      	
			      	done();
			      });
				});
			});

			describe('addToLibrary', function(){
				it('should get the correct object back from the addToLibrary request', function(done){	
			      
			      var userToken = "b020c42d1";
			      var publisherOwned = 1;
			      var resource = {"type":"link", "title": "A link", "url" : "http://www.edmodo.com", "thumb_url" : "http://images.edmodo.com/images/logos/edmodo_134x43.png"};
			      
			      var options = { userToken : userToken, publisherOwned : publisherOwned, resource : resource };

			      client.addToLibrary(options, function(response, body){
			      	
			      	body.should.have.property('library_item_id', "456");
			      	
			      	done();
			      });
				});
			});

			describe('setNotification', function(){
				it('should get the correct object back from the setNotification request', function(done){	
			      
			      var userToken = "b020c42d1";
			      var notificationCount = 1;
			      
			      var options = { userToken : userToken, notificationCount : notificationCount };

			      client.setNotification(options, function(response, body){
			      	
			      	body.should.have.property('updated_notification_count', "3");
			      	
			      	done();
			      });
				});
			});

		});
	});
});