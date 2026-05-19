"use client";

import React, { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit3, Camera, UploadCloud, BadgeCheck, X, FileVideo } from "lucide-react";
import Image from "next/image";

interface MediaItem {
  id: string;
  file: File;
  previewUrl: string;
  type: "image" | "video";
}

export default function JourneyWorkspace() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    processFiles(Array.from(e.target.files));
  };

  const processFiles = (files: File[]) => {
    setError(null);

    // Kiểm tra tổng số lượng sau khi thêm không vượt quá 10
    if (mediaItems.length + files.length > 10) {
      setError("Bạn chỉ được phép tải lên tối đa 10 hình ảnh hoặc video minh chứng.");
      return;
    }

    const newItems: MediaItem[] = [];

    for (const file of files) {
      // Giới hạn dung lượng tệp: 5MB cho ảnh, 25MB cho video (Ví dụ tối ưu thực tế)
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      const maxSize = isVideo ? 25 * 1024 * 1024 : 5 * 1024 * 1024;

      if (!isImage && !isVideo) {
        setError("Định dạng tệp không hợp lệ. Chỉ chấp nhận JPG, PNG, MP4, WebM.");
        continue;
      }

      if (file.size > maxSize) {
        setError(`Tệp "${file.name}" vượt quá kích thước cho phép (${isVideo ? "25MB" : "5MB"}).`);
        continue;
      }

      newItems.push({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        type: isVideo ? "video" : "image",
      });
    }

    setMediaItems((prev) => [...prev, ...newItems]);
  };

  const removeMedia = (id: string, url: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    URL.revokeObjectURL(url); // Giải phóng bộ nhớ memory leak
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-[#FFF8F5] border border-[#F1E7E2] rounded-xl p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Khối trái: Văn bản nhật ký */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[#FF4500]" />
          <span className="text-sm text-[#1E293B] font-bold">Nhật ký hành trình - Ngày 23</span>
        </div>
        <Textarea 
          placeholder="Hôm nay tiến trình thử thách diễn ra như thế nào? Bạn tích lũy thêm được những giá trị cốt lõi gì?"
          className="bg-white border-slate-200 rounded-xl p-4 text-sm h-full min-h-[140px] focus-visible:ring-2 focus-visible:ring-[#FF4500] resize-none"
        />
      </div>

      {/* Khối phải: Upload ảnh/video Drag & Drop Đa phương tiện */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#FF4500]" />
            <span className="text-sm text-[#1E293B] font-bold">
              Minh chứng kết quả ({mediaItems.length}/10)
            </span>
          </div>
          {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
        </div>
        
        <input 
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {mediaItems.length === 0 ? (
          <div 
            onClick={triggerUpload}
            className="border-2 border-dashed border-slate-200 rounded-xl bg-white flex flex-col items-center justify-center p-4 text-center hover:border-[#FF4500]/50 hover:bg-orange-50/20 transition-all cursor-pointer group h-full min-h-[140px]"
          >
            <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-[#FF4500] transition-colors mb-1" />
            <p className="text-xs font-semibold text-[#1E293B]">Tải lên hình ảnh hoặc video minh chứng tại đây</p>
            <p className="text-[10px] text-[#78716C] mt-0.5">Tối đa 10 files (Ảnh &lt; 5MB, Video &lt; 25MB)</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-3 grid grid-cols-5 gap-2 max-h-[150px] overflow-y-auto min-h-[140px]">
            {mediaItems.map((item) => (
              <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden group border border-slate-100 bg-slate-50">
                {item.type === "image" ? (
                  <Image src={item.previewUrl} alt={item.file.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <video src={item.previewUrl} className="w-full h-full object-cover" muted />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <FileVideo className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                {/* Overlay xóa ảnh */}
                <button
                  type="button"
                  onClick={() => removeMedia(item.id, item.previewUrl)}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-rose-600 text-white rounded-full p-1 transition-colors backdrop-blur-xs"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            
            {mediaItems.length < 10 && (
              <button
                type="button"
                onClick={triggerUpload}
                className="aspect-square border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-[#FF4500]/40 hover:text-[#FF4500] transition-all bg-slate-50/50"
              >
                <UploadCloud className="w-4 h-4" />
                <span className="text-[9px] font-bold mt-0.5">Thêm</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Chân trang Workspace điều khiển hành động */}
      <div className="lg:col-span-2 border-t border-slate-200/60 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="ghost" className="w-full sm:w-auto text-sm font-semibold text-[#78716C] hover:bg-slate-100 rounded-xl">
            Lưu nháp
          </Button>
          <Button className="w-full sm:w-auto bg-linear-to-r from-[#FF4500] to-[#EF4444] text-white font-bold text-sm h-11 px-6 rounded-xl shadow-md shadow-[#FF4500]/10 hover:opacity-95 transition-all gap-1.5">
            <BadgeCheck className="w-5 h-5" />
            <span>Tick hoàn thành ngày</span>
          </Button>
        </div>
      </div>
    </div>
  );
}