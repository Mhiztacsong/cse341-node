const fs = require('fs');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const getProfessional = async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const database = client.db('cse341');
    const collection = database.collection('professionals');
    const professional = await collection.findOne({});

    if (!professional) {
      return res.status(404).json({ message: 'No professional data found' });
    }

    const base64Image = fs.readFileSync('./data/base64Image.txt', 'utf-8');
    professional.base64Image = base64Image;

    res.json(professional);
  } catch (err) {
    console.error('Error fetching professional data:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
};

module.exports = { getProfessional };
