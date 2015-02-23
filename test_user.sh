#!/bin/bash
# User CRUD
 curl -s -X POST   -H 'Content-Type: application/json' -d '{"username": "test_user", "password": "password", "email": "test@user.com" }' http://localhost:5000/user
 curl -s -X PUT    -H 'Content-Type: application/json' -d '{"new_username": "test-user", "new_password": "drowssap", "username": "test_user"}' http://localhost:5000/user/
 curl -s -X GET    -H 'Content-Type: application/json' http://localhost:5000/user
 curl -s -X DELETE -H 'Content-Type: application/json' -d '{"username": "test-user"}' http://localhost:5000/user
 curl -s -X GET    -H 'Content-Type: application/json' http://localhost:5000/user
