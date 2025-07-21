// db/connection.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function connectToDb() {
  if (db) return db;

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db('project2_db'); 
  return db;
}

module.exports = connectToDb;
