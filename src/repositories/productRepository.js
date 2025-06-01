// src/repositories/productRepository.js

import productDAO from '../dao/productDAO.js';
import ProductDTO from '../dtos/productDTO.js';

class ProductRepository {
  async getAll(filter = {}) {
    const products = await productDAO.getAll(filter);
    return products.map(p => new ProductDTO(p));
  }

  async getById(id) {
    const p = await productDAO.getById(id);
    return p ? new ProductDTO(p) : null;
  }

  async create(data) {
    const created = await productDAO.create(data);
    return new ProductDTO(created);
  }

  async update(id, data) {
    const updated = await productDAO.updateById(id, data);
    return updated ? new ProductDTO(updated) : null;
  }

  async delete(id) {
    const deleted = await productDAO.deleteById(id);
    return deleted ? new ProductDTO(deleted) : null;
  }
}

// **Exportamos como default para que `import productRepository from '…'` funcione**
export default new ProductRepository();

