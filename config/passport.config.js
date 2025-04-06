// config/passport.config.js

import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import { UserModel } from '../models/User.model.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import { SECRET_KEY } from '../utils/jwt.js';
import { cookieExtractor } from '../middlewares/cookieExtractor.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  // Estrategia para registrar usuario
  passport.use(
    'register',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;

          // Verificar si el usuario ya existe
          const userExists = await UserModel.findOne({ email });
          if (userExists) {
            return done(null, false, { message: 'El usuario ya existe' });
          }

          // Crear nuevo usuario con contraseña hasheada
          const hashedPassword = createHash(password);
          const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Estrategia para login
  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
          }
          if (!isValidPassword(user, password)) {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Estrategia JWT
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET_KEY,
      },
      async (jwtPayload, done) => {
        try {
          // jwtPayload.user viene de la firma del token
          return done(null, jwtPayload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
