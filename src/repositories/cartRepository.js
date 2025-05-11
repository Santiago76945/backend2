// src/repositories/cartRepository.js

import cartDAO from '../dao/cartDAO.js';
import productDAO from '../dao/productDAO.js';
import CartDTO from '../dtos/cartDTO.js';

class CartRepository {
  async create() {
    const cart = await cartDAO.create();
    return new CartDTO(cart.toObject());
  }

  async getById(id) {
    const cart = await cartDAO.getById(id);
    return cart ? new CartDTO(cart) : null;
  }

  async addProduct(cartId, productId, qty = 1) {
    const cart = await cartDAO.addProduct(cartId, productId, qty);
    return new CartDTO(cart);
  }

  async removeProduct(cartId, productId) {
    const cart = await cartDAO.removeProduct(cartId, productId);
    return cart ? new CartDTO(cart) : null;
  }

  async clear(cartId) {
    const cart = await cartDAO.clearCart(cartId);
    return new CartDTO(cart);
  }

  async update(cartId, products) {
    const cart = await cartDAO.updateCart(cartId, products);
    return new CartDTO(cart);
  }

  async purchase(cartId) {
    const cart = await cartDAO.getById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    const failedProductIds = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const prod = item.product;
      if (prod.stock >= item.quantity) {
        await productDAO.updateById(prod._id, { stock: prod.stock - item.quantity });
        totalAmount += prod.price * item.quantity;
      } else {
        failedProductIds.push(prod._id.toString());
      }
    }

    const remaining = cart.products.filter(item =>
      failedProductIds.includes(item.product._id.toString())
    );
    cart.products = remaining;
    await cartDAO.save(cart);

    return { failedProductIds, totalAmount };
  }
}

export default new CartRepository();
