"use server";
// ============================================================
// Challenge Server Actions
// ✅ "use server" directive: code này KHÔNG bao giờ gửi xuống client.
// ✅ Validation xảy ra server-side TRƯỚC khi chạm vào DB/API.
// ✅ Dùng revalidateTag để invalidate cache sau khi mutation.
// ============================================================

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ActionResult } from "@/types/challenge";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

// ─────────────────────────────────────────────
// ACTION 1: Tạo Challenge mới
// Được gắn vào <form action={createChallenge}> trong ChallengeForm
// ─────────────────────────────────────────────
export async function createChallenge(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // 1. Parse & validate input SERVER-SIDE
  const title = formData.get("title")?.toString().trim() ?? "";
  const totalDaysRaw = formData.get("totalDays")?.toString() ?? "";
  const totalDays = parseInt(totalDaysRaw, 10);

  const fieldErrors: Record<string, string[]> = {};

  if (!title || title.length < 5) {
    fieldErrors.title = ["Tên thử thách phải có ít nhất 5 ký tự."];
  }
  if (title.length > 100) {
    fieldErrors.title = [...(fieldErrors.title ?? []), "Tên không được vượt quá 100 ký tự."];
  }
  if (isNaN(totalDays) || totalDays < 1 || totalDays > 365) {
    fieldErrors.totalDays = ["Số ngày phải từ 1 đến 365."];
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  // 2. Gọi API backend
  try {
    const res = await fetch(`${API_BASE}/api/challenges`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, totalDays }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { success: false, error: body?.message ?? "Lỗi hệ thống. Vui lòng thử lại." };
    }

    // 3. Invalidate cache để danh sách challenges được refresh
    revalidateTag("challenges", { expire: 0 });

    return { success: true };
  } catch {
    return { success: false, error: "Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối mạng." };
  }
}

// ─────────────────────────────────────────────
// ACTION 2: Nộp nhật ký hành trình (Journey Log)
// Được gắn vào <form action={submitJourneyLog}> trong JourneyWorkspace
// ─────────────────────────────────────────────
export async function submitJourneyLog(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const challengeSlug = formData.get("challengeSlug")?.toString() ?? "";
  const note = formData.get("note")?.toString().trim() ?? "";
  const mood = formData.get("mood")?.toString().trim() ?? "";

  const fieldErrors: Record<string, string[]> = {};

  if (!challengeSlug) {
    return { success: false, error: "Challenge không hợp lệ." };
  }
  if (!note || note.length < 10) {
    fieldErrors.note = ["Nhật ký phải có ít nhất 10 ký tự."];
  }
  if (note.length > 2000) {
    fieldErrors.note = ["Nhật ký không được vượt quá 2000 ký tự."];
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  try {
    const res = await fetch(`${API_BASE}/api/challenges/${challengeSlug}/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note, mood }),
    });

    if (!res.ok) {
      return { success: false, error: "Không thể lưu nhật ký. Vui lòng thử lại." };
    }

    // Invalidate cache của challenge cụ thể đó
    revalidateTag(`challenge-${challengeSlug}`, { expire: 0 });
    revalidateTag(`challenge-${challengeSlug}-logs`, { expire: 0 });

    return { success: true };
  } catch {
    return { success: false, error: "Không thể kết nối máy chủ." };
  }
}

// ─────────────────────────────────────────────
// ACTION 3: Xóa Challenge (kèm redirect)
// ─────────────────────────────────────────────
export async function deleteChallenge(challengeSlug: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/challenges/${challengeSlug}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Xóa thất bại");

  revalidateTag("challenges", { expire: 0 });
  redirect("/challenges");
}
