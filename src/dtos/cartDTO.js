// src/dtos/cartDTO.js

export default class CartDTO {
    constructor({ _id, user, products, createdAt, updatedAt }) {
      this.id = _id;
      this.user = user;
      this.items = products.map(item => ({
        product: {
          id: item.product._id,
          title: item.product.title,
          price: item.product.price,
          code: item.product.code,
          thumbnail: item.product.thumbnail
        },
        quantity: item.quantity
      }));
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  