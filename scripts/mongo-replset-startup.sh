#!/bin/bash

# This script will be executed on system startup to ensure MongoDB always runs as a replica set
# Save this file and add it to your system's startup scripts or crontab with @reboot

# Path to this script
SCRIPT_PATH="$(realpath $0)"

# Create a log file for this script
LOG_FILE="/mnt/creotask/backend/logs/mongo-replset-startup.log"

echo "$(date): Starting MongoDB replica set..." > $LOG_FILE

# Create data directory if it doesn't exist
mkdir -p ~/data/db

# Stop any running MongoDB instance
mongod --shutdown 2>/dev/null || true
pkill mongod 2>/dev/null || true

# Wait a moment to ensure process is completely stopped
sleep 2

# Start MongoDB with replica set configuration
mongod --dbpath ~/data/db --replSet rs0 --bind_ip localhost &
MONGO_PID=$!

echo "$(date): MongoDB started with PID: $MONGO_PID" >> $LOG_FILE

# Wait for MongoDB to start
sleep 5

# Check if replica set is already initialized
IS_INITIALIZED=$(mongosh --quiet --eval "try { rs.status().ok } catch(e) { 0 }")

if [ "$IS_INITIALIZED" == "1" ]; then
    echo "$(date): Replica set already initialized" >> $LOG_FILE
else
    # Initialize the replica set
    echo "$(date): Initializing replica set..." >> $LOG_FILE
    mongosh --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})" >> $LOG_FILE 2>&1
fi

echo "$(date): MongoDB replica set setup complete" >> $LOG_FILE
