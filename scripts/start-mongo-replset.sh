#!/bin/bash

# Create data directory if it doesn't exist
mkdir -p ~/data/db

# Stop any running MongoDB instance
mongod --shutdown 2>/dev/null || true
pkill mongod 2>/dev/null || true

# Wait a moment to ensure process is completely stopped
sleep 2

# Start MongoDB with replica set configuration
mongod --dbpath ~/data/db --replSet rs0 --bind_ip localhost &

# Wait for MongoDB to start
sleep 5

# Initialize the replica set
mongosh --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})"

echo "MongoDB started as a replica set 'rs0'"
