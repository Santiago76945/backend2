// src/routes/carts.router.js

import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorization.js';
import cartRepository from '../repositories/cartRepository.js';
import ticketService from '../services/ticketService.js';

const router = Router();

// Crear carrito
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  async (req, res) => {
    try {
      const cart = await cartRepository.create();
      res.status(201).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Ver carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartRepository.getById(req.params.cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar producto al carrito
router.post(
  '/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  async (req, res) => {
    try {
      const updatedCart = await cartRepository.addProduct(
        req.params.cid,
        req.params.pid,
        req.body.quantity || 1
      );
      res.json(updatedCart);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Quitar producto del carrito
router.delete(
  '/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  async (req, res) => {
    try {
      const cart = await cartRepository.removeProduct(req.params.cid, req.params.pid);
      res.json(cart);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Vaciar carrito
router.delete(
  '/:cid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  async (req, res) => {
    try {
      const cart = await cartRepository.clear(req.params.cid);
      res.json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Modificar carrito completo
router.put(
  '/:cid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  async (req, res) => {
    try {
      const { products } = req.body;
      const updatedCart = await cartRepository.update(req.params.cid, products);
      res.json(updatedCart);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Finalizar compra y generar ticket
router.post(
  '/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  async (req, res) => {
    try {
      const { failedProductIds, totalAmount } = await cartRepository.purchase(req.params.cid);
      const ticket = await ticketService.createTicket({
        amount: totalAmount,
        purchaser: req.user.email
      });
      res.json({ ticket, failedProductIds });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;

