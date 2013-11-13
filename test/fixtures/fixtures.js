var fakeweb = require('node-fakeweb'),
	fs = require('fs'),
	path = require('path'),
	util = require('util'),
	config = require('../../config.js')();

fakeweb.allowNetConnect = false;
var api_key = "1234567890abcdefghijklmn";

// Unauthorized request
uri = config.sandbox.endpoint + "/launchRequests.json?api_key=" + api_key + "&launch_key=5c18c7"

fakeweb.registerUri({uri: uri, body : '{"error":{"code":3000,"message":"Unauthorized API request"}}', status: ["401", "Authorization Required"]});

// launchRequest request uri
uri = config.sandbox.endpoint + "/launchRequests.json?api_key=" + api_key + "&launch_key=5c18c7";

fakeweb.registerUri({uri : uri, body : '{ "user_type":"TEACHER", "user_token":"b020c42d1", "first_name":"Bob", "last_name":"Smith", "avatar_url":"http://edmodoimages.s3.amazonaws.com/default_avatar.png", "thumb_url":"http://edmodoimages.s3.amazonaws.com/default_avatar_t.png","groups":[{"group_id":379557,"is_owner":1},{"group_id":379562,"is_owner":1}]}'});

// Users request uri
uri = config.sandbox.endpoint + '/users.json?api_key=' + api_key + '&user_tokens=%5B%22b020c42d1%22%2C%22jd3i1c0pl%22%5D';

fakeweb.registerUri({uri : uri, body : "[ {'user_type':'TEACHER','user_token':'b020c42d1','first_name':'Bob','last_name':'Smith','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png'},{'user_type':'STUDENT','user_token':'jd3i1c0pl','first_name':'Jane','last_name':'Student','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png'}]"});

// Profiles request uri
uri = config.sandbox.endpoint + '/profiles.json?api_key=' + api_key + '&user_tokens=%5B%22b020c42d1%22%5D';

fakeweb.registerUri({uri : uri, body : "[ {'user_token':'b020c42d1','school':{'edmodo_school_id':123456,'nces_school_id':'ABC987654','name':'Edmodo High','address':'60 E. 3rd Avenue, #390','city':'San Mateo','state':'CA','zip_code':'94401','country_code':'US'}}]"});

// Groups request uri
uri = config.sandbox.endpoint + '/groups.json?api_key=' + api_key + '&group_ids=%5B379557%2C379562%5D';

fakeweb.registerUri({uri : uri, body : "[{'group_id':379557, 'title':'Algebra', 'member_count':20, 'owners':['b020c42d1','693d5c765'],'start_level':'9th','end_level':'9th'},{'group_id':379562,'title':'Geometry','member_count':28,'owners':['b020c42d1'],'start_level':'3rd','end_level':'3rd'}]"});

// GroupsForUser request uri
uri = config.sandbox.endpoint + '/groupsForUser.json?api_key=' + api_key + '&user_token=b020c42d1';

fakeweb.registerUri({uri : uri, body : "[{'group_id':379557,'title':'Algebra','member_count':20,'owners':['b020c42d1','693d5c765'],'start_level':'9th','end_level':'9th'},{'group_id':379562,'title':'Geometry','member_count':28,'owners':['b020c42d1'],'start_level':'3rd','end_level':'3rd'}]"});

// Members request uri
uri = config.sandbox.endpoint + '/members.json?api_key=' + api_key + '&group_id=379557';

fakeweb.registerUri({uri : uri, body : "[{'user_type':'TEACHER','user_token':'b020c42d1','first_name':'Bob','last_name':'Smith','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png'},{'user_type':'TEACHER','user_token':'693d5c765','first_name':'Tom','last_name':'Jefferson','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png'},{'user_type':'STUDENT','user_token':'jd3i1c0pl','first_name':'Jane','last_name':'Student','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png'}]"});

// Classmates request uri
uri = config.sandbox.endpoint + '/classmates.json?api_key=' + api_key + '&user_token=jd3i1c0pl';

fakeweb.registerUri({uri : uri,
					 body : "[{'user_type':'STUDENT','user_token':'83a8e614d','first_name':'Allison','last_name':'Student','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png','shared_groups':[379557,379558]},{'user_type':'STUDENT','user_token':'7968c39b7','first_name':'Mike','last_name':'Student','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png','shared_groups':[379558]}]"});

// Teachers request uri
uri = config.sandbox.endpoint + '/teachers.json?api_key=' + api_key + '&user_token=jd3i1c0pl';

fakeweb.registerUri({uri : uri, body : "[{'user_type':'TEACHER','user_token':'b020c42d1','first_name':'Bob','last_name':'Smith','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png','title':'MR','shared_groups':[379557]},{'user_type':'TEACHER','user_token':'693d5c765','first_name':'Tom','last_name':'Jefferson','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png','title':'MR','shared_groups':[379557,379558]}]"});

// Teachermatess request uri
uri = config.sandbox.endpoint + '/teachermates.json?api_key=' + api_key + '&user_token=jd3i1c0pl';

fakeweb.registerUri({uri : uri, body : "[{'user_type':'TEACHER','user_token':'b020c42d1','first_name':'Bob','last_name':'Smith','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png','title':'MR','shared_groups':[379557]},{'user_type':'TEACHER','user_token':'693d5c765','first_name':'Tom','last_name':'Jefferson','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png','title':'MR','shared_groups':[379557,379558]}]"});

// Teacher Connections request uri
uri = config.sandbox.endpoint + '/teacherConnections.json?api_key=' + api_key + '&user_token=jd3i1c0pl';

fakeweb.registerUri({uri : uri,body : "[{'user_type':'TEACHER','user_token':'693d5c765','first_name':'Tom','last_name':'Jefferson','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png','title':'MR'}]"});

// AssignmentsComingDue request uri
uri = config.sandbox.endpoint + '/assignmentsComingDue.json?api_key=' + api_key + '&user_token=jd3i1c0pl';

fakeweb.registerUri({uri : uri, body : "[{'assignment_id':4738052,'assignment_title':'Chapter 6 Homework','description':'Do lots of practice problems ','due_date':'2011-10-11','recipients':[{'user_token':'9ff85e278'},{'group_id':379557}],'creator':{'user_type':'TEACHER','title':'MR','first_name':'Bob','last_name':'Smith','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png','user_token':'b020c42d1'}}]"});

// gradesSetByAppForUser request uri
uri = config.sandbox.endpoint + '/gradesSetByAppForUser.json?api_key=' + api_key + '&user_token=jd3i1c0pl';

fakeweb.registerUri({uri : uri,body : "[{'grade_id':3695,'title':'Super Project','group_id':379557,'score':'8','total':'10'}]"});

// gradesSetByAppForGroup request uri
uri = config.sandbox.endpoint + '/gradesSetByAppForGroup.json?api_key=' + api_key + '&group_id=379557';

fakeweb.registerUri({uri : uri, body : "[{'grade_id':3695,'title':'Super Project','group_id':379557,'average_score':7,'total':'10','graded_count':15}]"});

// badgesAwarded request uri
uri = config.sandbox.endpoint + '/badgesAwarded.json?api_key=' + api_key + '&user_token=jd3i1c0pl';

fakeweb.registerUri({uri : uri, body : "[{'badge_id':6580,'image_url':'http://edmodobadges.s3.amazonaws.com/1234.jpg','title':'Good Job','description':'You did a good job!','times_awarded':1}]"});

// eventsByApp request uri
uri = config.sandbox.endpoint + '/eventsByApp.json?api_key=' + api_key + '&user_token=b020c42d1';

fakeweb.registerUri({uri : uri, body : "[{'event_id':621119,'description':'Pizza party tomorrow','start_date':'2011-12-07','end_date':'2011-12-07','recipients':[{'user_token':'b020c42d1'},{'group_id':379557}]}]"});

// parents request uri
uri = config.sandbox.endpoint + '/parents.json?api_key=' + api_key + '&user_token=jd3i1c0pl';

fakeweb.registerUri({uri : uri, body : "[{'user_type':'PARENT','user_token':'5e9c0e0f5','first_name':'Mary','last_name':'Smith','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png','relation':'MOM'}]"});

// children request uri
uri = config.sandbox.endpoint + '/children.json?api_key=' + api_key + '&user_token=5e9c0e0f5';

fakeweb.registerUri({uri : uri, body : "[{ 'user_type':'STUDENT','user_token':'jd3i1c0pl','first_name':'Jane','last_name':'Student','avatar_url':'http://edmodoimages.s3.amazonaws.com/default_avatar.png','thumb_url':'http://edmodoimages.s3.amazonaws.com/default_avatar_t.png'}]"});