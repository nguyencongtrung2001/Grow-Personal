"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function VocabFolderError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Vocab folder page error:", error);
  }, [error]);

  return (
    <div className="max-w-[1440px] mx-auto py-24 flex flex-col items-center justify-center text-center px-4 gap-5 animate-in fade-in duration-200">
      <div className="p-4 bg-rose-50 text-rose-600 rounded-xl">
        <AlertCircle className="w-12 h-12" />
      </div>
      <div className="space-y-1.5 max-w-md">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Đã xảy ra lỗi hệ thống</h3>
        <p className="text-sm text-slate-500 leading-normal">
          Không thể tải dữ liệu thư mục từ vựng này. Vui lòng thử tải lại hoặc quay về trang chủ Không gian từ vựng.
        </p>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <Button 
          onClick={() => reset()}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 h-11 rounded-xl shadow-md shadow-sky-600/10 flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Thử tải lại
        </Button>
        <Link href="/vocab">
          <Button 
            variant="outline"
            className="border-slate-200 text-slate-600 hover:bg-slate-50 font-bold px-5 h-11 rounded-xl cursor-pointer"
          >
            Quay lại trang chính
          </Button>
        </Link>
      </div>
    </div>
  );
}
