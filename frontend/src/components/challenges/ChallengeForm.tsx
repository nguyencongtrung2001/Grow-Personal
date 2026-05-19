"use client";
// ============================================================
// ChallengeForm — Client Component (cần useActionState)
// ✅ <form action={serverAction}> — không có onSubmit + fetch
// ✅ useActionState — handle pending/error state chuẩn React 19
// ✅ Server-side validation — fieldErrors từ action trả về
// ✅ Tự đóng form sau khi tạo thành công
// ============================================================

import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rocket, Check, Loader2, AlertCircle } from "lucide-react";
import { createChallenge } from "@/lib/challenges/actions";
import { ActionResult } from "@/types/challenge";

interface ChallengeFormProps {
  onClose: () => void;
}

const initialState: ActionResult = { success: false };

export default function ChallengeForm({ onClose }: ChallengeFormProps) {
  // useActionState: quản lý state của Server Action (pending, result)
  // Signature: [state, formAction, isPending]
  const [state, formAction, isPending] = useActionState(createChallenge, initialState);

  // Tự đóng form khi action thành công
  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <section className="bg-white border-2 border-dashed border-[#FF4500]/30 rounded-2xl p-6 relative shadow-sm animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="flex items-center gap-2 mb-4">
        <Rocket className="w-5 h-5 text-[#FF4500] fill-[#FF4500]/10" />
        <h3 className="font-bold text-[#1E293B] text-base">Thiết lập Thử thách Mới</h3>
      </div>

      {/* Lỗi cấp form (không phải field error) */}
      {state.error && (
        <div className="mb-4 flex items-center gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* action= Server Action — không cần onSubmit, không cần fetch */}
      <form action={formAction}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {/* Trường tên thử thách */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="challenge-title" className="text-xs font-bold text-[#78716C] uppercase tracking-wider">
              Tên thử thách của bạn
            </label>
            <Input
              id="challenge-title"
              name="title"
              type="text"
              placeholder="Ví dụ: 30 Ngày bứt phá IELTS Speaking..."
              required
              minLength={5}
              maxLength={100}
              aria-describedby={state.fieldErrors?.title ? "title-error" : undefined}
              className="h-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-[#FF4500]"
            />
            {state.fieldErrors?.title && (
              <p id="title-error" className="text-xs text-rose-500" role="alert">
                {state.fieldErrors.title[0]}
              </p>
            )}
          </div>

          {/* Trường số ngày */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="challenge-days" className="text-xs font-bold text-[#78716C] uppercase tracking-wider">
              Số ngày thử thách (Mục tiêu cam kết)
            </label>
            <div className="relative flex items-center">
              <Input
                id="challenge-days"
                name="totalDays"
                type="number"
                min={1}
                max={365}
                placeholder="Ví dụ: 30"
                required
                aria-describedby={state.fieldErrors?.totalDays ? "days-error" : undefined}
                className="h-11 bg-slate-50 border-slate-200 rounded-xl pr-14 focus-visible:ring-2 focus-visible:ring-[#FF4500]"
              />
              <span className="absolute right-4 text-xs font-bold text-[#78716C]">Ngày</span>
            </div>
            {state.fieldErrors?.totalDays && (
              <p id="days-error" className="text-xs text-rose-500" role="alert">
                {state.fieldErrors.totalDays[0]}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 items-end h-full pt-6">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 h-11 bg-[#FF4500] hover:bg-orange-600 text-white font-bold rounded-xl gap-1.5 shadow-sm disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang tạo...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3px]" />
                  <span>Xác nhận (OK)</span>
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="h-11 px-4 border-slate-200 text-[#78716C] hover:bg-slate-50 rounded-xl font-semibold"
            >
              Hủy
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}