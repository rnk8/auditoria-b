// src/controllers/cuentaController.js
const Cuenta = require('../models/Cuenta');

// Controlador para guardar el monto en la cuenta
const saveAmount = async (req, res) => {
    const { userId, amount } = req.body;
    try {
        // Genera un número de cuenta único (puedes mejorarlo según tus necesidades)
        const accountNumber = `ACC-${Date.now()}`;

        // Crea una nueva cuenta en la base de datos
        const newCuenta = await Cuenta.create({
            userId,
            accountNumber,
            amount
        });

        res.status(201).json({ message: 'Monto guardado exitosamente', cuenta: newCuenta });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el monto' });
    }
};

module.exports = { saveAmount };
