Node Edmodo API
===========================

A Node NPM package to interact with the Edmodo API.

**If you are looking for a Ruby gem to interact with the API take a look at the [Edmodo API Gem](https://github.com/gabceb/edmodo-api)**

Usage:
-------

- Get an Edmodo Publisher Account at http://www.edmodo.com/publishers-requests.
- Initialize a EdmodoAPI object passing your api key and true or false if the production environment should be use (defaults to false).
- Start calling Edmodo API methods.

Examples:
----------
	// Sandbox environment
	client = new EdmodoAPI(api_key, false);
	client.launchRequests("5c18c7");

	// Production environment
	client = new EdmodoAPI(api_key, true);
	client.launchRequests("5c18c7");

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
