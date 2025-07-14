// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts (CSE 341)',
    },
    servers: [
      {
        url: 'http://localhost:8080', // Development server
      },
      {
        url: 'https://cse341-node-tgkb.onrender.com', // Production server
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to files with Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };