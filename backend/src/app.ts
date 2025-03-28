import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router as visitRouter } from './routes/visit';

const app = express();

app.use(morgan('dev'));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173' // Your Vite frontend URL
}));

app.use(express.json());

// Routes
app.use('/api/visit', visitRouter);

export { app };