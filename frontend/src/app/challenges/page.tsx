// ============================================================
// /challenges — Danh sách thử thách
// ✅ Async React Server Component — không có "use client"
// ✅ Data được fetch server-side, trước khi HTML gửi về browser
// ✅ Suspense boundary bọc phần data-dependent để streaming
// ✅ Static metadata cho SEO
// ============================================================

import { Suspense } from "react";
import { Metadata } from "next";
import { getChallenges } from "@/lib/challenges/data";
import { ChallengesListSkeleton } from "@/components/challenges/ChallengeSkeletons";
import ChallengeListClient from "@/components/challenges/ChallengeListClient";

// ── SEO Metadata ──────────────────────────────────────────
export const metadata: Metadata = {
  title: "Thử Thách | Grow Personal",
  description:
    "Khởi tạo và theo dõi các thử thách cá nhân hàng ngày. Duy trì chuỗi kỷ luật và đập tan trì hoãn với Grow Personal.",
  openGraph: {
    title: "Thử Thách | Grow Personal",
    description: "Theo dõi chuỗi kỷ luật hàng ngày của bạn.",
    type: "website",
  },
};

// ── Server Data Loader (tách ra async function để dễ Suspense) ──
async function ChallengeListSection() {
  // 🟢 Fetch thẳng từ server — KHÔNG qua /api/* Route Handler
  // Cache: revalidate 60s, tag "challenges"
  const challenges = await getChallenges();

  return <ChallengeListClient challenges={challenges} />;
}

// ── Page Component (RSC) ───────────────────────────────────
export default function ChallengesPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto px-4 py-6">
      {/*
        Suspense boundary:
        - Trong lúc data fetch, Next.js stream skeleton xuống browser ngay lập tức
        - Khi data ready, swap skeleton → real content
        - Không block toàn bộ page như "use client" + useEffect
      */}
      <Suspense fallback={<ChallengesListSkeleton />}>
        <ChallengeListSection />
      </Suspense>
    </div>
  );
}