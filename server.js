const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

app.get('/', (req, res) => {
  res.send('Hello World! Welcome!');
});

const contactsRoute = require('./routes/contacts');
app.use('/contacts', contactsRoute);

// Professional route for previous activity
app.get('/professional', async (req, res) => {
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
    console.error("Error fetching from MongoDB:", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
