const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome!');
});

// Routes
const contactsRoute = require('./routes/contactRoute');
const professionalRoute = require('./routes/professionalRoute');

app.use('/contacts', contactsRoute);
app.use('/professional', professionalRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

