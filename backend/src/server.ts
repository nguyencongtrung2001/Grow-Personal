import app from './app.js';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config'; // Thêm dòng này để đảm bảo file lấy được biến từ .env

const PORT = process.env.PORT || 8000;

// Khởi tạo PrismaClient theo chuẩn Prisma 7
export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Database PostgresSQL connected successfully.');

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
};

process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer();