import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

//ruta prueba
app.get('/api/ping', (req, res) => {
    res.json({ ok: true });
});

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

app.get('/api/alquileres', async (req, res) => {
    try {
        const alquileres = await prisma.alquiler.findMany();
        res.json(alquileres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/api/alquileres', async (req, res) => {
    const { titulo, precio, moneda, tipo, contacto, ambientes, metrosCuadrados, descripcion, zona, fotos } = req.body;

    try {
        const alquiler = await prisma.alquiler.create({
            data: { titulo, precio, moneda, tipo, contacto, ambientes, metrosCuadrados, descripcion, zona, fotos }
        });
        res.status(201).json(alquiler);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/alquileres/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const alquiler = await prisma.alquiler.findUnique({
            where: { id: parseInt(id) }
        });
        if (!alquiler) {
            return res.status(404).json({ error: 'Alquiler not found' });
        }
        res.json(alquiler);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/alquileres/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, precio, moneda, tipo, contacto, ambientes, metrosCuadrados, descripcion, zona, fotos } = req.body;

    try {
        const alquiler = await prisma.alquiler.update({
            where: { id: parseInt(id) },
            data: { titulo, precio, moneda, tipo, contacto, ambientes, metrosCuadrados, descripcion, zona, fotos }
        });
        res.json(alquiler);
    } catch (error) {
        if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Alquiler not found' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/alquileres/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const alquiler = await prisma.alquiler.delete({
            where: { id: parseInt(id) }
        });
        res.json(alquiler);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Alquiler not found' });
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});