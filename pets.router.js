// pets.router.js
const express = require('express');
const router = express.Router();

// Array que actuará como "persistencia" en memoria para las mascotas
let pets = [];

// Middleware para procesar el parámetro 'pet'
router.param('pet', (req, res, next, petName) => {
  // Validar que el parámetro contenga solo letras y espacios
  const regex = /^[A-Za-z\s]+$/;
  if (!regex.test(petName)) {
    return res.status(400).json({ error: 'El parámetro pet debe contener solo letras y espacios' });
  }
  // Buscar la mascota por nombre (sin diferenciar mayúsculas/minúsculas)
  const pet = pets.find(p => p.name.toLowerCase() === petName.toLowerCase());
  if (!pet) {
    return res.status(404).json({ error: 'Mascota no encontrada' });
  }
  req.pet = pet;
  next();
});

// POST ('/'): Agregar una nueva mascota
router.post('/', (req, res) => {
  const { name, specie } = req.body;
  if (!name || !specie) {
    return res.status(400).json({ error: 'Debe proporcionar los campos "name" y "specie"' });
  }
  // Validar que el nombre contenga solo letras y espacios
  const regex = /^[A-Za-z\s]+$/;
  if (!regex.test(name)) {
    return res.status(400).json({ error: 'El nombre debe contener solo letras y espacios' });
  }
  const newPet = { name, specie };
  pets.push(newPet);
  res.status(201).json({ message: 'Mascota agregada', pet: newPet });
});

// GET ('/:pet'): Obtener una mascota por su nombre
router.get('/:pet', (req, res) => {
  // req.pet ya fue definido en router.param
  res.json({ pet: req.pet });
});

// PUT ('/:pet'): Actualizar la mascota, añadiéndole "adopted": true
router.put('/:pet', (req, res) => {
  // req.pet ya fue definido en router.param
  req.pet.adopted = true;
  res.json({ message: 'Mascota actualizada', pet: req.pet });
});

module.exports = router;
