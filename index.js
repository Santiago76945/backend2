import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import initializePassport from './config/passport.config.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(cookieParser());

// Inicializar Passport
initializePassport();
app.use(passport.initialize());

// Conexión a la base de datos
mongoose
  .connect('mongodb://localhost:27017/backend2-coder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB conectada'))
  .catch((error) => console.error('Error al conectar DB:', error));

// Rutas
app.use('/api/sessions', sessionsRouter);

// Puesta en marcha del servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
