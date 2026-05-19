"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, ArrowLeft } from "lucide-react";

export default function ChallengeNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-2xl mx-auto px-4 py-12 text-center animate-in fade-in duration-500">
      {/* Decorative gradient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-linear-to-tr from-[#FF4500]/10 to-amber-500/10 blur-3xl rounded-full -z-10" />

      {/* Decorative Compass Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#FF4500]/10 rounded-full blur-md animate-pulse" />
        <div className="relative bg-white border border-[#FFF1EC] p-5 rounded-full shadow-lg shadow-[#FF4500]/5 flex items-center justify-center animate-bounce duration-1000">
          <Compass className="w-12 h-12 text-[#FF4500]" />
        </div>
      </div>

      {/* 404 Header */}
      <div className="text-xs font-black tracking-widest text-[#FF4500] uppercase mb-2">
        Mã lỗi 404 • Không tìm thấy
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight mb-3">
        Không tồn tại thử thách này
      </h2>
      <p className="text-sm sm:text-base text-[#78716C] max-w-md mb-8 leading-relaxed">
        Thử thách bạn đang tìm kiếm có thể đã kết thúc, bị xóa hoặc đường dẫn URL bị thay đổi. Hãy cùng bắt đầu một hành trình rèn luyện mới!
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <Button 
          asChild
          className="w-full sm:w-auto bg-linear-to-r from-[#FF4500] to-[#EF4444] text-white font-bold text-sm h-11 px-6 rounded-xl shadow-md shadow-[#FF4500]/10 hover:opacity-95 transition-all gap-2"
        >
          <Link href="/challenges">
            <Compass className="w-4 h-4" />
            <span>Khám phá thử thách khác</span>
          </Link>
        </Button>
        <Button 
          asChild 
          variant="outline"
          className="w-full sm:w-auto border-[#F1E7E2] hover:bg-slate-50 text-[#78716C] hover:text-[#1E293B] font-bold text-sm h-11 px-6 rounded-xl transition-all gap-2"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
