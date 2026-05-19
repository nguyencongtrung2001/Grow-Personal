// ============================================================
// Challenge Constants — Shared across Server & Client Components
// Tách riêng ra để dễ thêm/xóa/sửa mà không cần sửa component.
// ============================================================

export interface Mood {
  emoji: string;
  label: string;
}

/**
 * Danh sách tâm trạng (Moods) cho nhật ký hành trình.
 * Thêm/xóa tại đây, toàn bộ app sẽ tự cập nhật.
 */
export const MOODS: Mood[] = [
  { emoji: "🔥", label: "Cực sung" },
  { emoji: "🧘", label: "Bình ổn" },
  { emoji: "✨", label: "Hào hứng" },
  { emoji: "😴", label: "Mệt mỏi" },
  { emoji: "💤", label: "Uể oải" },
];
