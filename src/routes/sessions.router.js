// src/routes/sessions.router.js

import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt.js';

const router = Router();

// Registro usando la estrategia 'register' de Passport
router.post(
  '/register',
  passport.authenticate('register', {
    failureRedirect: '/api/sessions/failregister',
    session: false,
  }),
  async (req, res) => {
    // Si la estrategia 'register' tuvo éxito, el usuario recién creado estará en req.user.
    // Aquí podrías crear el carrito si fuera necesario, por ejemplo:
    // const newCart = await CartModel.create({ products: [] });
    // req.user.cartId = newCart._id;
    // await req.user.save();

    res.status(201).json({ status: 'success', payload: req.user });
  }
);

// Ruta para gestionar el fallo en el registro
router.get('/failregister', (req, res) => {
  res.status(400).json({ status: 'error', error: 'Fallo en el registro' });
});

// Login usando la estrategia 'login' de Passport
router.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/api/sessions/faillogin',
    session: false,
  }),
  async (req, res) => {
    // Si el login es exitoso, req.user contendrá el usuario autenticado.
    // Generamos el token JWT y lo guardamos en una cookie.
    const token = generateToken(req.user);

    res.cookie('token', token, {
      httpOnly: true,
      // secure: true,      // Descomentar en producción si se usa HTTPS
      // sameSite: 'none',  // Descomentar si front/back tienen dominios distintos
    });

    res.json({ status: 'success', payload: { token } });
  }
);

// Ruta para gestionar el fallo en el login
router.get('/faillogin', (req, res) => {
  res.status(400).json({ status: 'error', error: 'Fallo en el login' });
});

// Ruta protegida usando la estrategia 'jwt' de Passport
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ status: 'success', payload: req.user });
  }
);

export default router;
