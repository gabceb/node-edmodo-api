test = require("./fixture-helper");

// userPost request uri
var uri = config.sandbox.endpoint + "/userPost?api_key=1234567890abcdefghijklmn&user_token=b020c42d1&content=This%20is%20my%20test%20message&recipients=%5B%7B%22user_token%22%3A%22b020c42d1%22%7D%2C%7B%22user_token%22%3A%22693d5c765%22%7D%2C%7B%22group_id%22%3A379557%7D%5D&attachments=%5B%7B%22type%22%3A%22link%22%2C%22title%22%3A%22A%20link%22%2C%22url%22%3A%22http%3A%2F%2Fwww.edmodo.com%22%7D%2C%7B%22type%22%3A%22embed%22%2C%22title%22%3A%22An%20embed%20with%20an%20optional%20thumbnail%20url%22%2C%22thumb_url%22%3A%22http%3A%2F%2Fimages.edmodo.com%2Fimages%2Flogos%2Fedmodo_134x43.png%22%7D%5D";

test.fakeweb.registerUri({ uri: uri, body: '{"status":"success"}' });

// turnInAssignment request uri
uri = config.sandbox.endpoint + "/turnInAssignment?api_key=" + test.api_key + "&user_token=83a8e614d&assignment_id=4738052&content=Here%20is%20my%20assignment%20submission&attachments=%5B%7B%22type%22%3A%22link%22%2C%22title%22%3A%22A%20link%22%2C%22url%22%3A%22http%3A%2F%2Fwww.edmodo.com%22%7D%5D";

test.fakeweb.registerUri({ uri: uri, body: '{"status":"success"}' });

// RegisterBadge request uri
uri = config.sandbox.endpoint + "/registerBadge?api_key=" + test.api_key + "&badge_title=Good%20Job&description=You%20did%20a%20good%20job&image_url=http%3A%2F%2Fwww.edmodo.com%2Fbadge_image.png";

test.fakeweb.registerUri({ uri: uri, body: '{"badge_id":6580}'});

// UpdateBadge request uri
uri = config.sandbox.endpoint + "/updateBadge?api_key=" + test.api_key + "&badge_id=6580&badge_title=Very%20Good%20Job&description=You%20did%20a%20very%20good%20job&image_url=http%3A%2F%2Fwww.edmodo.com%2Fnew_badge_image.png";

test.fakeweb.registerUri({ uri: uri, body: '{"status":"success"}'});

// awardBadge request uri
uri = config.sandbox.endpoint + "/awardBadge?api_key=" + test.api_key + "&user_token=jd3i1c0pl&badge_id=6580";

test.fakeweb.registerUri({ uri: uri, body: '{"success":1, "times_awarded":1}'});

// revokeBadge request uri
uri = config.sandbox.endpoint + "/revokeBadge?api_key=" + test.api_key + "&user_token=jd3i1c0pl&badge_id=6580";

test.fakeweb.registerUri({ uri: uri, body: '{"success":1, "times_awarded":0}'});

// newGrade request uri
uri = config.sandbox.endpoint + "/newGrade?api_key=" + test.api_key + "&group_id=379557&title=Super%20Project&total=10";

test.fakeweb.registerUri({ uri: uri, body: '{"grade_id":3694}'});

// setGrade request uri
uri = config.sandbox.endpoint + "/setGrade?api_key=" + test.api_key + "&grade_id=3694&user_token=jd3i1c0pl&score=3";

test.fakeweb.registerUri({ uri: uri, body: '{"user_token":"83a8e614d", "score":"3", "total":"10"}'});

// newEvent request uri
uri = config.sandbox.endpoint + "/newEvent?api_key=" + test.api_key + "&user_token=b020c42d1&description=Pizza%20party%20tomorrow&start_date=#{Date.today.to_s}&end_date=#{Date.today.to_s}&recipients=%5B%7B%22user_token%22%3A%22b020c42d1%22%7D%2C%7B%22group_id%22%3A379557%7D%5D";

test.fakeweb.registerUri({ uri: uri, body: '{"event_id":621119}'});

// addToLibrary request uri

uri = config.sandbox.endpoint + "/addToLibrary?api_key=" + test.api_key + "&user_token=b020c42d1&publisher_owned=1&resource=%7B%3Atype%3D%3E%22link%22%2C%20%3Atitle%3D%3E%22A%20link%22%2C%20%3Aurl%3D%3E%22http%3A%2F%2Fwww.edmodo.com%22%2C%20%3Athumb_url%3D%3E%22http%3A%2F%2Fimages.edmodo.com%2Fimages%2Flogos%2Fedmodo_134x43.png%22%7D";

test.fakeweb.registerUri({ uri: uri, body: '{"library_item_id":"456"}'});

// setNotification request uri
uri = config.sandbox.endpoint + "/setNotification?api_key=" + test.api_key + "&user_token=b020c42d1&notification_count=1";

test.fakeweb.registerUri({ uri: uri, body: '{"updated_notification_count":"3"}'});