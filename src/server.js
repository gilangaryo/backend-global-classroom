import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import courseRoutes from './routes/course.route.js';
import unitRoutes from './routes/unit.route.js';
import subunitRoutes from './routes/subunit.route.js';
import lessonRoutes from './routes/lesson.route.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import categoryRoutes from './routes/category.route.js';

import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 'error',
        message: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti.',
    },
});
app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/subunits', subunitRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/categories', categoryRoutes);

// Root route
app.get('/', (req, res) => {
    res.send(`
        <div style="text-align: center;">
            <h1> Global Classroom Backend </h1>
            <p> Running on port ${process.env.PORT || 4000} </p>
        </div>
    `);
});

// Error handler di akhir
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
