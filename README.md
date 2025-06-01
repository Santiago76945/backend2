<!-- Backend 2 - Proyecto Final -- README: -->

---

```markdown
# Backend 2 – Proyecto Final

Este proyecto implementa una API RESTful completa con autenticación, autorización por roles, lógica de carritos de compras y generación de tickets de compra. Usa arquitectura con DAO, DTO y Repositories, y persiste datos en MongoDB Atlas.

---

## 🚀 Tecnologías

- **Node.js**  
- **Express**  
- **MongoDB Atlas** + **Mongoose**  
- **JWT** (JSON Web Tokens)  
- **Passport.js**  
- **ES Modules**  
- **Nodemon** (dev)

---

## 📁 Estructura principal

```

src/
├── config/              # Configuración de Passport
├── dao/                 # Acceso a datos (DAOs)
├── dtos/                # Data Transfer Objects
├── models/              # Modelos de Mongoose
├── repositories/        # Repository Pattern
├── routes/              # Rutas Express
├── services/            # Lógica de negocio (Tickets)
├── utils/               # Helpers: JWT y hash
├── middlewares/         # Auth y autorización por rol
└── index.js             # Punto de entrada principal

````

---

## ⚙️ Instalación

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/Santiago76945/backend2.git
   cd backend2
````

2. Instalá las dependencias:

   ```bash
   npm install
   ```

3. Usá el archivo `.env.example` como base:

   ```bash
   cp .env.example .env
   ```

4. Ejecutá el servidor:

   ```bash
   npm run dev
   ```

---

## 🌐 Endpoints principales

### 🔐 Autenticación (`/api/sessions`)

* `POST /register` – Registro de usuario
* `POST /login` – Login con JWT
* `GET /current` – Sesión activa
* `GET /logout` – Cierre de sesión

### 🛒 Carritos (`/api/carts`)

* `POST /` – Crear carrito
* `POST /:cid/product/:pid` – Agregar producto
* `GET /:cid` – Ver carrito
* `PUT /:cid` – Reemplazar contenido
* `DELETE /:cid/product/:pid` – Eliminar producto
* `POST /:cid/purchase` – Comprar y generar ticket

### 📦 Productos (`/api/products`)

* `POST /` – Crear producto (admin)
* `GET /` – Listar productos
* `GET /:pid` – Obtener producto
* `PUT /:pid` – Modificar producto (admin)
* `DELETE /:pid` – Eliminar producto (admin)

### 🎫 Tickets (`/api/tickets`)

* `GET /` – Listar tickets (admin)
* `GET /:tid` – Ver ticket por ID (admin)

---

## ✅ Consideraciones

* Ya está configurado para funcionar con **MongoDB Atlas remoto**.
* El acceso está habilitado desde cualquier IP (`0.0.0.0/0`).
* No necesitás modificar el `.env` para probarlo, viene listo para ejecutar.
* Autenticación vía **JWT en cookies**, middleware de roles y persistencia robusta.

---

