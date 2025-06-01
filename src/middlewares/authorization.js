// src/middlewares/authorization.js
/**
 * Middleware de autorización por roles.
 * @param  {...string} allowedRoles - Roles permitidos (ej. 'admin', 'user').
 */
export const authorizeRoles = (...allowedRoles) => (req, res, next) => {
    // El usuario debe venir autenticado por Passport
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
  
    // Verificamos que el rol del usuario esté en la lista de permitidos
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
  
    next();
  };
  