// Thêm chữ "type" vào các interface của Express
import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app: Express = express();

// 1. Security & Utility Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// 2. Định tuyến (Routes)
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'success', message: 'Hệ thống hoạt động tốt.' });
});

// 3. Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('🔥 Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Lỗi máy chủ nội bộ (Internal Server Error)';

    res.status(statusCode).json({
        status: 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});

export default app;