// src/controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Controlador para registrar un usuario
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

// Controlador para el login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Busca al usuario por el email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Verifica la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Genera un token JWT
        const token = jwt.sign({ id: user.id }, 'tu_secreto', { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
    }
};
module.exports = { registerUser, loginUser };
