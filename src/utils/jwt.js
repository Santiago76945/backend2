// src/utils/jwt.js

import jwt from 'jsonwebtoken';

// Clave secreta para firmar y verificar tokens JWT (desde .env)
export const SECRET_KEY = process.env.CLAVE_SUPER_SECRETA;

// Genera un JWT con el objeto `user` en el payload bajo `user`
export const generateToken = (user) => {
  const payload = {
    user: {
      id: user._id,
      email: user.email,
      role: user.role || 'user',
    },
  };

  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '24h',
  });
};

// Verifica un token y devuelve el payload
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

