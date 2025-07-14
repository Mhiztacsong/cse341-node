const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

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

async function createContact(contactData) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('cse341');
    const result = await db.collection('contacts').insertOne(contactData);
    return { _id: result.insertedId, ...contactData };
  } finally {
    await client.close();
  }
}

async function updateContact(id, updatedData) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('cse341');
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    return result.modifiedCount > 0
      ? { _id: id, ...updatedData }
      : null;
  } finally {
    await client.close();
  }
}

async function deleteContact(id) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('cse341');
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0
      ? { message: `Contact ${id} deleted` }
      : null;
  } finally {
    await client.close();
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
