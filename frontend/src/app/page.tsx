import { redirect } from "next/navigation";

export default function Home() {
  // Chuẩn Production: Tự động điều hướng người dùng từ trang chủ sang trang login ngay lập tức ở tầng Server
  redirect("/login");

  // Đoạn code Dashboard cũ tạm thời để bên dưới (hoặc bạn có thể move hẳn file Dashboard cũ này sang `src/app/dashboard/page.tsx`)
  return null;
}