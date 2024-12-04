import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import listingRouter from './routes/listing.route.js';
import reportRouter from './routes/report.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url'; // Added to handle __dirname

dotenv.config();

// Handle __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect application to MongoDB Database
mongoose.connect(process.env.MONGO_CONN).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();

// Allow JSON as input to the server otherwise it will get undefined
app.use(express.json());

// Initialize CookieParser
app.use(cookieParser());

const port = 3000;

app.listen(port, () => {
    console.log('Server is running on port', port);
});

// Call at 3000/api/user
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/report', reportRouter);

// Serve static files
app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Middleware
app.use((err, req, res, next) => {
    // 500 for Internal Server Error
    const statusCode = err.statusCode || 500;

    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
