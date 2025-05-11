// src/models/Ticket.model.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const ticketSchema = new Schema({
  code:              { type: String, required: true, unique: true },
  purchase_datetime: { type: Date,   required: true },
  amount:            { type: Number, required: true },
  purchaser:         { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model('Ticket', ticketSchema);
