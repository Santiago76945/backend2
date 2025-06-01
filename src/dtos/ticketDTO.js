// src/dtos/ticketDTO.js

export default class TicketDTO {
    constructor({ _id, code, purchase_datetime, amount, purchaser, createdAt, updatedAt }) {
      this.id = _id;
      this.code = code;
      this.purchaseDatetime = purchase_datetime;
      this.amount = amount;
      this.purchaser = purchaser;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  