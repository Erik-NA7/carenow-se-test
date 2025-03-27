import express from 'express';
import cors from 'cors';
import { router as apiRouter } from './routes/api';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'))

// Middleware
app.use(cors({
  origin: 'http://localhost:5173' // Your Vite frontend URL
}));

app.use(express.json());

// Routes
app.use('/api', apiRouter);

// Health check
app.get('/ping', (_req, res) => {
  res.send('pong');
});

export { app };