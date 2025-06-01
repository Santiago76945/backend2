// src/controllers/sessionController.js

import UserDTO from '../dtos/userDTO.js';
import { generateToken } from '../utils/jwt.js';

const register = (req, res) => {
    try {
        const userDto = new UserDTO(req.user);
        res.status(201).json({ status: 'success', payload: userDto });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error en registro' });
    }
};

const login = (req, res) => {
    try {
        const token = generateToken(req.user);
        res.cookie('token', token, { httpOnly: true });
        res.json({ status: 'success', payload: { token } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error en login' });
    }
};

const current = (req, res) => {
    try {
        const userDto = new UserDTO(req.user);
        res.json({ status: 'success', payload: userDto });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error al obtener usuario' });
    }
};

const logout = (_req, res) => {
    try {
        res.clearCookie('token');
        res.json({ status: 'success', message: 'Logout exitoso' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', error: 'Error en logout' });
    }
};

export default {
    register,
    login,
    current,
    logout
};
