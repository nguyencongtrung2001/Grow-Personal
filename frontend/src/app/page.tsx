import React from "react";
import GreetingBanner from "@/components/dashboard/GreetingBanner";
import TaskMatrix from "@/components/dashboard/TaskMatrix";
import VocabEngine from "@/components/dashboard/VocabEngine";
import FinancePots from "@/components/dashboard/FinancePots";
import ChallengeTracker from "@/components/dashboard/ChallengeTracker";

export default function Home() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Banner chào mừng */}
      <GreetingBanner />
      
      {/* Grid Dashboard chính */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hũ tài chính (7 cols) + Không gian từ vựng (5 cols) */}
        <FinancePots />
        <VocabEngine />
        
        {/* Thử thách bản thân (7 cols) + Nhiệm vụ trọng tâm (5 cols) */}
        <ChallengeTracker />
        <TaskMatrix />
      </div>
    </div>
  );
}
