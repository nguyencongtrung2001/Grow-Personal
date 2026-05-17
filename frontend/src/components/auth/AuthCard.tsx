"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";
import Image from "next/image";

export default function AuthCard() {
  const router = useRouter();

  const handleGoogleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    // Xử lý logic OAuth tại đây, tạm thời push sang trang dashboard chính
    router.push("/");
  };

  return (
    <Card className="w-full max-w-[420px] rounded-2xl p-2 md:p-4 flex flex-col gap-6 border border-white/60 shadow-xl shadow-slate-900/5 bg-white/75 backdrop-blur-[24px]">
      
      {/* Branding/Identity Header */}
      <CardHeader className="text-center space-y-3 pt-6">
        <div className="flex justify-center items-center mb-1">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 via-emerald-500 to-amber-500 p-[2px] shadow-sm">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Command className="w-6 h-6 text-sky-600 stroke-[2.5]" />
            </div>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-[#0F172A] tracking-tight font-sans">
          Chào mừng tới Command Center
        </CardTitle>
        <CardDescription className="text-xs text-[#64748B] leading-relaxed max-w-[280px] mx-auto">
          Hệ thống quản lý tối cao cho Tài chính, Từ vựng, Thử thách và Nhiệm vụ của bạn.
        </CardDescription>
      </CardHeader>

      {/* Social Auth Area */}
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-[#64748B] text-center uppercase tracking-wider">
            Đăng nhập hoặc đăng ký nhanh
          </p>
          
          {/* NÚT TIẾP TỤC VỚI GOOGLE */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-13 bg-white border-slate-200 hover:border-sky-500/40 hover:bg-white rounded-xl flex items-center justify-center gap-3 shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99] py-6"
          >
            <Image
              alt="Google Logo" 
              className="w-5 h-5 flex-shrink-0" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY3cY9HN01Xti_0k2UeF3yTQiZQnica4thGy7i21gzMQVUWFSQ89-Bt4AUiL3J5GVOSw-6qKQt7bR7nhJ89ZhvCt0a1g08dU2NNRUdB5pbV_jxk64VfOS-aQpu7NF7wI2c7Ur-IAJIrnnv_gN5RRDPV_t4agaGAWTludH5S3cSSEqEi-Gk0LIlw5ptQqlgIDKzhk06QUFkT3ycr2FpdlWSvb4e2ZFLI-b01YX7aa3h9zcNusuFKm15O6ogkJRsfl9r16QtyyFLnGa--"
            />
            <span className="text-sm font-bold text-slate-700">Tiếp tục với tài khoản Google</span>
          </Button>
        </div>

        {/* Quick Features Preview Dots */}
        <div className="flex items-center justify-center gap-4 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#64748B]">
            <span className="w-2 h-2 rounded-full bg-[#EAB308]" /> Tài chính 
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#64748B]">
            <span className="w-2 h-2 rounded-full bg-[#0284C7]" /> Từ vựng
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#64748B]">
            <span className="w-2 h-2 rounded-full bg-[#FF4500]" /> Thử thách
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#64748B]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Nhiệm vụ
          </div>
        </div>
      </CardContent>

      {/* Legal Text Footer */}
      <CardFooter className="text-center pt-0 pb-6">
        <p className="text-[11px] text-[#64748B] leading-relaxed">
          Bằng việc nhấn tiếp tục, bạn đồng ý với{" "}
          <Link className="text-[#0284C7] font-semibold hover:underline transition-all" href="#">
            Điều khoản sử dụng
          </Link>{" "}
          và{" "}
          <Link className="text-[#0284C7] font-semibold hover:underline transition-all" href="#">
            Chính sách bảo mật
          </Link>{" "}
          của GrowthOS.
        </p>
      </CardFooter>
    </Card>
  );
}