"use server";
import { revalidatePath } from "next/cache";

export async function saveNoteAction(prevState: unknown, formData: FormData) {
  // 1. Kiểm tra Authentication & Authorization an toàn từ Server-side Cookies
  // const session = await auth(); if (!session) throw new Error("Unauthorized");

  const title = formData.get("noteTitle");
  const content = formData.get("noteContent");
  
  // Use variables to prevent unused warnings during development
  void content;

  if (!title || String(title).trim() === "") {
    return { success: false, error: "Tiêu đề không được để trống!" };
  }

  try {
    // 2. Ghi trực tiếp vào Database thông qua Data Access Layer bảo mật
    // await prisma.note.create({ data: { title, content, userId: session.user.id } });

    // 3. Xóa cache và cập nhật lại giao diện ngay tức thì
    revalidatePath("/notes");
    return { success: true, error: null };
  } catch (err) {
    console.error("Failed to save note:", err);
    return { success: false, error: "Lỗi hệ thống khi lưu ghi chú." };
  }
}
