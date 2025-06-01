// src/routes/sessions.router.js

import { Router } from 'express';
import passport from 'passport';
import sessionController from '../controllers/sessionController.js';

const router = Router();

// Registro
router.post(
  '/register',
  passport.authenticate('register', { failureRedirect: '/api/sessions/failregister', session: false }),
  sessionController.register
);

router.get('/failregister', (_req, res) => {
  res.status(400).json({ status: 'error', error: 'Fallo en el registro' });
});

// Login
router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin', session: false }),
  sessionController.login
);

router.get('/faillogin', (_req, res) => {
  res.status(400).json({ status: 'error', error: 'Fallo en el login' });
});

// Current
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  sessionController.current
);

// Logout
router.get('/logout', sessionController.logout);

export default router;