import app from './app';
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 8000;
export const prisma = new PrismaClient();

const startServer = async () => {
    try {
        // Đảm bảo Database kết nối thành công trước khi mở port
        await prisma.$connect();
        console.log('✅ Database PostgresSQL connected successfully.');

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        await prisma.$disconnect();
        process.exit(1); // Dừng app nếu không kết nối được DB
    }
};

// Xử lý các lỗi Promise không được catch (Ngăn crash server đột ngột)
process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
    // Thực hiện ghi log ra file hoặc sentry ở đây
});

startServer();