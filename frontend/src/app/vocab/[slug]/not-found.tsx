import React from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function VocabFolderNotFound() {
  return (
    <div className="max-w-[1440px] mx-auto py-24 flex flex-col items-center justify-center text-center px-4 gap-5 animate-in fade-in duration-200">
      <div className="p-4 bg-amber-50 text-amber-600 rounded-xl">
        <FileQuestion className="w-12 h-12" />
      </div>
      <div className="space-y-1.5 max-w-md">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Thư mục không tồn tại</h3>
        <p className="text-sm text-slate-500 leading-normal">
          Thư mục từ vựng này không tồn tại hoặc đã được di chuyển sang một liên kết khác. Vui lòng kiểm tra lại.
        </p>
      </div>
      <Link href="/vocab" className="mt-2">
        <Button 
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 h-11 rounded-xl shadow-md shadow-sky-600/10 cursor-pointer"
        >
          Quay lại Không gian từ vựng
        </Button>
      </Link>
    </div>
  );
}
