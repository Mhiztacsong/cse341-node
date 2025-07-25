const express = require('express');
const app = express();
require('dotenv').config();

const booksRoutes = require('./routes/booksRoutes');
const authorsRoutes = require('./routes/authorsRoutes'); 

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books and Authors API',
      version: '1.0.0',
      description: 'A simple API for managing books and authors using MongoDB',
    },
  },
  apis: ['./project2/routes/*.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
