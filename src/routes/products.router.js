// src/routes/products.router.js

import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorization.js';
import productController from '../controllers/productController.js';

const router = Router();

router.get('/', productController.getAll);

router.get('/:pid', productController.getById);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  productController.create
);

router.put(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  productController.update
);

router.delete(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  productController.remove
);

export default router;