// src/seeder/seedProducts.js

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Product from '../models/Product.model.js';

const sampleProducts = [
    {
        title: 'Clavos de Hierro',
        description: 'Pack de 100 clavos de hierro galvanizado',
        price: 120,
        stock: 1,
        code: 'CLV001',
        category: 'Ferretería',
        thumbnail: 'https://example.com/img/clavos.jpg',
        status: true
    },
    {
        title: 'Martillo de Madera',
        description: 'Mango de madera resistente, cabeza de acero',
        price: 450,
        stock: 2,
        code: 'MTR002',
        category: 'Herramientas',
        thumbnail: 'https://example.com/img/martillo.jpg',
        status: true
    },
    {
        title: 'Destornillador Plano',
        description: 'Destornillador plano 6 mm de alta precisión',
        price: 80,
        stock: 5,
        code: 'DST003',
        category: 'Herramientas',
        thumbnail: 'https://example.com/img/destornillador.jpg',
        status: true
    },
    {
        title: 'Cinta Métrica 5m',
        description: 'Cinta métrica metálica de 5 metros con carcasa plástica',
        price: 200,
        stock: 3,
        code: 'CTM004',
        category: 'Medición',
        thumbnail: 'https://example.com/img/cinta.jpg',
        status: true
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('🔌 Conectado a MongoDB para el seeder');

        // Limpiamos la colección antes de insertar
        await Product.deleteMany({});
        console.log('🗑️  Colección de productos limpiada');

        // Insertamos los productos de ejemplo
        const inserted = await Product.insertMany(sampleProducts);
        console.log(`✅ Insertados ${inserted.length} productos de prueba`);

        process.exit(0);
    } catch (err) {
        console.error('❌ Error durante el seeder:', err);
        process.exit(1);
    }
};

seed();
