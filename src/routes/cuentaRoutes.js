// src/routes/cuentaRoutes.js
const express = require('express');
const { saveAmount } = require('../controllers/cuentaController');
const router = express.Router();

// Ruta para guardar el monto en la cuenta
router.post('/save', saveAmount);

module.exports = router;
