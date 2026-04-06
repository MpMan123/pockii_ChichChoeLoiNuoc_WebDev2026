import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import http from 'http';
import cors from 'cors';
import { testDatabaseConnection } from './config/supabase.js';

// env
import { NODE_ENV, PORT, FRONTEND_URL } from './config/env.js';

// Router
import authRouter from './routes/auth.routes.js';
import budgetRouter from './routes/budget.routes.js';
import debtRouter from './routes/debt.routes.js';
import transactionRouter from './routes/transaction.routes.js';
import userRouter from './routes/user.routes.js';

// Middleware
// import errorMiddleware from './middleware/error.middleware.js';

const app = express();
const httpServer = http.createServer(app);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/budget', budgetRouter);
app.use('/api/debt', debtRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/user', userRouter);

// app.use(errorMiddleware);

// Connect to frontend
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

// Root endpoint
app.get('/', (req, res, next) => {
    res.json({
        success: true,
        message: 'Welcome to the Pockii API',
        version: '1.0.0',
        documentation: '/api-docs',
        endpoints: {
            auth: '/api/auth',
            budget: '/api/budget',
            debt: '/api/debt',
            transaction: '/api/transaction',
            user: '/api/user'
        }
    })
});

// StartServer
const startServer = async () => {
    try {
        // Test database connection
        const isDatabaseConnected = await testDatabaseConnection();
        if (!isDatabaseConnected) {
            console.error('❌❌❌ Database connection failed. Server cannot start.');
            return;
        }

        httpServer.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`🌐 API Documentation: http://localhost:${PORT}/api-docs`);
            console.log(`📝 Environment: ${NODE_ENV || 'development'}`);
            console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
        })
    } catch (error) {
        console.error("❌❌❌ Cannot start server", error);
        process.exit(1);
    }
}

startServer();

export default app;
