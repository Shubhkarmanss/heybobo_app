import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import { PORT, MONGODB_URI, CLIENT_ORIGIN } from './src/config.js';
import authRoutes from './src/routes/auth.js';
import taskRoutes from './src/routes/tasks.js';

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('Heybobo API running'));
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

async function start() {
  await mongoose.connect(MONGODB_URI);
  app.listen(PORT, () => console.log(`API on :${PORT}`));
}

start();
