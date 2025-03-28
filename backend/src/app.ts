import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router as visitRouter } from './routes/visit';

const app = express();

// Development logger
app.use(morgan('dev'));

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Vite frontend URL
}));

app.use(express.json());

// Routes
app.use('/api/visit', visitRouter);

export { app };