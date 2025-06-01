// src/routes/carts.router.js

import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorization.js';
import cartController from '../controllers/cartController.js';

const router = Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  cartController.createCart
);

router.get('/:cid', cartController.getCart);

router.post(
  '/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  cartController.addProduct
);

router.delete(
  '/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  cartController.removeProduct
);

router.delete(
  '/:cid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  cartController.clearCart
);

router.put(
  '/:cid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  cartController.updateCart
);

router.post(
  '/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  cartController.purchase
);

export default router;
