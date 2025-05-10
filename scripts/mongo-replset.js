// MongoDB Replica Set Configuration
rsConf = {
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" }
  ]
}

// Initialize the replica set
rs.initiate(rsConf)
