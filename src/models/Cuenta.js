// src/models/Cuenta.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const User = require('./User'); // Importa el modelo User para definir la relación

const Cuenta = sequelize.define('Cuenta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'cuentas', // Nombre de la tabla
    timestamps: false
});

// Define la relación: Una Cuenta pertenece a un Usuario
Cuenta.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Cuenta, { foreignKey: 'userId', as: 'cuentas' });

module.exports = Cuenta;
