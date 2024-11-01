// app.js
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');
const User = require('./src/models/User'); // Importa el modelo de usuario
const Cuenta = require('./src/models/Cuenta'); // Importa el modelo Cuenta


const app = express();
const PORT = 3000;
const userRoutes = require('./src/routes/userRoutes');
const cuentaRoutes = require('./src/routes/cuentaRoutes');


app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/cuentas', cuentaRoutes);


// Sincroniza el modelo con la base de datos
sequelize.sync({ force: false }) // force: true recrea las tablas en cada inicio
    .then(() => {
        console.log('Tablas sincronizadas con la base de datos');
    })
    .catch(error => {
        console.error('Error al sincronizar las tablas:', error);
    });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
