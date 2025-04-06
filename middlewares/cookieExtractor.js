export const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      // Asegúrate de usar la misma key con la que guardaste la cookie (por ejemplo 'token')
      token = req.cookies['token'];
    }
    return token;
  };
  