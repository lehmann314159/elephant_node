#!/bin/bash
# User CRUD
 curl -s -X POST   -H 'Content-Type: application/json' -d '{"username": "test_user", "password": "password", "email": "test@user.com" }' http://localhost:5000/user
 curl -s -X PUT    -H 'Content-Type: application/json' -d '{"new_username": "test-user", "new_password": "drowssap", "username": "test_user"}' http://localhost:5000/user/
 curl -s -X GET    -H 'Content-Type: application/json' http://localhost:5000/user
 curl -s -X DELETE -H 'Content-Type: application/json' -d '{"username": "test-user"}' http://localhost:5000/user
 curl -s -X GET    -H 'Content-Type: application/json' http://localhost:5000/user

#curl -i -X GET -H 'Content-Type: application/json' http://localhost:5000/user/1

# Journal CRUD
 curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "test entry", "description": "dear diary, today I wrote a journal entry..." }' http://localhost:5000/user/1/journal
#curl -i -X PUT -H 'Content-Type: application/json' -d '{"new_title": "test journal"}' http://localhost:5000/user/1/journal
#curl -i -X GET -H 'Content-Type: application/json' http://localhost:5000/user/1/journal
#curl -i -X DELETE -H 'Content-Type: application/json' -d '{"title": "test journal"}' http://localhost:5000/user/1/journal
#curl -i -X GET -H 'Content-Type: application/json' http://localhost:5000/user/1/journal
