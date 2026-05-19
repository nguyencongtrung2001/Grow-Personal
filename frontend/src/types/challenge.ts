// ============================================================
// Challenge Domain — Centralized Type Definitions
// Tất cả interfaces cho challenges feature được định nghĩa ở đây.
// Server Components, Client Components và Server Actions đều import từ file này.
// ============================================================

export type ChallengeStatus = "active" | "completed" | "paused";

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category: string;
  status: ChallengeStatus;
  totalDays: number;
  completedDaysCount: number;
  streak: number;
  progress: number; // 0-100
  startDate: string; // ISO string
  estimatedEndDate: string; // ISO string
}

export type MediaType = "image" | "video";

export interface MediaFile {
  type: MediaType;
  url: string;
  name?: string;
}

export interface HistoryLog {
  id: string;
  day: number;
  date: string; // dd/MM/yyyy
  mood: string;
  note: string;
  media: MediaFile[];
}

// Dùng cho Server Actions — dữ liệu trả về
export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

// Dùng cho generateStaticParams
export interface ChallengeSlugParam {
  slug: string;
}
