// src/dao/cartDAO.js

import Cart from '../models/Cart.model.js';

class CartDAO {
  async create() {
    const cart = new Cart();
    return cart.save();
  }

  async getById(id) {
    return Cart.findById(id)
      .populate('products.product')
      .lean();
  }

  async addProduct(cartId, productId, quantity = 1) {
    const cart = await Cart.findById(cartId);
    const item = cart.products.find(p => p.product.equals(productId));
    if (item) {
      item.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    return cart.save();
  }

  async updateQuantity(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    const item = cart.products.find(p => p.product.equals(productId));
    if (!item) throw new Error('Producto no encontrado en el carrito');
    item.quantity = quantity;
    return cart.save();
  }

  async removeProduct(cartId, productId) {
    return Cart.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true }
    ).lean();
  }

  async clearCart(cartId) {
    return Cart.findByIdAndUpdate(
      cartId,
      { $set: { products: [] } },
      { new: true }
    ).lean();
  }

  async updateCart(cartId, products) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');
    cart.products = products.map(item => ({
      product: item.product,
      quantity: item.quantity
    }));
    return cart.save();
  }

  async save(cart) {
    return cart.save();
  }
}

export default new CartDAO();
