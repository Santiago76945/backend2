// src/controllers/productController.js

import productRepository from '../repositories/productRepository.js';

const getAll = async (_req, res) => {
    try {
        const products = await productRepository.getAll();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error al listar productos' });
    }
};

const getById = async (req, res) => {
    try {
        const product = await productRepository.getById(req.params.pid);
        if (!product) return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error al obtener producto' });
    }
};

const create = async (req, res) => {
    try {
        const newProd = await productRepository.create(req.body);
        res.status(201).json(newProd);
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: 'error', error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const updated = await productRepository.update(req.params.pid, req.body);
        if (!updated) return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: 'error', error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const deleted = await productRepository.delete(req.params.pid);
        if (!deleted) return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
        res.json({ status: 'success', message: 'Producto eliminado' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error al eliminar producto' });
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};
