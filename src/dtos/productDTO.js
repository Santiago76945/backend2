// src/dtos/productDTO.js

export default class ProductDTO {
    constructor({ _id, title, description, price, code, category, thumbnail, stock, status, createdAt, updatedAt }) {
        this.id = _id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.category = category;
        this.thumbnail = thumbnail;
        this.stock = stock;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

