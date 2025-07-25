import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import { sessionMiddleware } from './middleware/session.middleware.js';
import { errorHandler } from './middleware/errorHandler.js';

import courseRoutes from './routes/course.route.js';
import unitRoutes from './routes/unit.route.js';
import subunitRoutes from './routes/subunit.route.js';
import lessonRoutes from './routes/lesson.route.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import categoryRoutes from './routes/category.route.js';
import uploadRoutes from './routes/upload.route.js';
import stripeRoutes from './routes/stripe.route.js';
import cartRoutes from './routes/cart.route.js';

import stripeWebhook from './stripe/webhook.js';

dotenv.config();

const app = express();

app.use(helmet());

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: {
//         status: 'error',
//         message: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti.',
//     },
// });
// app.use(limiter);


app.use('/api/payment/webhook', stripeWebhook);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());
app.use(morgan('dev'));

app.use(cookieParser());
app.use(sessionMiddleware);

app.use('/uploads', express.static('uploads'));
app.use('/api/upload', uploadRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/subunits', subunitRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/payment', stripeRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
    res.send(`<div style="text-align: center;">
        <h1> Global Classroom Backend </h1>
        <p> Running on port ${process.env.PORT || 4000} </p>
    </div>`);
});
app.get('/api/success', (req, res) => {
    res.send(`<div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
        <div style="text-align: center;">
            <h2 style="color: #34c759;">Success Page</h2>
            <p style="font-size: 1.2rem; margin-bottom: 1.5rem;">Everything is working as expected.</p>
            <a href="/" style="background-color: #34c759; color: white; border-radius: 5px; padding: 1rem 2rem; text-decoration: none;">Go back to homepage</a>
        </div>
    </div>`);
});

app.get('/api/cancel', (req, res) => {
    res.status(500).send(`<div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
        <div style="text-align: center;">
            <h2 style="color: #ff0000;">Failed Page</h2>
            <p style="font-size: 1.2rem; margin-bottom: 1.5rem;">There seems to be an issue. Please try again later.</p>
            <a href="/" style="background-color: #ff0000; color: white; border-radius: 5px; padding: 1rem 2rem; text-decoration: none;">Go back to homepage</a>
        </div>
    </div>`);
});

app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
