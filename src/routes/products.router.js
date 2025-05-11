// src/routes/products.router.js

import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorization.js';
import productRepository from '../repositories/productRepository.js';

const router = Router();

// Listar todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productRepository.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un producto por ID
router.get('/:pid', async (req, res) => {
  try {
    const product = await productRepository.getById(req.params.pid);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear producto (solo admin)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const newProd = await productRepository.create(req.body);
      res.status(201).json(newProd);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Actualizar producto (solo admin)
router.put(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const updated = await productRepository.update(req.params.pid, req.body);
      if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Eliminar producto (solo admin)
router.delete(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const deleted = await productRepository.delete(req.params.pid);
      if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json({ message: 'Producto eliminado', deleted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
