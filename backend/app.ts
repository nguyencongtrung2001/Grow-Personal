import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app: Express = express();

// 1. Security & Utility Middlewares
app.use(helmet()); // Bảo mật HTTP headers
app.use(cors()); // Cấu hình Cross-Origin
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Log request

// 2. Định tuyến (Routes)
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'success', message: 'Hệ thống hoạt động tốt.' });
});

// Chỗ này sau này sẽ import các route chính
// app.use('/api/v1/challenges', challengeRoutes);

// 3. Global Error Handler (Bắt buộc phải có ở cuối cùng)
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