import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

app.use(authRoutes);
app.use(notesRoutes);

// Middleware 404 (після всіх маршрутів)
app.use(notFoundHandler);

app.use(errors());

// Middleware для обробки помилок (останнє)
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
