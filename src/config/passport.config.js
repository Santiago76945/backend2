// src/config/passport.config.js

import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import { UserModel } from '../models/User.model.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import { SECRET_KEY } from '../utils/jwt.js';
import { cookieExtractor } from '../middlewares/cookieExtractor.js';

const LocalStrategy = local.Strategy;
const JWTStrategy   = jwt.Strategy;
const ExtractJWT    = jwt.ExtractJwt;

const initializePassport = () => {
  // Estrategia de registro
  passport.use(
    'register',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age, role } = req.body;

          // Verificar si el usuario ya existe
          const userExists = await UserModel.findOne({ email });
          if (userExists) {
            return done(null, false, { message: 'El usuario ya existe' });
          }

          // Determinar rol: admin si lo pide o si es adminCoder@coder.com
          let userRole = 'user';
          if (role === 'admin' || email === 'adminCoder@coder.com') {
            userRole = 'admin';
          }

          // Crear usuario con contraseña hasheada
          const hashedPassword = createHash(password);
          const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role: userRole
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Estrategia de login
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
          // jwtPayload.user fue firmado en generateToken
          return done(null, jwtPayload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
