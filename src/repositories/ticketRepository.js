// src/repositories/ticketRepository.js

import ticketDAO from '../dao/ticketDAO.js';
import TicketDTO from '../dtos/ticketDTO.js';

class TicketRepository {
  async create({ code, purchaseDatetime, amount, purchaser }) {
    const ticket = await ticketDAO.create({
      code,
      purchase_datetime: purchaseDatetime,
      amount,
      purchaser
    });
    return new TicketDTO(ticket);
  }

  async getById(id) {
    const t = await ticketDAO.getById(id);
    return t ? new TicketDTO(t) : null;
  }

  async getAll() {
    const all = await ticketDAO.getAll();
    return all.map(t => new TicketDTO(t));
  }
}

export default new TicketRepository();
