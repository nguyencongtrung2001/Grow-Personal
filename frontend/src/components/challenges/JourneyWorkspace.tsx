"use client";
// ============================================================
// JourneyWorkspace — Client Component
// ✅ Nhận challengeSlug prop — không hardcode ngày
// ✅ <Image> dùng fill + sizes — fix CLS (Core Web Vitals)
// ✅ submitJourneyLog Server Action qua useActionState
// ✅ URL.revokeObjectURL để tránh memory leak (đã có, giữ nguyên)
// ============================================================

import React, { useState, useRef, useActionState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit3, Camera, UploadCloud, BadgeCheck, X, FileVideo, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { submitJourneyLog } from "@/lib/challenges/actions";
import { ActionResult } from "@/types/challenge";
import { MOODS } from "@/constants/challenges";

interface MediaItem {
  id: string;
  file: File;
  previewUrl: string;
  type: "image" | "video";
}

interface JourneyWorkspaceProps {
  challengeSlug: string;
}

const initialState: ActionResult = { success: false };

export default function JourneyWorkspace({ challengeSlug }: JourneyWorkspaceProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState(`${MOODS[0].emoji} ${MOODS[0].label}`);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(submitJourneyLog, initialState);

  const [prevSuccess, setPrevSuccess] = useState(false);

  // Reset form state khi action thành công (Adjusting state while rendering)
  if (state.success && !prevSuccess) {
    setPrevSuccess(true);
    // Revoke tất cả preview URLs trước khi xóa — tránh memory leak
    mediaItems.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setMediaItems([]);
    setUploadError(null);
  } else if (!state.success && prevSuccess) {
    setPrevSuccess(false);
  }

  const processFiles = (files: File[]) => {
    setUploadError(null);
    if (mediaItems.length + files.length > 10) {
      setUploadError("Bạn chỉ được phép tải lên tối đa 10 hình ảnh hoặc video.");
      return;
    }

    const newItems: MediaItem[] = [];
    for (const file of files) {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      const maxSize = isVideo ? 25 * 1024 * 1024 : 5 * 1024 * 1024;

      if (!isImage && !isVideo) {
        setUploadError("Định dạng không hợp lệ. Chỉ chấp nhận JPG, PNG, MP4, WebM.");
        continue;
      }
      if (file.size > maxSize) {
        setUploadError(`"${file.name}" vượt quá ${isVideo ? "25MB" : "5MB"}.`);
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
    URL.revokeObjectURL(url); // Giải phóng bộ nhớ — quan trọng!
  };

  return (
    <form action={formAction}>
      {/* Hidden fields để truyền context vào Server Action */}
      <input type="hidden" name="challengeSlug" value={challengeSlug} />
      <input type="hidden" name="mood" value={selectedMood} />

      <div className="bg-[#FFF8F5] border border-[#F1E7E2] rounded-xl p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Khối trái: Nhật ký & Mood */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-[#FF4500]" />
              <span className="text-sm text-[#1E293B] font-bold">Nhật ký hành trình hôm nay</span>
            </div>

            {/* Mood Selector */}
            <div className="flex flex-col gap-1.5 bg-white border border-slate-200/60 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[11px] font-extrabold text-[#78716C] uppercase tracking-wider">Tâm trạng của bạn hôm nay:</span>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Chọn tâm trạng">
                {MOODS.map((m) => {
                  const value = `${m.emoji} ${m.label}`;
                  const isSelected = selectedMood === value;
                  return (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setSelectedMood(value)}
                      aria-pressed={isSelected}
                      className={`px-2.5 py-1 text-xs rounded-xl font-bold border transition-all duration-200 flex items-center gap-1 cursor-pointer
                        ${isSelected
                          ? "bg-[#FFF2EE] border-[#FF4500] text-[#FF4500] shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }
                      `}
                    >
                      <span>{m.emoji}</span>
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <Textarea
            name="note"
            placeholder="Hôm nay tiến trình thử thách diễn ra như thế nào? Bạn tích lũy thêm được những giá trị cốt lõi gì?"
            className="bg-white border-slate-200 rounded-xl p-4 text-sm h-full min-h-[140px] focus-visible:ring-2 focus-visible:ring-[#FF4500] resize-none"
            aria-describedby={state.fieldErrors?.note ? "note-error" : undefined}
          />
          {state.fieldErrors?.note && (
            <p id="note-error" className="text-xs text-rose-500" role="alert">
              {state.fieldErrors.note[0]}
            </p>
          )}
        </div>

        {/* Khối phải: Upload */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#FF4500]" />
              <span className="text-sm text-[#1E293B] font-bold">Minh chứng ({mediaItems.length}/10)</span>
            </div>
            {uploadError && <span className="text-xs text-rose-500 font-medium">{uploadError}</span>}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => e.target.files && processFiles(Array.from(e.target.files))}
          />

          {mediaItems.length === 0 ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-xl bg-white flex flex-col items-center justify-center p-4 text-center hover:border-[#FF4500]/50 hover:bg-orange-50/20 transition-all cursor-pointer group h-full min-h-[140px]"
            >
              <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-[#FF4500] transition-colors mb-1" />
              <p className="text-xs font-semibold text-[#1E293B]">Tải lên hình ảnh hoặc video minh chứng</p>
              <p className="text-[10px] text-[#78716C] mt-0.5">Tối đa 10 files (Ảnh &lt; 5MB, Video &lt; 25MB)</p>
            </button>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-3 grid grid-cols-5 gap-2 max-h-[150px] overflow-y-auto min-h-[140px]">
              {mediaItems.map((item) => (
                <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden group border border-slate-100 bg-slate-50">
                  {item.type === "image" ? (
                    // 🟢 FIX CLS: dùng fill + sizes thay vì thiếu width/height
                    <Image
                      src={item.previewUrl}
                      alt={item.file.name}
                      fill
                      sizes="10vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center relative">
                      <video src={item.previewUrl} className="w-full h-full object-cover" muted />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <FileVideo className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(item.id, item.previewUrl)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-rose-600 text-white rounded-full p-1 transition-colors backdrop-blur-xs"
                    aria-label={`Xóa ${item.file.name}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {mediaItems.length < 10 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-[#FF4500]/40 hover:text-[#FF4500] transition-all bg-slate-50/50"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span className="text-[9px] font-bold mt-0.5">Thêm</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="lg:col-span-2 border-t border-slate-200/60 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          {/* Server Action error */}
          {state.error && (
            <div className="flex items-center gap-2 text-sm text-rose-600" role="alert">
              <AlertCircle className="w-4 h-4" />
              <span>{state.error}</span>
            </div>
          )}
          {state.success && (
            <p className="text-sm text-emerald-600 font-semibold">✅ Đã lưu nhật ký thành công!</p>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto ml-auto">
            <Button
              type="submit"
              name="intent"
              value="draft"
              variant="ghost"
              disabled={isPending}
              className="w-full sm:w-auto text-sm font-semibold text-[#78716C] hover:bg-slate-100 rounded-xl"
            >
              Lưu nháp
            </Button>
            <Button
              type="submit"
              name="intent"
              value="complete"
              disabled={isPending}
              className="w-full sm:w-auto bg-linear-to-r from-[#FF4500] to-[#EF4444] text-white font-bold text-sm h-11 px-6 rounded-xl shadow-md shadow-[#FF4500]/10 hover:opacity-95 transition-all gap-1.5"
            >
              {isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /><span>Đang lưu...</span></>
              ) : (
                <><BadgeCheck className="w-5 h-5" /><span>Tick hoàn thành ngày</span></>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}