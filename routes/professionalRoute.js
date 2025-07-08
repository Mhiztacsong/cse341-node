const express = require('express');
const router = express.Router();
const { getProfessional } = require('../controllers/professionalController');

router.get('/', getProfessional);

module.exports = router;
