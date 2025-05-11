// src/dao/ticketDAO.js

import Ticket from '../models/Ticket.model.js';

class TicketDAO {
  async create(ticketData) {
    const ticket = new Ticket(ticketData);
    return ticket.save();
  }

  async getById(id) {
    return Ticket.findById(id).lean();
  }

  async getAll() {
    return Ticket.find().lean();
  }
}

export default new TicketDAO();
