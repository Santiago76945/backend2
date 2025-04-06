import jwt from 'jsonwebtoken';

// Clave secreta para firmar el token (en producción, guárdala en variables de entorno)
export const SECRET_KEY = 'CLAVE_SUPER_SECRETA';

export const generateToken = (user) => {
  // Puedes personalizar el payload con la info que necesites
  const payload = {
    user: {
      id: user._id,
      email: user.email,
      role: user.role || 'user',
    },
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '24h', // tiempo de expiración del token
  });

  return token;
};
