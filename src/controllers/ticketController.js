// src/controllers/ticketController.js

import ticketRepository from '../repositories/ticketRepository.js';

const getAll = async (_req, res) => {
    try {
        const tickets = await ticketRepository.getAll();
        res.json(tickets);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error al listar tickets' });
    }
};

const getById = async (req, res) => {
    try {
        const ticket = await ticketRepository.getById(req.params.tid);
        if (!ticket) return res.status(404).json({ status: 'error', error: 'Ticket no encontrado' });
        res.json(ticket);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error al obtener ticket' });
    }
};

export default {
    getAll,
    getById
};
