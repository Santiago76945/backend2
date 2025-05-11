// ===============================
// src/routes/sessions.router.js
// ===============================

import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt.js';

const router = Router();

// Registro de usuario
router.post(
  '/register',
  passport.authenticate('register', {
    failureRedirect: '/api/sessions/failregister',
    session: false,
  }),
  (req, res) => {
    // Solo exponemos los campos estrictamente necesarios
    const { first_name, last_name, email, role } = req.user;
    res.status(201).json({
      status: 'success',
      payload: { first_name, last_name, email, role }
    });
  }
);

// Manejo de fallo en registro
router.get('/failregister', (_req, res) => {
  res.status(400).json({ status: 'error', error: 'Fallo en el registro' });
});

// Login de usuario
router.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/api/sessions/faillogin',
    session: false,
  }),
  (req, res) => {
    // Generamos token y lo enviamos en cookie
    const token = generateToken(req.user);
    res.cookie('token', token, { httpOnly: true });
    res.json({
      status: 'success',
      payload: { token }
    });
  }
);

// Manejo de fallo en login
router.get('/faillogin', (_req, res) => {
  res.status(400).json({ status: 'error', error: 'Fallo en el login' });
});

// Devuelve datos seguros del usuario autenticado
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { first_name, last_name, email, role } = req.user;
    res.json({
      status: 'success',
      payload: { first_name, last_name, email, role }
    });
  }
);

// Logout: limpia la cookie de autenticación
router.get('/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ status: 'success', message: 'Logout exitoso' });
});

export default router;
