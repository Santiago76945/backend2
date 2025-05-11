// src/services/ticketService.js

import { v4 as uuidv4 } from 'uuid';
import ticketRepository from '../repositories/ticketRepository.js';

class TicketService {
  /**
   * Crea y persiste un ticket de compra.
   * @param {Object} params
   * @param {number} params.amount  - Total de la compra.
   * @param {string} params.purchaser - Email del usuario comprador.
   */
  async createTicket({ amount, purchaser }) {
    const code = uuidv4();
    const purchaseDatetime = new Date();
    return ticketRepository.create({ code, purchaseDatetime, amount, purchaser });
  }
}

export default new TicketService();
