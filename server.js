const express = require('express');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'A simple API for managing contacts using MongoDB'
    }
  },
  apis: ['./routes/*.js'], // Path to route files with Swagger comments
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Default route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome!');
});

// Routes
const contactsRoute = require('./routes/contactRoute');
const professionalRoute = require('./routes/professionalRoute');

app.use('/contacts', contactsRoute);
app.use('/professional', professionalRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
