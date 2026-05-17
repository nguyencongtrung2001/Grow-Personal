import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit3, Camera, UploadCloud, Info, BadgeCheck } from "lucide-react";

export default function JourneyWorkspace() {
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
          className="bg-white border-slate-200 rounded-xl p-4 text-sm h-32 focus-visible:ring-2 focus-visible:ring-[#FF4500] resize-none"
        />
      </div>

      {/* Khối phải: Upload ảnh Drag & Drop */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#FF4500]" />
          <span className="text-sm text-[#1E293B] font-bold">Hình ảnh minh chứng kết quả</span>
        </div>
        
        <div className="border-2 border-dashed border-slate-200 rounded-xl bg-white flex flex-col items-center justify-center p-4 text-center hover:border-[#FF4500]/50 hover:bg-orange-50/20 transition-all cursor-pointer group h-32">
          <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-[#FF4500] transition-colors mb-1" />
          <p className="text-xs font-semibold text-[#1E293B]">Tải lên hoặc kéo thả ảnh minh chứng tại đây</p>
          <p className="text-[10px] text-[#78716C] mt-0.5">Chấp nhận JPG, PNG (Tối đa 5MB)</p>
        </div>
      </div>

      {/* Chân trang Workspace điều khiển hành động */}
      <div className="lg:col-span-2 border-t border-slate-200/60 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <p className="text-xs text-[#78716C] flex items-center gap-1.5">
          <Info className="w-4 h-4 text-[#FF4500] fill-[#FF4500]/10" />
          Cam kết hoàn thành ghi chú giúp gia tăng 80% khả năng duy trì thói quen dài hạn.
        </p>
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