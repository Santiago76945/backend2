// src/dtos/userDTO.js

export default class UserDTO {
    /**
     * @param {Object} user - Objeto user obtenido de la DB o de req.user
     * @param {string} user.first_name
     * @param {string} user.last_name
     * @param {string} user.email
     * @param {string} user.role
     */
    constructor({ first_name, last_name, email, role }) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.role = role;
    }
}
