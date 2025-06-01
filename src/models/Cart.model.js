// src/models/Cart.model.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  product:  { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min: 1 }
});

const cartSchema = new Schema({
  user:     { type: Schema.Types.ObjectId, ref: 'User' },
  products: { type: [cartItemSchema], default: [] }
}, {
  timestamps: true
});

export default mongoose.model('Cart', cartSchema);
