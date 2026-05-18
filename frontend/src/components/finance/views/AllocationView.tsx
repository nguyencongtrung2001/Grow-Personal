"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
 
  Check, 
  AlertCircle, 
  Sparkles,
 
  Save, 
  ArrowRight,
  RefreshCw
} from "lucide-react";

interface Jar {
  id: string;
  name: string;
  icon: string;
  percentage: number;
  allocated: number;
  spent: number;
  color: string;
}

interface AllocationViewProps {
  jars: Jar[];
  onSaveAllocation: (updatedJars: Jar[]) => void;
}

export default function AllocationView({ jars, onSaveAllocation }: AllocationViewProps) {
  const totalIncome = 25000000; // Monthly income constant
  const [localJars, setLocalJars] = useState<Jar[]>(jars);
  const [isSaved, setIsSaved] = useState(false);

  // Format currency
  const formatVND = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Preset Template values
  const templates = {
    standard: [35, 25, 15, 10, 10, 5],   // 50/30/20 Adjusted (needs split between essentials & savings)
    saving: [30, 20, 30, 10, 5, 5],      // High Savings
    student: [45, 30, 5, 5, 10, 5],      // Student (Essentials-focused, low savings)
  };

  // Calculate totals
  const totalPercentage = localJars.reduce((sum, j) => sum + j.percentage, 0);
  const totalAllocated = localJars.reduce((sum, j) => sum + j.allocated, 0);
  const unallocatedAmount = totalIncome - totalAllocated;
  const isOver100 = totalPercentage > 100;
  const isOverIncome = totalAllocated > totalIncome;

  // Apply template
  const applyTemplate = (type: "standard" | "saving" | "student") => {
    const percentages = templates[type];
    const updated = localJars.map((jar, index) => {
      const pct = percentages[index] || 0;
      const allocated = (pct / 100) * totalIncome;
      return {
        ...jar,
        percentage: pct,
        allocated: allocated
      };
    });
    setLocalJars(updated);
    setIsSaved(false);
  };

  // Handle Percentage change bi-directionally
  const handlePercentageChange = (id: string, pctStr: string) => {
    const pct = parseFloat(pctStr) || 0;
    const updated = localJars.map((jar) => {
      if (jar.id === id) {
        const allocated = (pct / 100) * totalIncome;
        return {
          ...jar,
          percentage: pct,
          allocated: allocated
        };
      }
      return jar;
    });
    setLocalJars(updated);
    setIsSaved(false);
  };

  // Handle Amount change bi-directionally
  const handleAmountChange = (id: string, amtStr: string) => {
    // Remove non-digit characters
    const digits = amtStr.replace(/\D/g, "");
    const amt = parseInt(digits) || 0;
    
    const updated = localJars.map((jar) => {
      if (jar.id === id) {
        const percentage = totalIncome > 0 ? parseFloat(((amt / totalIncome) * 100).toFixed(1)) : 0;
        return {
          ...jar,
          percentage: percentage,
          allocated: amt
        };
      }
      return jar;
    });
    setLocalJars(updated);
    setIsSaved(false);
  };

  // Reset to default
  const resetAllocation = () => {
    setLocalJars(jars);
    setIsSaved(false);
  };

  // Submit allocation
  const handleSubmit = () => {
    if (totalPercentage !== 100) {
      alert("Cảnh báo: Tổng tỉ lệ phân bổ phải đạt chính xác 100%!");
      return;
    }
    onSaveAllocation(localJars);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* SECTION 1: HEADER SUMMARY CARD */}
      <Card className="bg-white border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="bg-slate-900 px-6 py-6 md:py-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Thu nhập tháng khả dụng</span>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
              Tổng thu nhập chờ phân bổ: {formatVND(totalIncome)}
            </h3>
          </div>

          <div className={`rounded-2xl p-4 border space-y-1 min-w-[220px] shrink-0 ${
            unallocatedAmount < 0 
              ? "bg-rose-500/10 border-rose-500/20 text-rose-450" 
              : unallocatedAmount === 0
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-450"
                : "bg-amber-500/10 border-amber-500/20 text-amber-400"
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">Trạng thái phân bổ</span>
            <div className="text-xs font-bold flex items-center justify-between gap-4">
              <span>Còn lại chưa chia:</span>
              <span className="text-sm font-extrabold">{formatVND(unallocatedAmount)}</span>
            </div>
          </div>
        </div>

        {/* Templates selector bar */}
        <CardContent className="bg-slate-50 border-t border-slate-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Chọn mẫu phân bổ nhanh:
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white border-slate-200 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
              onClick={() => applyTemplate("standard")}
            >
              📊 Mẫu Truyền Thống (50/30/20)
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white border-slate-200 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
              onClick={() => applyTemplate("saving")}
            >
              🐷 Mẫu Tiết Kiệm (60/30/10)
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white border-slate-200 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
              onClick={() => applyTemplate("student")}
            >
              🎓 Mẫu Sinh Viên (70/20/10)
            </Button>
            
            <div className="h-4 w-px bg-slate-300 hidden sm:block mx-1"></div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-400 hover:text-slate-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
              onClick={resetAllocation}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Khôi phục
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 2: INTERACTIVE MATRIX LIST */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-4 bg-slate-900 rounded-full"></span>
          Bảng Phân Bổ Ma Trận Chi Tiết
        </h4>

        <div className="grid grid-cols-1 gap-3">
          {localJars.map((jar, index) => {
            // Pick a matching color label for visual polish
            const colors = [
              "bg-emerald-50 text-emerald-600 border-emerald-100", 
              "bg-blue-50 text-blue-600 border-blue-100", 
              "bg-amber-50 text-amber-600 border-amber-100", 
              "bg-violet-50 text-violet-600 border-violet-100", 
              "bg-pink-50 text-pink-600 border-pink-100", 
              "bg-indigo-50 text-indigo-600 border-indigo-100"
            ];
            const colorClass = colors[index % colors.length];

            return (
              <Card 
                key={jar.id} 
                className="bg-white border-slate-200 rounded-2xl hover:border-slate-300 transition-all shadow-2xs group"
              >
                <CardContent className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  {/* Left Column: Jar Icon & Info */}
                  <div className="flex items-center gap-3 md:w-1/3 min-w-[200px]">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                      {jar.icon}
                    </div>
                    <div className="truncate space-y-1 flex-1">
                      <h5 className="text-xs font-bold text-slate-900 truncate leading-snug">{jar.name}</h5>
                      <div className="flex items-center gap-2">
                        <Progress value={jar.percentage} className="h-1 bg-slate-100 w-16 [&>div]:bg-slate-900 shrink-0" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide truncate">
                          Hạn mức hiện tại: {formatVND(jar.allocated)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Bidirectional fields */}
                  <div className="flex-1 flex items-center justify-start md:justify-end gap-3 flex-wrap md:flex-nowrap">
                    {/* Percentage input */}
                    <div className="relative max-w-[120px] shrink-0">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.5"
                        value={jar.percentage || ""}
                        className="h-9 pr-7 pl-3 rounded-xl border-slate-200 text-xs font-extrabold focus:ring-slate-400"
                        onChange={(e) => handlePercentageChange(jar.id, e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[10px] font-bold text-slate-400">
                        %
                      </div>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0 hidden md:block" />

                    {/* Amount input */}
                    <div className="relative max-w-[200px] flex-1 min-w-[140px]">
                      <Input
                        type="text"
                        value={jar.allocated ? jar.allocated.toLocaleString("vi-VN") : ""}
                        className="h-9 pr-8 pl-3 rounded-xl border-slate-200 text-xs font-extrabold focus:ring-slate-400"
                        placeholder="0"
                        onChange={(e) => handleAmountChange(jar.id, e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[10px] font-bold text-slate-400">
                        ₫
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Mini indicators */}
                  <div className="md:w-[80px] flex justify-end shrink-0">
                    <Badge variant="outline" className={`text-[10px] font-bold px-2 py-0.5 ${colorClass} border-current/10 shrink-0`}>
                      {jar.percentage.toFixed(1)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: SAFETY & SUBMIT FOOTER */}
      <Card className="bg-white border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <CardFooter className="p-5 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-slate-50/50">
          <div className="space-y-1.5 md:max-w-[70%]">
            <div className="text-sm font-bold text-slate-800">
              Tổng cộng: <span className={totalPercentage === 100 ? "text-emerald-600" : "text-amber-500"}>{totalPercentage.toFixed(0)}%</span> ({formatVND(totalAllocated)} / {formatVND(totalIncome)})
            </div>

            {/* Warning indicator */}
            {(isOver100 || isOverIncome) && (
              <div className="text-[10px] text-rose-500 font-bold flex items-center gap-1 animate-pulse">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {isOver100 
                  ? "Cảnh báo: Tổng phần trăm phân bổ vượt quá 100%! Vui lòng điều chỉnh lại."
                  : "Cảnh báo: Tổng số tiền phân bổ vượt quá Thu nhập tháng khả dụng!"}
              </div>
            )}

            {totalPercentage < 100 && totalPercentage > 0 && (
              <div className="text-[10px] text-amber-600 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Vui lòng phân bổ hết 100% để tối ưu tài chính cá nhân.
              </div>
            )}
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Button
              className={`h-10 text-xs font-bold rounded-xl flex items-center gap-1.5 px-6 cursor-pointer border shadow-sm transition-all ${
                isSaved 
                  ? "bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-600 scale-95" 
                  : totalPercentage === 100
                    ? "bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500 hover:-translate-y-0.5 active:translate-y-0"
                    : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
              }`}
              disabled={totalPercentage !== 100}
              onClick={handleSubmit}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" /> Đã Khóa Hũ Thành Công
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Xác nhận phân bổ và khóa hũ
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>

    </div>
  );
}
