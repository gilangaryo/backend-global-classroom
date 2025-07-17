import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import courseRoutes from './routes/course.route.js';
import unitRoutes from './routes/unit.route.js';
import subunitRoutes from './routes/subunit.route.js';
import lessonRoutes from './routes/lesson.route.js';

import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Register routes
app.use('/api/courses', courseRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/subunits', subunitRoutes);
app.use('/api/lessons', lessonRoutes);

app.get('/', (req, res) => {
    res.send('🚀 Global Classroom Backend is Running!');
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
