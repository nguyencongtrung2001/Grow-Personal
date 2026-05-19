"use client";
// ============================================================
// ChallengeListClient — Client Shell tối giản
// ✅ "use client" CHỈ ở đây vì cần useState để toggle form
// ✅ Nhận challenges props từ Server Component (page.tsx)
// ✅ ChallengeHeader và ChallengeCard là RSC — không bị kéo vào client bundle
// ============================================================

import { useState } from "react";
import ChallengeHeader from "@/components/challenges/ChallengeHeader";
import ChallengeForm from "@/components/challenges/ChallengeForm";
import ChallengeCard from "@/components/challenges/ChallengeCard";
import { Challenge } from "@/types/challenge";

interface ChallengeListClientProps {
  challenges: Challenge[];
}

export default function ChallengeListClient({ challenges }: ChallengeListClientProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* Header với toggle button — phần duy nhất cần client interactivity */}
      <ChallengeHeader
        onToggleForm={() => setShowForm((prev) => !prev)}
        isFormOpen={showForm}
      />

      {/* Form tạo mới: chỉ mount khi cần, animate vào/ra */}
      {showForm && <ChallengeForm onClose={() => setShowForm(false)} />}

      {/* Danh sách challenges từ server */}
      <section className="space-y-8" aria-label="Danh sách thử thách">
        {challenges.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            Bạn chưa có thử thách nào. Hãy tạo thử thách đầu tiên!
          </div>
        ) : (
          challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))
        )}
      </section>
    </>
  );
}
