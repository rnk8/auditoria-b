// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Para usar variables de entorno desde .env

const sequelize = new Sequelize(
    process.env.DB_DATABASE,    // Nombre de la base de datos
    process.env.DB_USER,    // Usuario de la base de datos
    process.env.DB_PASSWORD,// Contraseña de la base de datos
    {
        host: process.env.DB_HOST, // Host de la base de datos
        dialect: 'postgres',
        logging: false,            // Desactiva el logging de Sequelize
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = { sequelize };
