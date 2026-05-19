// ============================================================
// /challenges/[slug] — Chi tiết thử thách
// ✅ Async RSC — đọc params.slug, không có "use client"
// ✅ generateMetadata — dynamic SEO title/description từ data
// ✅ generateStaticParams — prerender tất cả slugs lúc build
// ✅ Promise.all — fetch song song challenge + logs (loại bỏ waterfall)
// ✅ notFound() — kích hoạt not-found.tsx nếu slug không tồn tại
// ✅ Suspense boundaries — stream từng section độc lập
// ============================================================

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getChallengeBySlug, getChallengeHistoryLogs, getAllChallengeSlugs } from "@/lib/challenges/data";
import ChallengeHeaderBanner from "@/components/challenges/ChallengeHeaderBanner";
import ChallengeDashboardView from "@/components/challenges/ChallengeDashboardView";
import { ChallengeDashboardSkeleton } from "@/components/challenges/ChallengeSkeletons";
// ── Kiểu dữ liệu params từ Next.js App Router ─────────────
interface PageProps {
  params: Promise<{ slug: string }>;
}

// ── Static Params: Prerender tại build time ────────────────
// Next.js sẽ gọi hàm này khi build, tạo ra các trang tĩnh cho mỗi slug
// → LCP cực nhanh vì HTML đã có sẵn, không cần SSR mỗi request
export async function generateStaticParams() {
  const slugs = await getAllChallengeSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ── Dynamic SEO Metadata ────────────────────────────────────
// Fetch data 1 lần, dùng để tạo title/description chuẩn SEO
// Next.js tự dedup fetch này với fetch trong page component (cùng URL + cache key)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const challenge = await getChallengeBySlug(slug);

  if (!challenge) {
    return { title: "Không tìm thấy thử thách | Grow Personal" };
  }

  return {
    title: `${challenge.title} | Grow Personal`,
    description: `Theo dõi tiến độ thử thách "${challenge.title}" — Ngày ${challenge.completedDaysCount}/${challenge.totalDays}, Streak ${challenge.streak} ngày.`,
    openGraph: {
      title: challenge.title,
      description: `Streak ${challenge.streak} ngày • Tiến độ ${challenge.progress}%`,
      type: "article",
    },
  };
}

// ── Section components (async RSC, stream riêng) ─────────────

// Phần header banner fetch challenge data
async function ChallengeHeaderSection({ slug }: { slug: string }) {
  const challenge = await getChallengeBySlug(slug);
  if (!challenge) notFound(); // Kích hoạt not-found.tsx

  return <ChallengeHeaderBanner challenge={challenge} />;
}

// Phần dashboard fetch song song challenge + logs
async function ChallengeDashboardSection({ slug }: { slug: string }) {
  // 🟢 PARALLEL FETCH — loại bỏ waterfall: không await tuần tự
  // Tổng thời gian = max(T_challenge, T_logs) thay vì T_challenge + T_logs
  const [challenge, logs] = await Promise.all([
    getChallengeBySlug(slug),
    getChallengeHistoryLogs(slug),
  ]);

  if (!challenge) notFound();

  return (
    <ChallengeDashboardView
      challengeId={challenge.id}
      challengeSlug={slug}
      startDate={challenge.startDate}
      efficiencyRate={challenge.progress}
      totalDays={challenge.totalDays}
      completedDaysCount={challenge.completedDaysCount}
      logs={logs}
    />
  );
}

// ── Page Component ─────────────────────────────────────────
export default async function ChallengeDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto px-2 sm:px-4 py-4 animate-in fade-in duration-300">

      {/* Banner tổng quan: stream ngay khi challenge data sẵn sàng */}
      <Suspense fallback={
        <div className="h-[140px] bg-white border border-[#F1E7E2] rounded-2xl animate-pulse" />
      }>
        <ChallengeHeaderSection slug={slug} />
      </Suspense>

      {/* Dashboard + History: stream khi cả challenge lẫn logs sẵn sàng */}
      <Suspense fallback={<ChallengeDashboardSkeleton />}>
        <ChallengeDashboardSection slug={slug} />
      </Suspense>
    </div>
  );
}