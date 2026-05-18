"use client";
import React from "react";
import FinancePots from "@/components/dashboard/FinancePots";
import {  TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FinancePage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Quản Lý Tài Chính</h1>
            <p className="text-xs text-slate-500">Hệ thống hũ tài chính thông minh Timo Pots</p>
          </div>
        </div>
        
        <Button className="bg-slate-900 text-white font-bold text-xs h-9 rounded-xl flex items-center gap-1.5 hover:bg-slate-800">
          <Plus className="w-4 h-4" /> Thêm giao dịch
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <FinancePots />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Báo cáo Thu/Chi
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="font-semibold text-slate-600">Tổng thu nhập</span>
                <span className="font-bold text-emerald-600">+25,000,000 ₫</span>
              </div>
              <div className="flex justify-between items-center text-xs p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="font-semibold text-slate-600">Tổng chi tiêu</span>
                <span className="font-bold text-rose-600">-9,800,000 ₫</span>
              </div>
              <div className="flex justify-between items-center text-xs p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="font-semibold text-slate-600">Tích lũy ròng</span>
                <span className="font-bold text-slate-900">+15,200,000 ₫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
