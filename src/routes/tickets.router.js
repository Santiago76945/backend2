// src/routes/tickets.router.js

import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorization.js';
import ticketRepository from '../repositories/ticketRepository.js';

const router = Router();

// Listar todos los tickets (solo admin)
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const all = await ticketRepository.getAll();
      res.json(all);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Obtener un ticket por ID (solo admin)
router.get(
  '/:tid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const ticket = await ticketRepository.getById(req.params.tid);
      if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });
      res.json(ticket);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
