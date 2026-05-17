"use client";
import React, { useState } from "react";
import ChallengeHeader from "@/components/challenges/ChallengeHeader";
import ChallengeForm from "@/components/challenges/ChallengeForm";
import ChallengeCard from "@/components/challenges/ChallengeCard";

export default function ChallengesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto">
      {/* Header trang chủ nhiệm vụ */}
      <ChallengeHeader onToggleForm={() => setShowForm(!showForm)} isFormOpen={showForm} />

      {/* Form tạo mới thử thách có thể đóng/mở linh hoạt */}
      {showForm && <ChallengeForm onClose={() => setShowForm(false)} />}

      {/* Danh sách các thử thách đang thực thi */}
      <section className="space-y-8">
        <ChallengeCard />
      </section>
    </div>
  );
}