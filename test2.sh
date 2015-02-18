#!/bin/bash
# housekeeping
export host=http://localhost:5000

# User CRUD
# Create
export UserID=`curl -s -X POST -H 'Content-Type: application/json' -d '{"username": "test_user", "password": "password", "email": "test@user.com" }' $host/user | jq '.[0]."id"'`
printf "\n\n";

# Read
curl -s -X GET -H 'Content-Type: application/json' $host/user/$UserID
printf "\n\n";

# Update
curl -s -X PUT -H 'Content-Type: application/json' -d '{"new_username": "test-user" }' $host/user/$UserID
printf "\n\n";

curl -s -X GET -H 'Content-Type: application/json' $host/user/$UserID
printf "\n\n";

# Delete
curl -s -X DELETE -H 'Content-Type: application/json' $host/user/$UserID

curl -s -X GET -H 'Content-Type: application/json' $host/user/$UserID
printf "\n\n";
