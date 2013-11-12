Node Edmodo API
===========================

A Node NPM package to interact with the Edmodo API

Usage:
-------

- Get an Edmodo Publisher Account at http://www.edmodo.com/publishers-requests.
- Initialize an edmodo-api object passing your api key.
- Start calling Edmodo API methods.

The gem uses sandbox mode by default. Use mode => production to use it on production environments

Examples:
----------
	client = new EdmodoAPI(api_key);
	client.launch_requests("5c18c7");

TO DO
---------


Supported Edmodo API methods
---------

- launchRequests
- users
- groups
- groupsForUser
- members
- classmates
- teachers
- teachermates
- teacherConnections
- assignmentsComingDue
- gradesSetByAppForUser
- gradesSetByAppForGroup
- badgesAwarded
- eventsByApp
- parents
- children
- profiles
- registerBadge
- updateBadge
- awardBadge
- revokeBadge
- newGrade
- setGrade
- newEvent
- addToLibrary
- setNotification
- UserPost
- turnInAssignment
- NewEvent
- AddToLibrary

### Testing

```
make test 
make test-dev (verbose output for request and debug function)
```

### ZOMG Fork! Thank you!

You're welcome to fork this project and send pull requests.

Copyright (c) 2013 Gabriel Cebrian, released under the MIT license
