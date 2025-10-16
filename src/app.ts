import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import profileRoutes from './routes/profile.routes';
import postRoutes from './routes/post.routes';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();
setupSwagger(app);
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    message: '🚀 DevConnect API is running successfully!',
    version: '1.0.0',
    status: 'OK'
  });
});

app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

export default app;
