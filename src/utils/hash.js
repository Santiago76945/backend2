// src/utils/hash.js

import bcrypt from 'bcrypt';

// Hashear contraseña
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Validar contraseña
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};
