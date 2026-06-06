import 'express-async-errors';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes';
import ticketRoutes from './routes/ticket.routes';
import paymentRoutes from './routes/payment.routes';
import analyticsRoutes from './routes/analytics.routes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});

export default app;