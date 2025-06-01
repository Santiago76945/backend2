
// src/routes/tickets.router.js

import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorization.js';
import ticketController from '../controllers/ticketController.js';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  ticketController.getAll
);

router.get(
  '/:tid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  ticketController.getById
);

export default router;
