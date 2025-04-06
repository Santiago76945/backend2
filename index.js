// index.js
const express = require('express');
const app = express();
const petsRouter = require('./pets.router');

// Middleware para parsear JSON
app.use(express.json());

// Montamos el router de mascotas en /api/pets
app.use('/api/pets', petsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
