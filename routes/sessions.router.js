import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt.js';
import { UserModel } from '../models/User.model.js';
import { createHash, isValidPassword } from '../utils/hash.js';

const router = Router();

// Registro sin usar la estrategia "register" de Passport directamente
// (Para usarla, podrías hacer algo como router.post('/register', passport.authenticate('register', ...)) )
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ status: 'error', message: 'Usuario ya existe' });
    }

    const hashedPassword = createHash(password);
    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });

    res.status(201).json({ status: 'success', payload: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error });
  }
});

// Login sin usar la estrategia "login" de Passport directamente
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    if (!isValidPassword(user, password)) {
      return res.status(401).json({ status: 'error', message: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = generateToken(user);

    // Guardar token en cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true, // usar en producción con HTTPS
      // sameSite: 'none' // en caso de front/back separados con diferentes dominios
    });

    res.json({ status: 'success', payload: { token } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error });
  }
});

// Ruta protegida con JWT (estrategia 'jwt' definida en passport.config.js)
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // req.user es lo que se pasó en el payload (jwtPayload.user)
    res.json({ status: 'success', payload: req.user });
  }
);

export default router;
