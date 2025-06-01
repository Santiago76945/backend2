// src/dao/productDAO.js

import Product from '../models/Product.model.js';

class ProductDAO {
  async getAll(filter = {}) {
    return Product.find(filter).lean();
  }

  async getById(id) {
    return Product.findById(id).lean();
  }

  async create(productData) {
    const product = new Product(productData);
    return product.save();
  }

  async updateById(id, updateData) {
    return Product.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }

  async deleteById(id) {
    return Product.findByIdAndDelete(id).lean();
  }
}

export default new ProductDAO();
