#!/bin/bash
curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "test_user", "password": "password", "email": "test@user.com" }' http://localhost:5000/user
curl -i -X PUT -H 'Content-Type: application/json' -d '{"new_username": "test-user", "new_password": "drowssap"}' http://localhost:5000/user/2
curl -i -X GET -H 'Content-Type: application/json' http://localhost:5000/user
#curl -i -X DELETE http://localhost:5000/user/2
curl -i -X DELETE -H 'Content-Type: application/json' -d '{"username": "test_user"}' http://localhost:5000/user
curl -i -X GET -H 'Content-Type: application/json' http://localhost:5000/user
