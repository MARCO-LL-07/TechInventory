import express from 'express';
import cors from 'cors';
import productosRoutes from './routes/productos.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/productos', productosRoutes);

export default app;