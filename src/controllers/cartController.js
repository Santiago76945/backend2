// src/controllers/cartController.js

import cartRepository from '../repositories/cartRepository.js';
import ticketService from '../services/ticketService.js';

const createCart = async (req, res) => {
    try {
        const cart = await cartRepository.create();
        res.status(201).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error al crear carrito' });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await cartRepository.getById(req.params.cid);
        if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error al obtener carrito' });
    }
};

const addProduct = async (req, res) => {
    try {
        const updatedCart = await cartRepository.addProduct(
            req.params.cid,
            req.params.pid,
            req.body.quantity || 1
        );
        res.json(updatedCart);
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: 'error', error: err.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        const cart = await cartRepository.removeProduct(req.params.cid, req.params.pid);
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: 'error', error: err.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const cart = await cartRepository.clear(req.params.cid);
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error al vaciar carrito' });
    }
};

const updateCart = async (req, res) => {
    try {
        const { products } = req.body;
        const updatedCart = await cartRepository.update(req.params.cid, products);
        res.json(updatedCart);
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: 'error', error: err.message });
    }
};

const purchase = async (req, res) => {
    try {
        const { failedProductIds, totalAmount } = await cartRepository.purchase(req.params.cid);
        const ticket = await ticketService.createTicket({
            amount: totalAmount,
            purchaser: req.user.email
        });
        res.json({ ticket, failedProductIds });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error al procesar compra' });
    }
};

export default {
    createCart,
    getCart,
    addProduct,
    removeProduct,
    clearCart,
    updateCart,
    purchase
};
