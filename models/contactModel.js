const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGO_URI;

async function getAllContacts() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('cse341');
    return await db.collection('contacts').find().toArray();
  } finally {
    await client.close();
  }
}

async function getContactById(id) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('cse341');
    return await db.collection('contacts').findOne({ _id: new ObjectId(id) });
  } finally {
    await client.close();
  }
}

module.exports = { getAllContacts, getContactById };
