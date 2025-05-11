// src/models/Product.model.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  title:       { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  stock:       { type: Number, required: true },
  code:        { type: String, required: true, unique: true },
  category:    { type: String },
  thumbnail:   { type: String },
  status:      { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
