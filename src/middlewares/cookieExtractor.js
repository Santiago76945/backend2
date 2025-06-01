// src/middlewares/cookieExtractor.js

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    // Debe coincidir con la key usada al setear la cookie en el login ('token')
    token = req.cookies['token'];
  }
  return token;
};
