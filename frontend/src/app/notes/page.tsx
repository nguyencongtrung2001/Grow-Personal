import React, { Suspense } from "react";
import NoteSidebar from "@/components/notes/NoteSidebar";
import NoteEditor from "@/components/notes/editor/NoteEditor";
import { Skeleton } from "@/components/ui/skeleton";

// Giả lập hàm gọi dữ liệu từ Database (Data Access Layer - DAL) bảo mật ở Server
async function getFoldersData() {
  // Trong thực tế, bạn sẽ query trực tiếp DB: return prisma.folder.findMany(...)
  // Đã cấu hình tối ưu song song và chạy hoàn toàn trên server
  return [
    { id: "ideas", emoji: "💡", name: "Ý tưởng sáng tạo", count: 12 },
    { id: "diary", emoji: "✍️", name: "Nhật ký hàng ngày", count: 4, isActive: true },
    { id: "books", emoji: "📚", name: "Tóm tắt sách", count: 7 },
    { id: "travel", emoji: "✈️", name: "Lịch trình du lịch", count: 2 },
  ];
}

// Metadata API chuẩn SEO được render trực tiếp tại Server
export const metadata = {
  title: "Ghi chú cá nhân | Grow Personal",
  description: "Hệ thống quản lý kiến thức và ghi chú tập trung tối ưu hiệu năng.",
};

export default async function NotesPage() {
  // Fetch data ngay tại Server Component cấp cao nhất
  const foldersPromise = getFoldersData();
  const folders = await foldersPromise;

  return (
    <div className="w-full max-w-[1440px] mx-auto flex gap-6 pt-6 px-4">
      {/* 1. Inner Sidebar - Nhận dữ liệu từ Server truyền xuống */}
      <Suspense fallback={<SidebarSkeleton />}>
        <NoteSidebar folders={folders} />
      </Suspense>

      {/* 2. Workspace xử lý văn bản tập trung */}
      <Suspense fallback={<EditorSkeleton />}>
        <NoteEditor />
      </Suspense>
    </div>
  );
}

// Loading Skeleton UI phục vụ cơ chế Streaming (Chống giật màn hình)
function SidebarSkeleton() {
  return <div className="w-64 shrink-0 hidden lg:flex flex-col gap-4"><Skeleton className="h-12 w-full rounded-xl" /><Skeleton className="h-48 w-full rounded-xl" /></div>;
}
function EditorSkeleton() {
  return <Skeleton className="grow max-w-4xl h-[800px] rounded-2xl" />;
}