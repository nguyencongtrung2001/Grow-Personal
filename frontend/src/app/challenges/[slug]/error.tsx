"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Home, ChevronRight } from "lucide-react";

export default function ChallengeDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Challenge Detail Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-2xl mx-auto px-4 py-12 text-center animate-in fade-in duration-500">
      {/* Decorative gradient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-linear-to-tr from-[#FF4500]/10 to-amber-500/10 blur-3xl rounded-full -z-10" />

      {/* Error Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#FF4500]/10 rounded-full blur-md animate-pulse" />
        <div className="relative bg-white border border-[#FFF1EC] p-5 rounded-full shadow-lg shadow-[#FF4500]/5 flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-[#FF4500]" />
        </div>
      </div>

      {/* Error Message */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight mb-3">
        Đã xảy ra sự cố kết nối
      </h2>
      <p className="text-sm sm:text-base text-[#78716C] max-w-md mb-8 leading-relaxed">
        Không thể tải thông tin chi tiết thử thách vào lúc này. Vui lòng kiểm tra lại kết nối mạng của bạn hoặc thử tải lại trang.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mb-8">
        <Button 
          onClick={reset}
          className="w-full sm:w-auto bg-linear-to-r from-[#FF4500] to-[#EF4444] text-white font-bold text-sm h-11 px-6 rounded-xl shadow-md shadow-[#FF4500]/10 hover:opacity-95 transition-all gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Tải lại dữ liệu</span>
        </Button>
        <Button 
          asChild 
          variant="outline"
          className="w-full sm:w-auto border-[#F1E7E2] hover:bg-slate-50 text-[#78716C] hover:text-[#1E293B] font-bold text-sm h-11 px-6 rounded-xl transition-all gap-2"
        >
          <Link href="/challenges">
            <Home className="w-4 h-4" />
            <span>Danh sách thử thách</span>
          </Link>
        </Button>
      </div>

      {/* Collapsible Technical Error Log */}
      <details className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-left group cursor-pointer transition-all">
        <summary className="text-xs font-bold text-[#78716C] flex items-center justify-between select-none">
          <span>THÔNG TIN KỸ THUẬT (DEVELOPER ONLY)</span>
          <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90 text-slate-400" />
        </summary>
        <div className="mt-3 pt-3 border-t border-slate-200/50 text-[11px] font-mono text-slate-500 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
          <p className="font-semibold text-rose-600 mb-1">Error message: {error.message || "Unknown error occurred"}</p>
          {error.digest && <p>Digest ID: {error.digest}</p>}
          {error.stack && <p className="mt-1 opacity-70">{error.stack}</p>}
        </div>
      </details>
    </div>
  );
}
