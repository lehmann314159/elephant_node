#!/bin/bash

# housekeeping
export host=http://localhost:5000

# Clear everything out
curl -s -X GET -H 'Content-Type: application/json' $host/clear
curl -s -X DELETE -H 'Content-Type: application/json' $host/user/

# Journal CRUD
# Create
export UserID=`curl -s -X POST -H 'Content-Type: application/json' -d '{"username": "ted", "password": "password", "email": "test@user.com" }' $host/user | jq '.[0]."id"'`
export JournalID=`curl -s -X POST -H 'Content-Type: application/json' -d '{"title": "test entry one", "description": "test description one", "user_id": "$UserID" }' $host/user/$UserID/journal | jq '.[0]."id"'`
curl -s -X POST -H 'Content-Type: application/json' -d '{"title": "test entry two", "description": "test description two", "user_id": "$UserID" }' $host/user/$UserID/journal

#echo "User    ID is $UserID"
#echo "Journal ID is $JournalID"

# Read By ID
printf "\n\n";
curl -s -X GET -H 'Content-Type: application/json' $host/user/$UserID/journal/$JournalID

# Update By ID
printf "\n\n";
curl -s -X PUT -H 'Content-Type: application/json' -d '{"new_title": "test entry one (edited)" }' $host/user/$UserID/journal/$JournalID

# Update
printf "\n\n";
curl -s -X PUT -H 'Content-Type: application/json' -d '{"new_description": "test description (edited)" }' $host/user/$UserID/journal/

# Read All
printf "\n\n";
curl -s -X GET -H 'Content-Type: application/json' $host/user/$UserID/journal/$JournalID

# Delete By ID
printf "\n\n";
curl -s -X DELETE -H 'Content-Type: application/json' $host/user/$UserID/journal/$JournalID

printf "\n\n";
curl -s -X GET -H 'Content-Type: application/json' $host/user/$UserID/journal

# Delete
printf "\n\n";
curl -s -X DELETE -H 'Content-Type: application/json' $host/user/$UserID/journal

printf "\n\n";
curl -s -X GET -H 'Content-Type: application/json' $host/user/$UserID/journal
