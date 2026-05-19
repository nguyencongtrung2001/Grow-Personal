// ============================================================
// Challenge Data Access Layer — Server-side ONLY
// ⚠️  File này KHÔNG BAO GIỜ được import từ Client Component.
//     Gọi thẳng API/DB, KHÔNG đi qua /api/* Route Handler.
//     Đây là chuẩn Next.js để tránh "Internal API from Server Component" anti-pattern.
//
// 📌 FALLBACK: Khi backend chưa khả dụng, trả về mock data
//    để frontend có thể phát triển UI song song với backend.
//    Xóa mock khi backend production sẵn sàng.
// ============================================================

import { Challenge, HistoryLog } from "@/types/challenge";

// Địa chỉ API backend (server-to-server, không bị CORS giới hạn)
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

// ─── MOCK DATA (xóa khi backend production sẵn sàng) ────────
const MOCK_CHALLENGES: Challenge[] = [
  {
    id: "challenge-001",
    slug: "30-ngay-lam-chu-tu-vung-tieng-anh",
    title: "30 Ngày Làm Chủ Từ Vựng Tiếng Anh",
    description: "Mỗi ngày học 30 từ vựng mới, luyện phản xạ nói và viết.",
    category: "Ngôn ngữ",
    status: "active",
    totalDays: 30,
    completedDaysCount: 23,
    streak: 23,
    progress: 76,
    startDate: "2026-04-27",
    estimatedEndDate: "2026-05-27",
  },
  {
    id: "challenge-002",
    slug: "21-ngay-thien-dinh-sang-tao",
    title: "21 Ngày Thiền Định Sáng Tạo",
    description: "Thiền 15 phút mỗi sáng để nâng cao khả năng tập trung.",
    category: "Sức khỏe",
    status: "active",
    totalDays: 21,
    completedDaysCount: 14,
    streak: 14,
    progress: 67,
    startDate: "2026-05-05",
    estimatedEndDate: "2026-05-26",
  },
];

const MOCK_LOGS: HistoryLog[] = [
  {
    id: "log-001",
    day: 23,
    date: "19/05/2026",
    mood: "🔥 Cực sung",
    note: "Hôm nay hoàn thành xuất sắc 30 từ vựng chuyên ngành AI & Machine Learning. Đã quay lại video thực hành nói phản xạ (Shadowing) 5 phút không vấp.",
    media: [
      { type: "video", url: "#", name: "Reflex_Speaking_Day23.mp4" },
      { type: "image", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" },
    ],
  },
  {
    id: "log-002",
    day: 22,
    date: "18/05/2026",
    mood: "🧘 Bình ổn",
    note: "Học cụm từ chủ đề Phrasal Verbs thông dụng trong IELTS Writing Task 2. Ghi chép cẩn thận vào sổ tay cá nhân.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80" },
      { type: "image", url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80" },
    ],
  },
  {
    id: "log-003",
    day: 21,
    date: "17/05/2026",
    mood: "😴 Mệt mỏi",
    note: "Ngày làm việc khá căng thẳng tại công ty nhưng vẫn cố gắng dành ra 15 phút ôn tập Flashcard trên hệ thống trước khi đi ngủ. Quyết tâm không ngắt chuỗi!",
    media: [],
  },
];

// ─── API Helper ──────────────────────────────────────────────
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = new Error(`API Error ${res.status}: ${path}`);
    (error as NodeJS.ErrnoException).code = String(res.status);
    throw error;
  }

  return res.json() as Promise<T>;
}

// ─────────────────────────────────────────────
// 1. Lấy danh sách tất cả challenges của user
// Fallback: trả mock data khi API chưa khả dụng
// ─────────────────────────────────────────────
export async function getChallenges(): Promise<Challenge[]> {
  try {
    return await apiFetch<Challenge[]>("/api/challenges", {
      next: { revalidate: 60, tags: ["challenges"] },
    });
  } catch {
    console.warn("[getChallenges] API unavailable — using mock data");
    return MOCK_CHALLENGES;
  }
}

// ─────────────────────────────────────────────
// 2. Lấy chi tiết 1 challenge theo slug
// Fallback: tìm trong mock data theo slug
// ─────────────────────────────────────────────
export async function getChallengeBySlug(slug: string): Promise<Challenge | null> {
  try {
    return await apiFetch<Challenge>(`/api/challenges/${slug}`, {
      next: { revalidate: 30, tags: [`challenge-${slug}`] },
    });
  } catch {
    console.warn(`[getChallengeBySlug] API unavailable — using mock for "${slug}"`);
    return MOCK_CHALLENGES.find((c) => c.slug === slug) ?? null;
  }
}

// ─────────────────────────────────────────────
// 3. Lấy lịch sử logs của 1 challenge
// Fallback: trả mock logs
// ─────────────────────────────────────────────
export async function getChallengeHistoryLogs(slug: string): Promise<HistoryLog[]> {
  try {
    return await apiFetch<HistoryLog[]>(`/api/challenges/${slug}/logs`, {
      next: { revalidate: 30, tags: [`challenge-${slug}-logs`] },
    });
  } catch {
    console.warn(`[getChallengeHistoryLogs] API unavailable — using mock logs`);
    return MOCK_LOGS;
  }
}

// ─────────────────────────────────────────────
// 4. Lấy danh sách slugs để generateStaticParams (build-time)
// Fallback: trả slugs từ mock
// ─────────────────────────────────────────────
export async function getAllChallengeSlugs(): Promise<string[]> {
  try {
    const challenges = await apiFetch<Challenge[]>("/api/challenges", {
      cache: "force-cache",
    });
    return challenges.map((c) => c.slug);
  } catch {
    console.warn("[getAllChallengeSlugs] API unavailable — using mock slugs");
    return MOCK_CHALLENGES.map((c) => c.slug);
  }
}
