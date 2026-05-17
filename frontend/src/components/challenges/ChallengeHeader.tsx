import React from "react";
import { Button } from "@/components/ui/button";
import { PlusSquare, XSquare } from "lucide-react";

interface ChallengeHeaderProps {
  onToggleForm: () => void;
  isFormOpen: boolean;
}

export default function ChallengeHeader({ onToggleForm, isFormOpen }: ChallengeHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white border border-[#F1E7E2] rounded-2xl relative overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-[#FF4500]/10 to-[#EF4444]/10 blur-2xl rounded-full pointer-events-none"></div>
      <div className="z-10">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-1">Challenge Yourself</h2>
        <p className="text-sm text-[#78716C]">
          Đập tan trì hoãn, thiết lập mục tiêu và theo dõi chuỗi ngày bứt phá giới hạn.
        </p>
      </div>

      <Button
        onClick={onToggleForm}
        className="z-10 mt-4 sm:mt-0 flex items-center gap-2 bg-linear-to-r from-[#FF4500] to-[#EF4444] text-white font-bold px-5 py-6 rounded-xl shadow-md shadow-[#FF4500]/20 hover:opacity-95 transition-all"
      >
        {isFormOpen ? (
          <>
            <XSquare className="w-5 h-5" />
            <span>Đóng bảng thiết lập</span>
          </>
        ) : (
          <>
            <PlusSquare className="w-5 h-5" />
            <span>Thêm nhiệm vụ thử thách</span>
          </>
        )}
      </Button>
    </div>
  );
}