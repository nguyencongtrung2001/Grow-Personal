import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rocket, Check } from "lucide-react";

interface ChallengeFormProps {
  onClose: () => void;
}

export default function ChallengeForm({ onClose }: ChallengeFormProps) {
  return (
    <section className="bg-white border-2 border-dashed border-[#FF4500]/30 rounded-2xl p-6 relative shadow-sm animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="flex items-center gap-2 mb-4">
        <Rocket className="w-5 h-5 text-[#FF4500] fill-[#FF4500]/10" />
        <h3 className="font-bold text-[#1E293B] text-base">Thiết lập Thử thách Mới</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#78716C] uppercase tracking-wider">
            Tên thử thách của bạn
          </label>
          <Input 
            type="text" 
            placeholder="Ví dụ: 30 Ngày bứt phá IELTS Speaking..." 
            className="h-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-[#FF4500]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#78716C] uppercase tracking-wider">
            Số ngày thử thách (Mục tiêu cam kết)
          </label>
          <div className="relative flex items-center">
            <Input 
              type="number" 
              min={1} 
              max={100} 
              placeholder="Ví dụ: 30" 
              className="h-11 bg-slate-50 border-slate-200 rounded-xl pr-14 focus-visible:ring-2 focus-visible:ring-[#FF4500]"
            />
            <span className="absolute right-4 text-xs font-bold text-[#78716C]">Ngày</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 h-11 bg-[#FF4500] hover:bg-orange-600 text-white font-bold rounded-xl gap-1.5 shadow-sm">
            <Check className="w-4 h-4 stroke-[3px]" />
            <span>Xác nhận (OK)</span>
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="h-11 px-4 border-slate-200 text-[#78716C] hover:bg-slate-50 rounded-xl font-semibold"
          >
            Hủy
          </Button>
        </div>
      </div>
    </section>
  );
}