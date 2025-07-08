const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const { MongoClient } = require('mongodb');


const app = express();
const PORT = 8080;

app.use(cors()); // Enable CORS for frontend JS
app.use(express.json());

// Route to serve professional data

// app.get('/professional', (req, res) => {
//   res.json(professionalData);
// });

app.get('/professional', async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const database = client.db('cse341');
    const collection = database.collection('professionals');

    const professional = await collection.findOne({}); // get the first document

    if (!professional) {
      return res.status(404).json({ message: "No professional data found" });
    }

    // Load base64 image from file
    const base64Image = fs.readFileSync('./data/base64Image.txt', 'utf-8');

    // Add it to the professional object
    professional.base64Image = base64Image;

    res.json(professional);
  } catch (err) {
    console.error("Error fetching from MongoDB:", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
